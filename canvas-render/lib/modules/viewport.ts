import { COLORS } from '../constants';
import { Clamped } from './types/clamped';
import { isDrawable } from './components/drawable';
import { TextColor } from './entities/textColor';
import { Tile } from './entities/tile';

export type RenderableEntity = Tile | TextColor;

export interface Viewport {
    width: Clamped;
    height: Clamped;
    x: Clamped;
    y: Clamped;
    entities: RenderableEntity[];
    description: string;
}

export const render = (viewport: Viewport, canvas: HTMLCanvasElement) => {
    clear(viewport, canvas);
    for (const entity of viewport.entities) {
        if (isDrawable(entity)) {
            entity.abilities.drawable.draw(canvas, entity);
        }
    }
};

export const create = (
    width: Clamped,
    height: Clamped,
    x: Clamped,
    y: Clamped,
    entities: RenderableEntity[],
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

    ctx.fillStyle = COLORS.red;
    ctx.fillRect(x, y, viewport.width, viewport.height);
};
