import { useCallback, useEffect, useRef, useState } from 'react';
import type { ExperimentPoint } from '../lib/attacks';
import type { AttackResult, WorkerRequest, WorkerResponse } from '../workers/protocol';

export type RunStatus = 'idle' | 'running' | 'done' | 'stopped';

export interface AttackState<R extends AttackResult> {
  status: RunStatus;
  attempts: number;
  elapsedMs: number;
  phase?: 'fair' | 'fraud';
  points: ExperimentPoint[];
  result: R | null;
}

const initial = { status: 'idle' as RunStatus, attempts: 0, elapsedMs: 0, points: [], result: null };

/** Starts one Web Worker per run; `stop()` terminates it immediately. */
export function useAttackWorker<R extends AttackResult = AttackResult>() {
  const [state, setState] = useState<AttackState<R>>(initial);
  const workerRef = useRef<Worker | null>(null);

  const stop = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
      setState((s) => (s.status === 'running' ? { ...s, status: 'stopped' } : s));
    }
  }, []);

  const start = useCallback(
    (req: WorkerRequest) => {
      workerRef.current?.terminate();
      const worker = new Worker(new URL('../workers/attack.worker.ts', import.meta.url), { type: 'module' });
      workerRef.current = worker;
      setState({ ...initial, status: 'running' });
      worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        const msg = e.data;
        if (msg.type === 'progress') {
          setState((s) => ({ ...s, attempts: msg.attempts, elapsedMs: msg.elapsedMs, phase: msg.phase }));
        } else if (msg.type === 'point') {
          setState((s) => ({ ...s, points: [...s.points, msg.point] }));
        } else {
          const r = msg.result as R | null;
          setState((s) => ({
            ...s,
            status: 'done',
            result: r,
            attempts: r && 'attempts' in r ? r.attempts : s.attempts,
            elapsedMs: r ? r.elapsedMs : s.elapsedMs,
          }));
          worker.terminate();
          if (workerRef.current === worker) workerRef.current = null;
        }
      };
      worker.postMessage(req);
    },
    [],
  );

  const reset = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setState(initial);
  }, []);

  useEffect(() => () => workerRef.current?.terminate(), []);

  return { state, start, stop, reset };
}
