import { clamp, Clamped } from './clamped';
import { Entity } from './entities/entity';
import * as ti from './entities/tile';

export interface Viewport {
    width: Clamped;
    height: Clamped;
    x: Clamped;
    y: Clamped;
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

    const x = viewport.x,
        y = viewport.y;

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, viewport.width, viewport.height);
};

export const tile = (
    viewport: Viewport,
    options: {
        countX: Clamped;
        countY: Clamped;
        colors: [string, string];
        stagger?: boolean;
    }
) => {
    const { countX, countY, colors, stagger } = options;

    const width = clamp(viewport.width / countX);
    const height = clamp(viewport.height / countY);

    let color = colors[0];
    let x = viewport.x,
        y = viewport.y;

    while (y + height <= viewport.y + viewport.height) {
        while (x + width <= viewport.x + viewport.width) {
            const tile: ti.Tile = {
                pos: { x, y },
                width: width,
                height: height,
                draw: ti.draw,
                color,
            };
            viewport.entities.push(tile);

            color = color === colors[0] ? colors[1] : colors[0];
            x = clamp(x + width);
        }

        if (stagger) {
            color = color === colors[0] ? colors[1] : colors[0];
        }

        y = clamp(y + height);
        x = viewport.x;
    }
};
