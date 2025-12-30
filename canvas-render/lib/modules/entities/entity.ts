import type { CanvasId, Color } from '../../constants';
import { Box } from '../components/box';
import { Drawable } from '../components/drawable';
import { Text } from '../components/text';
import { EventsConfig } from '../events/events';

export type Draw<T> = (canvas: HTMLCanvasElement, entity: T) => void;

let DELETED_ENTITIES = new Map<CanvasId, number>();

export interface Entity {
    pos: { x: number; y: number };
    type: string;
    events?: EventsConfig;
    isDeleted: boolean;
    abilities: Partial<{
        box?: Box;
        radius?: number;
        color?: Color;
        text?: Text;
        drawable?: Drawable;
    }>;
}

export const deleteEntity = (canvasId: CanvasId, entity: Entity): void => {
    DELETED_ENTITIES.set(canvasId, (DELETED_ENTITIES.get(canvasId) ?? 0) + 1);
    entity.isDeleted = true;
};
