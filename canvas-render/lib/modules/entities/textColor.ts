import { CanvasId, Color } from '../../constants';
import { Drawable, dispatchDraw } from '../components/drawable';
import { Text } from '../components/text';
import { Entity, Draw, createEntityId, setEntityById } from './entity';

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

    const x = text.pos.x;
    const y = text.pos.y;

    const { fontSize, font, content: str } = text.abilities.text;
    const color = text.abilities.color;

    ctx.font = `${fontSize}px ${font}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
};

export const createTextColor = (
    config: { pos: { x: number; y: number }; text: Text; color: Color },
    canvasId: CanvasId
): TextColor => {
    const { pos, text, color } = config;
    const textColor = {
        id: createEntityId(),
        pos,
        type: 'TextColor',
        isDeleted: false,
        abilities: {
            text,
            color,
            drawable: { draw: dispatchDraw },
        },
    };

    setEntityById(textColor, canvasId);

    return textColor;
};
