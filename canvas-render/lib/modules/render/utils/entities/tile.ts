import { CANVAS_CONFIG } from '../../../../constants';
import { midpoint } from '../../../../math';
import { CharColor } from '../../../../types';
import { Entity, HasSize } from '../../../entities/entity';
import { RText, draw } from '../../../entities/rText';

export const fitChar = (
    char: CharColor,
    sizedEntity: Entity & HasSize
): RText => {
    const fontSize = Math.min(sizedEntity.width, sizedEntity.height);

    const text: RText = {
        fontSize,
        font: CANVAS_CONFIG.font,
        draw,
        text: char.char,
        pos: midpoint(sizedEntity.pos, {
            x: sizedEntity.pos.x + sizedEntity.width,
            y: sizedEntity.pos.y + sizedEntity.height,
        }),
        color: char.color,
        description: 'fitChar',
    };

    return text;
};
