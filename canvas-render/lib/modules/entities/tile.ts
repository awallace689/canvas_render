import { HasColor } from '../../types';
import { Drawable, HasSize } from './entity';

export type Tile = Drawable & HasSize & HasColor;

export const draw = (canvas: HTMLCanvasElement, tile: Tile): void => {
    const ctx = canvas.getContext('2d')!;

    const x = tile.pos.x,
        y = tile.pos.y;

    ctx.fillStyle = tile.color;
    ctx.fillRect(x, y, tile.width, tile.height);
};
