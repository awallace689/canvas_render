import { attach, getCanvasConfig, renderCanvas } from '../../lib/canvas';
import { CanvasId, Color, createCanvasConfig } from '../../lib/constants';
import { midpoint } from '../../lib/math';
import { createCircle } from '../../lib/modules/entities/circle';
import { createFrame, Frame } from '../../lib/modules/frame';
import { clamp } from '../../lib/modules/types/clamped';
import { createViewport } from '../../lib/modules/viewport';
import {
    createTimestamp,
    getPrevTimestamp,
    getTimeDelta,
    TimeDelta,
} from '../../lib/time';

export const run = (containerId: string): void => {
    const canvasId = attach(
        containerId,
        createCanvasConfig({
            width: clamp(600),
            height: clamp(600),
            backgroundColor: Color.blue,
            font: 'serif',
            keyEvents: true,
            customEvents: false,
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
        entities: [
            createCircle(
                { pos: canvasMidpoint, radius: clamp(50), color: Color.red },
                canvasId
            ),
        ],
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
