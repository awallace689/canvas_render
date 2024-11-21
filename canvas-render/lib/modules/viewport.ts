import { clamp } from './clamped';
import { Entity } from './entities/entity';
import * as ti from './entities/tile';

export interface Viewport {
    width: number;
    height: number;
    entities: Entity[];
}

export const render = (viewport: Viewport, canvas: HTMLCanvasElement) => {
    clear(viewport, canvas);
    for (const entity of viewport.entities) {
        entity.draw(canvas, entity);
    }
    return;
};

const clear = (viewport: Viewport, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!;

    const x = 0,
        y = 0;

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, viewport.width, viewport.height);
};

export const tile = (viewport: Viewport, countX: number, countY: number) => {
    const width = clamp(viewport.width / countX);
    const height = clamp(viewport.height / countY);

    const colors = ['white', 'black'];
    let color = colors[0];
    let x = 0,
        y = 0;

    while (y + height <= viewport.height) {
        while (x + width <= viewport.width) {
            const tile: ti.Tile = {
                pos: { x, y },
                width: width,
                height: height,
                draw: ti.draw,
                color,
            };
            viewport.entities.push(tile);

            color = color === colors[0] ? colors[1] : colors[0];
            x += width;
        }

        y += height;
        x = 0;
    }
};
