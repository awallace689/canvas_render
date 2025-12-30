import { getCanvas, getCanvasConfig } from '../canvas';
import { CanvasId } from '../constants';
import { isDrawable } from './components/drawable';
import { Entity } from './entities/entity';
import { Clamped } from './types/clamped';

export interface Viewport {
    width: Clamped;
    height: Clamped;
    x: Clamped;
    y: Clamped;
    entities: Entity[];
    description: string;
    isDeleted: boolean;
}

export const renderViewport = (viewport: Viewport, canvasId: CanvasId) => {
    const canvas = getCanvas(canvasId);

    clearViewport(viewport, canvasId);
    for (const entity of viewport.entities) {
        if (isDrawable(entity)) {
            entity.abilities.drawable.draw(canvas, entity);
        }
    }
};

export const createViewport = (options: {
    width: Clamped;
    height: Clamped;
    x: Clamped;
    y: Clamped;
    entities: Entity[];
    description: string;
}): Viewport => {
    return {
        isDeleted: false,
        ...options,
    };
};

const clearViewport = (viewport: Viewport, canvasId: CanvasId) => {
    const canvas = getCanvas(canvasId);
    const ctx = canvas.getContext('2d')!;

    const x = viewport.x,
        y = viewport.y;

    ctx.fillStyle = getCanvasConfig(canvasId).backgroundColor;
    ctx.fillRect(x, y, viewport.width, viewport.height);
};
