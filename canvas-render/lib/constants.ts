import { Clamped } from './modules/types/clamped';
import { v4 as randomUUID } from 'uuid';

export type CanvasId = string & { __brand: 'canvas id' };

export const createCanvasId = (): CanvasId =>
    `__canvas_${randomUUID()}` as CanvasId;

export enum Color {
    brown = '#964B00',
    white = 'white',
    black = 'black',
    red = 'red',
    green = 'green',
    blue = 'blue',
}

export type CanvasConfig = Readonly<{
    width: Clamped;
    height: Clamped;
    backgroundColor: Color;
    font: 'serif' | 'sans-serif' | string;
    customEvents: boolean;
    keyEvents: boolean;
}>;

export const createCanvasConfig = (options: {
    -readonly [P in keyof CanvasConfig]: CanvasConfig[P];
}): CanvasConfig =>
    Object.freeze({
        ...options,
    });
