import type { Entity } from '../entities/entity';

export const isRadial = (
    entity: Entity
): entity is Entity & { abilities: { radius: number } } => {
    return 'radius' in entity.abilities;
};
