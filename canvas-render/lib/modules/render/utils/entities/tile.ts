import { CANVAS_CONFIG, COLORS } from '../../../../constants';
import { midpoint } from '../../../../math';
import { Char } from '../../../../types';
import { clamp2 } from '../../../clamped';
import * as te from '../../../entities/rText';
import { Tile } from '../../../entities/tile';

export const fitChar = (char: Char, tile: Tile): te.RText => {
    const fontSize = Math.min(tile.width, tile.height);

    const text: te.RText = {
        fontSize,
        font: CANVAS_CONFIG.font,
        draw: te.draw,
        text: char,
        pos: {
            ...clamp2(
                midpoint(tile.pos, {
                    x: tile.pos.x + tile.width,
                    y: tile.pos.y + tile.height,
                })
            ),
        },
        color: COLORS.brown,
    };

    return text;
};
