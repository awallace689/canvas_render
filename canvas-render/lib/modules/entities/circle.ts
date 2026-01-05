import { CanvasId, Color } from '../../constants';
import { Drawable, dispatchDraw } from '../components/drawable';
import { Entity, Draw, createEntityId, setEntityById } from './entity';

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
    config: {
        pos: { x: number; y: number };
        radius: number;
        color: Color;
    },
    canvasId: CanvasId
): Circle => {
    const { pos, radius, color } = config;
    const circle = {
        id: createEntityId(),
        pos,
        type: 'Circle',
        isDeleted: false,
        abilities: {
            radius,
            color,
            drawable: { draw: dispatchDraw },
        },
    };

    setEntityById(circle, canvasId);

    return circle;
};
