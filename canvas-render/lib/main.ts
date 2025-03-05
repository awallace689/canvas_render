import { CANVAS_CONFIG, CANVAS_ID, COLORS } from './constants';
import { Clamped } from './modules/clamped';
import * as vp from './modules/viewport';
import { tile } from './modules/render/utils/viewport';
import { IRText } from './modules/entities/rText';
import { fitChar } from './modules/render/utils/entities/tile';
import { assertChar } from './types';
import { Payload } from './modules/payload';

const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.id = CANVAS_ID;

    canvas.width = CANVAS_CONFIG.width;
    canvas.height = CANVAS_CONFIG.height;

    canvas.style.backgroundColor = CANVAS_CONFIG.backgroundColor;

    return canvas;
};

const buildPayload = (): Payload => {
    const viewport: vp.Viewport = {
        width: 600 as Clamped,
        height: 600 as Clamped,
        x: 100 as Clamped,
        y: 100 as Clamped,
        entities: [],
    };
    const tiles = tile(viewport, {
        countX: 8 as Clamped,
        countY: 8 as Clamped,
        colors: [COLORS.white, COLORS.black],
        stagger: true,
    });

    const chars: IRText[] = tiles.map((t) => fitChar(assertChar('P'), t));

    viewport.entities.push(...tiles, ...chars);

    const viewports: vp.Viewport[] = [];
    viewports.push(viewport);

    return { viewports: [viewport], state: {} };
};

const render = (payload: Payload, canvas: HTMLCanvasElement) => {
    clear(canvas);
    for (const viewport of payload.viewports) {
        vp.render(viewport, canvas);
    }
};

const clear = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = CANVAS_CONFIG.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const findCanvas = () => {
    return document.querySelector(`#${CANVAS_ID}`);
};

export const attach = (id: string): string => {
    const existingCanvas = findCanvas();
    if (existingCanvas) {
        console.warn('Attach called while canvas already attached. Aborting.');
        return CANVAS_ID;
    }

    const parent = document.querySelector(`#${id}`);
    if (!parent) {
        throw new Error(`Could not find element with id: ${id}`);
    }

    const canvas = createCanvas();
    parent.appendChild(canvas);

    if (!findCanvas()) {
        throw new Error(`Failed to attach element with id: ${id}`);
    }

    render(buildPayload(), canvas);

    return canvas.id;
};

export const detach = (id: string): boolean => {
    const elem = document.querySelector(`#${id}`);
    if (!elem) {
        console.warn(
            `Failed to find element with id ${id}. Nothing was detached.`
        );

        return false;
    }

    elem.remove();

    return true;
};

export const isAttached = (canvasId: string): boolean => {
    return !!document.querySelector(`#${canvasId}`);
};
