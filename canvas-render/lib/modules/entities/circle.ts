import { Color } from '../../constants';
import { Drawable, dispatchDraw } from '../components/drawable';
import { Entity, Draw } from './entity';

export type Circle = Entity & {
    abilities: {
        radius: number;
        color: Color;
        drawable: Drawable;
    };
};

export const isCircle = (entity: Entity): entity is Circle => {
    return entity.type === 'Circle';
};

export const drawCircle: Draw<Circle> = (
    canvas: HTMLCanvasElement,
    circle: Circle
): void => {
    const ctx = canvas.getContext('2d')!;

    const x = circle.pos.x,
        y = circle.pos.y;

    const radius = circle.abilities.radius;
    const color = circle.abilities.color;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
};

export const createCircle = (
    pos: { x: number; y: number },
    radius: number,
    color: Color
): Circle => {
    return {
        pos,
        type: 'Circle',
        abilities: {
            radius,
            color,
            drawable: { draw: dispatchDraw },
        },
    };
};
