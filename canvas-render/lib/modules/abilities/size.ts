import type { Entity } from '../entities/entity';

export interface Size {
    width: number;
    height: number;
}

export const isSize = (
    entity: Entity
): entity is Entity & { abilities: { size: Size } } => {
    return 'size' in entity.abilities;
};
