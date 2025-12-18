import type { Entity } from '../entities/entity';

export interface Text {
    fontSize: number;
    font: string;
    text: string;
}

export const isText = (
    entity: Entity
): entity is Entity & { abilities: { text: Text } } => {
    return 'text' in entity.abilities;
};
