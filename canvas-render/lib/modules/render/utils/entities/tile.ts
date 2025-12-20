import { CANVAS_CONFIG } from '../../../../constants';
import { midpoint } from '../../../../math';
import type { CharColor } from '../../../types/charColor';
import { Box } from '../../../components/box';
import { Entity } from '../../../entities/entity';
import { TextColor, createTextColor } from '../../../entities/textColor';
import { Clamped } from '../../../types/clamped';

export const fitChar = (
    char: CharColor,
    sizedEntity: Entity & { abilities: { box: Box } },
    offset?: { x: Clamped; y: Clamped }
): TextColor => {
    const { width, height } = sizedEntity.abilities.box;
    const fontSize = Math.min(width, height);
    const mid = midpoint(sizedEntity.pos, {
        x: sizedEntity.pos.x + width,
        y: sizedEntity.pos.y + height,
    });

    const pos = { x: mid.x + (offset?.x ?? 0), y: mid.y + (offset?.y ?? 0) };

    return createTextColor(
        pos,
        {
            fontSize,
            font: CANVAS_CONFIG.font,
            content: char.char,
        },
        char.color
    );
};
