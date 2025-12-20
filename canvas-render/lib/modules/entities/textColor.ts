import { Color } from '../../types';
import { Drawable, dispatchDraw } from '../components/drawable';
import { Text } from '../components/text';
import { Entity, Draw } from './entity';

export type TextColor = Entity & {
    abilities: {
        text: Text;
        color: Color;
        drawable: Drawable;
    };
};

export const isTextColor = (entity: Entity): entity is TextColor => {
    return entity.type === 'TextColor';
};

export const drawTextColor: Draw<TextColor> = (
    canvas: HTMLCanvasElement,
    text: TextColor
): void => {
    const ctx = canvas.getContext('2d')!;

    const x = text.pos.x,
        y = text.pos.y;

    const { fontSize, font, content: str } = text.abilities.text;
    const color = text.abilities.color;

    ctx.font = `${fontSize}px ${font}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
};

export const createTextColor = (
    pos: { x: number; y: number },
    text: Text,
    color: Color
): TextColor => {
    return {
        pos,
        type: 'TextColor',
        abilities: {
            text,
            color,
            drawable: { draw: dispatchDraw },
        },
    };
};
