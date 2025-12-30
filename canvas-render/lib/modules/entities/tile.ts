import { Color } from '../../constants';
import { Box } from '../components/box';
import { Drawable, dispatchDraw } from '../components/drawable';
import { Entity } from './entity';

export type Tile = Entity & {
    abilities: {
        box: Box;
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

    const { width, height } = tile.abilities.box;
    const color = tile.abilities.color;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

export const createTile = (
    pos: { x: number; y: number },
    box: Box,
    color: Color
): Tile => {
    return {
        pos,
        type: 'Tile',
        isDeleted: false,
        abilities: {
            box,
            color,
            drawable: { draw: dispatchDraw },
        },
    };
};
