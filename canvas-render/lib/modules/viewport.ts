import { Clamped } from './clamped';
import { Entity } from './entities/entity';

export interface Viewport {
    width: Clamped;
    height: Clamped;
    x: Clamped;
    y: Clamped;
    entities: Entity[];
    description: string;
}

export const render = (viewport: Viewport, canvas: HTMLCanvasElement) => {
    clear(viewport, canvas);
    for (const entity of viewport.entities) {
        entity.draw(canvas, entity);
    }

    return;
};

export const create = (
    width: Clamped,
    height: Clamped,
    x: Clamped,
    y: Clamped,
    entities: Entity[],
    description: string
): Viewport => {
    return {
        width,
        height,
        x,
        y,
        entities,
        description,
    };
};

const clear = (viewport: Viewport, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!;

    const x = viewport.x,
        y = viewport.y;

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, viewport.width, viewport.height);
};
