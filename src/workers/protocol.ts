import type { CollisionResult, ExperimentPlan, ExperimentPoint, PreimageResult, YuvalResult } from '../lib/attacks';

export type WorkerRequest =
  | { type: 'collision'; bits: number }
  | { type: 'preimage'; bits: number }
  | { type: 'experiment'; plan: ExperimentPlan }
  | { type: 'yuval'; bits: number; fair: string; fraud: string };

export type AttackResult = CollisionResult | PreimageResult | YuvalResult | null;

export type WorkerResponse =
  | { type: 'progress'; attempts: number; elapsedMs: number; phase?: 'fair' | 'fraud' }
  | { type: 'point'; point: ExperimentPoint }
  | { type: 'done'; result: AttackResult };
