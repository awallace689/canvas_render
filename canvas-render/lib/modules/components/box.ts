import type { Entity } from '../entities/entity';

export interface Box {
    width: number;
    height: number;
}

export const isBox = (
    entity: Entity
): entity is Entity & { abilities: { box: Box } } => {
    return 'box' in entity.abilities;
};
