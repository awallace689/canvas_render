import { getCanvasConfig } from '../../../../canvas';
import { CanvasId } from '../../../../constants';
import { midpoint } from '../../../../math';
import { Box } from '../../../components/box';
import { Entity } from '../../../entities/entity';
import { TextColor, createTextColor } from '../../../entities/textColor';
import type { CharColor } from '../../../types/charColor';
import { Clamped } from '../../../types/clamped';

export const fitChar = (
    canvasId: CanvasId,
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
        {
            pos,
            text: {
                fontSize,
                font: getCanvasConfig(canvasId).font,
                content: char.char,
            },
            color: char.color,
        },
        canvasId
    );
};
