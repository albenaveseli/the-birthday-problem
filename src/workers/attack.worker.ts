/// <reference lib="webworker" />
/**
 * Runs the long attacks off the main thread so the page stays responsive.
 * The worker is single-use: the UI creates one per run and terminates it to stop.
 */
import { collisionAttack, preimageAttack, runExperiment, yuvalAttack } from '../lib/attacks';
import type { WorkerRequest, WorkerResponse } from './protocol';

const post = (msg: WorkerResponse) => (self as unknown as DedicatedWorkerGlobalScope).postMessage(msg);

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const req = e.data;
  const onProgress = (p: { attempts: number; elapsedMs: number; phase?: 'fair' | 'fraud' }) =>
    post({ type: 'progress', ...p });

  switch (req.type) {
    case 'collision':
      post({ type: 'done', result: collisionAttack(req.bits, { onProgress }) });
      break;
    case 'preimage':
      post({ type: 'done', result: preimageAttack(req.bits, { onProgress }) });
      break;
    case 'experiment':
      runExperiment(req.plan, (point) => post({ type: 'point', point }));
      post({ type: 'done', result: null });
      break;
    case 'yuval':
      post({ type: 'done', result: yuvalAttack(req.bits, req.fair, req.fraud, onProgress) });
      break;
  }
};
