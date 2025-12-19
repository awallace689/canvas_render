import type { Entity } from '../entities/entity';
import type { Color } from '../../types';

export const isColor = (
    entity: Entity
): entity is Entity & { abilities: { color: Color } } => {
    return 'color' in entity.abilities;
};
