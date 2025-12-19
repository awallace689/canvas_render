import { CANVAS_CONFIG } from '../../../../constants';
import { midpoint } from '../../../../math';
import { CharColor } from '../../../../types';
import { Clamped } from '../../../clamped';
import { Box } from '../../../components/box';
import { Entity } from '../../../entities/entity';
import { RText, createRText } from '../../../entities/rText';

export const fitChar = (
    char: CharColor,
    sizedEntity: Entity & { abilities: { box: Box } },
    offset?: { x: Clamped; y: Clamped }
): RText => {
    const { width, height } = sizedEntity.abilities.box;
    const fontSize = Math.min(width, height);
    const mid = midpoint(sizedEntity.pos, {
        x: sizedEntity.pos.x + width,
        y: sizedEntity.pos.y + height,
    });

    const pos = { x: mid.x + (offset?.x ?? 0), y: mid.y + (offset?.y ?? 0) };

    return createRText(
        pos,
        {
            fontSize,
            font: CANVAS_CONFIG.font,
            text: char.char,
        },
        char.color
    );
};
