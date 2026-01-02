import { CanvasId } from './constants';

export type Timestamp = number & { __brand: 'timestamp' };

const prevTimestampByCanvasId = new Map<CanvasId, Timestamp>();

export const createTimestamp = (
    canvasId: CanvasId,
    timestamp: number
): Timestamp => {
    const timestampBranded = timestamp as Timestamp;
    prevTimestampByCanvasId.set(canvasId, timestampBranded);

    return timestampBranded;
};
export const getPrevTimestamp = (canvasid: CanvasId): Timestamp | undefined =>
    prevTimestampByCanvasId.get(canvasid) as Timestamp;

export type TimeDelta = number & { __brand: 'time delta' };

export type TimeDeltaMultiplier = keyof typeof TIME_DELTA_MULTIPLIER;

export const TIME_DELTA_MULTIPLIER = {
    NONE: 1,
} as const;

export const getTimeDelta = (t1: Timestamp, t0: Timestamp): TimeDelta =>
    (t1 - t0) as TimeDelta;
