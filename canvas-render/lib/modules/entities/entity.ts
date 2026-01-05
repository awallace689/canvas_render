import type { CanvasId, Color } from '../../constants';
import { Box } from '../components/box';
import { Drawable } from '../components/drawable';
import { Text } from '../components/text';
import { v4 as randomUUID } from 'uuid';

export type Draw<T> = (canvas: HTMLCanvasElement, entity: T) => void;

type EntitiesByEntityId = Map<EntityId, Entity>;

export type EntityId = string & { __brand: 'entity id' };

const DELETED_ENTITIES_BY_CANVAS_ID = new Map<CanvasId, number>();

const ENTITIES_BY_ENTITY_ID_BY_CANVAS_ID: Map<CanvasId, EntitiesByEntityId> =
    new Map();

export interface Entity {
    id: EntityId;
    pos: { x: number; y: number };
    type: string;
    isDeleted: boolean;
    abilities: Partial<{
        box?: Box;
        radius?: number;
        color?: Color;
        text?: Text;
        drawable?: Drawable;
    }>;
}

export const createEntityId = (): EntityId => randomUUID() as EntityId;

export const deleteEntity = (canvasId: CanvasId, entity: Entity): void => {
    DELETED_ENTITIES_BY_CANVAS_ID.set(
        canvasId,
        (DELETED_ENTITIES_BY_CANVAS_ID.get(canvasId) ?? 0) + 1
    );
    entity.isDeleted = true;
};

const getEntitiesByEntityIdByCanvasId = (
    canvasId: CanvasId
): EntitiesByEntityId => {
    const entitiesByEntityId = ENTITIES_BY_ENTITY_ID_BY_CANVAS_ID.get(canvasId);
    if (!entitiesByEntityId) {
        throw new Error(`Entities not initialized for canvasId: ${canvasId}`);
    }

    return entitiesByEntityId;
};

export const setEntityById = (entity: Entity, canvasId: CanvasId): void => {
    const entitiesByEntityId = getEntitiesByEntityIdByCanvasId(canvasId);
    entitiesByEntityId.set(entity.id, entity);
};

export const getEntityById = (
    entityId: EntityId,
    canvasId: CanvasId
): Entity | undefined =>
    getEntitiesByEntityIdByCanvasId(canvasId).get(entityId);

export const initializeEntitiesByEntityIdByCanvasId = (
    canvasId: CanvasId
): void => {
    ENTITIES_BY_ENTITY_ID_BY_CANVAS_ID.set(canvasId, new Map());
};
