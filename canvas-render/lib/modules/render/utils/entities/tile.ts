import { CANVAS_CONFIG } from '../../../../constants';
import { midpoint } from '../../../../math';
import { CharColor } from '../../../../types';
import { Entity } from '../../../entities/entity';
import { Size } from '../../../abilities/size';
import { RText, createRText } from '../../../entities/rText';

export const fitChar = (
    char: CharColor,
    sizedEntity: Entity & { abilities: { size: Size } }
): RText => {
    const { width, height } = sizedEntity.abilities.size;
    const fontSize = Math.min(width, height);

    return createRText(
        midpoint(sizedEntity.pos, {
            x: sizedEntity.pos.x + width,
            y: sizedEntity.pos.y + height,
        }),
        {
            fontSize,
            font: CANVAS_CONFIG.font,
            text: char.char,
        },
        char.color
    );
};
