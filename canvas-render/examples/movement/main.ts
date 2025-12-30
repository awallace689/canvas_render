import { attach, getCanvasConfig, renderCanvas } from '../../lib/canvas';
import { CanvasId, Color, createCanvasConfig } from '../../lib/constants';
import { midpoint } from '../../lib/math';
import { createCircle } from '../../lib/modules/entities/circle';
import { createFrame, Frame } from '../../lib/modules/frame';
import { clamp } from '../../lib/modules/types/clamped';
import { createViewport } from '../../lib/modules/viewport';

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

export const run = (containerId: string): void => {
    const canvasId = attach(
        containerId,
        createCanvasConfig({
            width: clamp(600),
            height: clamp(600),
            backgroundColor: Color.blue,
            font: 'serif',
            keyEvents: true,
        })
    );
    const config = getCanvasConfig(canvasId);
    const canvasMidpoint = midpoint(
        { x: 0, y: 0 },
        { x: config.width, y: config.height }
    );
    const viewport = createViewport({
        width: clamp(config.width),
        height: clamp(config.height),
        x: clamp(0),
        y: clamp(0),
        description: 'Viewport 1',
        entities: [createCircle(canvasMidpoint, clamp(50), Color.red)],
    });

    const frame = createFrame([viewport]);
    requestAnimationFrame(loop(canvasId, frame));
};

const loop =
    (canvasId: CanvasId, frame: Frame) =>
    (animationFrame: number): void => {
        const t0 = getPrevTimestamp(canvasId);
        const t1 = createTimestamp(canvasId, animationFrame);

        if (t0 === undefined) {
            requestAnimationFrame(loop(canvasId, frame));
            return;
        }

        const delta = getTimeDelta(t1, t0);
        step(delta, canvasId, frame);

        requestAnimationFrame(loop(canvasId, frame));
    };

const step = (_delta: TimeDelta, canvasId: CanvasId, frame: Frame): void => {
    renderCanvas(frame, canvasId);
};
