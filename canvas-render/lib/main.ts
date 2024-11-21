const CANVAS_ID = '__canvas_render__canvas';
const CANVAS_CONFIG = Object.freeze({
    width: 800,
    height: 800,
    /** CSS color */
    backgroundColor: 'white',
});

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

    return canvas.id;
};

export const detach = (id: string): boolean => {
    const getElem = () => {
        return document.querySelector(`#${id}`);
    };

    const elem = getElem();
    if (!elem) {
        console.warn(
            `Failed to find element with id ${id}. Nothing was detached.`
        );

        return false;
    }
    elem.remove();

    return true;
};

/**
 * Returns true if canvas is attached
 * @param canvasId id attr of canvas
 */
export const isAttached = (canvasId: string): boolean => {
    return !!document.querySelector(`#${canvasId}`);
};

const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.id = CANVAS_ID;

    canvas.width = CANVAS_CONFIG.width;
    canvas.height = CANVAS_CONFIG.height;

    canvas.style.backgroundColor = CANVAS_CONFIG.backgroundColor;

    return canvas;
};

const findCanvas = () => {
    return document.querySelector(`#${CANVAS_ID}`);
};
