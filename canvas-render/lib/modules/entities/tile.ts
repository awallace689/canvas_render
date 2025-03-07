import { Color } from '../../types';
import { Clamped } from '../clamped';
import { Draw, Entity } from './entity';

interface ITile extends Entity {
    width: Clamped;
    height: Clamped;
    draw: Draw;
}

export type Tile = ITile & Color;

export const draw = (canvas: HTMLCanvasElement, tile: Tile): void => {
    const ctx = canvas.getContext('2d')!;

    const x = tile.pos.x,
        y = tile.pos.y;

    ctx.fillStyle = tile.color;
    ctx.fillRect(x, y, tile.width, tile.height);
};
