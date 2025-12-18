import type { Entity } from '../entities/entity';
import { drawRText } from '../entities/rText';
import { drawTile } from '../entities/tile';
import { isRText } from '../entities/rText';
import { isTile } from '../entities/tile';

export interface Drawable {
    draw: (canvas: HTMLCanvasElement, entity: Entity) => void;
}

export const isDrawable = <T extends Entity>(
    entity: T
): entity is T & { abilities: { drawable: Drawable } } => {
    return 'drawable' in entity.abilities;
};

export const dispatchDraw = (canvas: HTMLCanvasElement, entity: Entity): void => {
    if (isRText(entity)) {
        drawRText(canvas, entity);
    } else if (isTile(entity)) {
        drawTile(canvas, entity);
    }
};
