import type { Color } from '../../types';
import type { Entity } from '../entities/entity';

export const isColor = (
    entity: Entity
): entity is Entity & { abilities: { color: Color } } => {
    return 'color' in entity.abilities;
};
