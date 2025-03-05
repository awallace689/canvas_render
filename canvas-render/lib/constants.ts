export const CANVAS_ID = '__canvas_render__canvas';

export const COLORS = {
    brown: '#964B00',
    white: 'white',
    black: 'black',
    red: 'red',
    green: 'green',
};

export const CANVAS_CONFIG = Object.freeze({
    width: 800,
    height: 800,
    /** CSS color */
    backgroundColor: COLORS.green,
    viewports: [{ x: 400, y: 400, entities: [] }],
    font: 'serif',
});
