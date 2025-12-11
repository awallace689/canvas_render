import { CANVAS_CONFIG, CANVAS_ID, COLORS } from './constants';
import { clampDown } from './modules/clamped';
import { Viewport, render } from './modules/viewport';
import { tile } from './modules/render/utils/viewport';
import { RText } from './modules/entities/rText';
import { fitChar } from './modules/render/utils/entities/tile';
import { createCharColor } from './types';
import { createFrame, Frame } from './modules/frame';

const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.id = CANVAS_ID;

    canvas.width = CANVAS_CONFIG.width;
    canvas.height = CANVAS_CONFIG.height;

    canvas.style.backgroundColor = CANVAS_CONFIG.backgroundColor;

    return canvas;
};

const buildFrame = (): Frame => {
    const viewport: Viewport = {
        width: clampDown(600),
        height: clampDown(600),
        x: clampDown(100),
        y: clampDown(100),
        entities: [],
        description: 'Frame',
    };
    const tiles = tile(viewport, {
        countX: clampDown(8),
        countY: clampDown(8),
        colors: [COLORS.white, COLORS.black],
        stagger: true,
    });

    const chars: RText[] = tiles.map((t) =>
        fitChar(createCharColor('P', COLORS.brown, true), t)
    );

    viewport.entities.push(...tiles, ...chars);

    const viewports: Viewport[] = [];
    viewports.push(viewport);

    return createFrame(viewport);
};

const renderCanvas = (payload: Frame, canvas: HTMLCanvasElement) => {
    clear(canvas);
    for (const viewport of payload.viewports) {
        render(viewport, canvas);
    }
};

const clear = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D context from canvas');
    }

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

    const frame = buildFrame();

    renderCanvas(frame, canvas);

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
