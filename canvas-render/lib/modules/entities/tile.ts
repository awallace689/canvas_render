import { Color } from '../../types';
import { Entity } from './entity';
import { Size } from '../abilities/size';
import { Drawable, dispatchDraw } from '../abilities/drawable';

export type Tile = Entity & {
    abilities: {
        size: Size;
        color: Color;
        drawable: Drawable;
    };
};

export const isTile = (entity: Entity): entity is Tile => {
    return entity.type === 'Tile';
};

export const drawTile = (canvas: HTMLCanvasElement, tile: Tile): void => {
    const ctx = canvas.getContext('2d')!;

    const x = tile.pos.x,
        y = tile.pos.y;

    const { width, height } = tile.abilities.size;
    const color = tile.abilities.color;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

export const createTile = (
    pos: { x: number; y: number },
    size: Size,
    color: Color
): Tile => {
    return {
        pos,
        type: 'Tile',
        abilities: {
            size,
            color,
            drawable: { draw: dispatchDraw },
        },
    };
};
