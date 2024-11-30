import { CANVAS_CONFIG, CANVAS_ID } from './constants';
import { Clamped } from './modules/clamped';
import * as vp from './modules/viewport';

const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.id = CANVAS_ID;

    canvas.width = CANVAS_CONFIG.width;
    canvas.height = CANVAS_CONFIG.height;

    canvas.style.backgroundColor = CANVAS_CONFIG.backgroundColor;

    return canvas;
};

const render = (canvas: HTMLCanvasElement) => {
    const viewport: vp.Viewport = {
        width: 600 as Clamped,
        height: 600 as Clamped,
        x: 100 as Clamped,
        y: 100 as Clamped,
        entities: [],
    };
    vp.tile(viewport, {
        countX: 8 as Clamped,
        countY: 8 as Clamped,
        colors: ['white', 'black'],
        stagger: true,
    });

    const viewports: vp.Viewport[] = [];
    viewports.push(viewport);

    clear(canvas);
    for (const viewport of viewports) {
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

    render(canvas);

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
