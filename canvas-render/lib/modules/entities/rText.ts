import { Color } from '../../types';
import { Draw, Entity } from './entity';

export interface IRText extends Entity {
    fontSize: number;
    font: string;
    text: string;
    draw: Draw;
}

export type RText = IRText & Color;

export const draw = (canvas: HTMLCanvasElement, text: RText): void => {
    const ctx = canvas.getContext('2d')!;

    const x = text.pos.x,
        y = text.pos.y;

    ctx.font = `${text.fontSize}px ${text.font}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, x, y);
};
