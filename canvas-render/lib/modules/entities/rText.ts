import { HasColor } from '../../types';
import { Entity } from './entity';

interface IRText {
    fontSize: number;
    font: string;
    text: string;
}

export type RText = Entity & IRText & HasColor;

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
