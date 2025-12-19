import { Color } from '../../types';
import { Drawable, dispatchDraw } from '../components/drawable';
import { Text } from '../components/text';
import { Entity, Draw } from './entity';

export type RText = Entity & {
    abilities: {
        text: Text;
        color: Color;
        drawable: Drawable;
    };
};

export const isRText = (entity: Entity): entity is RText => {
    return entity.type === 'RText';
};

export const drawRText: Draw<RText> = (
    canvas: HTMLCanvasElement,
    text: RText
): void => {
    const ctx = canvas.getContext('2d')!;

    const x = text.pos.x,
        y = text.pos.y;

    const { fontSize, font, text: str } = text.abilities.text;
    const color = text.abilities.color;

    ctx.font = `${fontSize}px ${font}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
};

export const createRText = (
    pos: { x: number; y: number },
    text: Text,
    color: Color
): RText => {
    return {
        pos,
        type: 'RText',
        abilities: {
            text,
            color,
            drawable: { draw: dispatchDraw },
        },
    };
};
