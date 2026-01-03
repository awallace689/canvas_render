import { CanvasConfig, CanvasId, createCanvasId } from './constants';
import { initializeKeyEventHandlers } from './modules/events/events';
import { Frame } from './modules/frame';
import { renderViewport } from './modules/viewport';

const canvasConfigMap = new Map<CanvasId, CanvasConfig>();
export const getCanvasConfig = (canvasId: CanvasId): CanvasConfig => {
    const config = canvasConfigMap.get(canvasId);
    if (!config) {
        throw new Error(`No canvas config found for canvasId: ${canvasId}`);
    }

    return config;
};

export const setCanvasConfig = (
    canvasId: CanvasId,
    config: CanvasConfig
): void => {
    canvasConfigMap.set(canvasId, config);
};

const canvasMap = new Map<CanvasId, HTMLCanvasElement>();
export const getCanvas = (canvasId: CanvasId): HTMLCanvasElement => {
    const canvas = canvasMap.get(canvasId);
    if (!canvas) {
        throw new Error(`No canvas found for canvasId: ${canvasId}`);
    }

    return canvas;
};

export const setCanvas = (
    canvasId: CanvasId,
    canvas: HTMLCanvasElement
): void => {
    canvasMap.set(canvasId, canvas);
};

const createCanvas = (
    config: CanvasConfig
): { canvasId: CanvasId; canvas: HTMLCanvasElement } => {
    const canvas = document.createElement('canvas');
    const canvasId = createCanvasId();

    canvas.id = canvasId;
    canvas.tabIndex = 0;

    setCanvasConfig(canvasId, config);

    if (config.keyEvents) {
        initializeKeyEventHandlers(canvas, canvasId);
    }

    canvas.width = config.width;
    canvas.height = config.height;

    canvas.style.backgroundColor = config.backgroundColor;

    return { canvasId, canvas };
};

export const renderCanvas = (frame: Frame, canvasId: CanvasId) => {
    clear(canvasId);

    for (const viewport of frame.viewports) {
        renderViewport(viewport, canvasId);
    }
};

const clear = (canvasId: CanvasId) => {
    const canvas = getCanvas(canvasId);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D context from canvas');
    }

    ctx.fillStyle = getCanvasConfig(canvasId).backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const findCanvas = (canvasId: CanvasId) => {
    return document.querySelector(`#${canvasId}`);
};

export const attach = (
    containerId: string,
    config: CanvasConfig,
    frame?: Frame
): CanvasId => {
    const parent = document.querySelector(`#${containerId}`);
    if (!parent) {
        throw new Error(`Could not find element with id: ${containerId}`);
    }

    const { canvasId, canvas } = createCanvas(config);
    parent.appendChild(canvas);

    if (!findCanvas(canvasId)) {
        throw new Error(`Failed to attach element with id: ${containerId}`);
    }

    setCanvas(canvasId, canvas);

    if (frame) {
        renderCanvas(frame, canvasId);
    }

    return canvasId;
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
