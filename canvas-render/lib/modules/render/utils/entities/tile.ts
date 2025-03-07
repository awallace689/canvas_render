import { CANVAS_CONFIG, COLORS } from '../../../../constants';
import { midpoint } from '../../../../math';
import { CharColor } from '../../../../types';
import * as te from '../../../entities/rText';
import { Tile } from '../../../entities/tile';

export const fitChar = (char: CharColor, tile: Tile): te.RText => {
    const fontSize = Math.min(tile.width, tile.height);

    const text: te.RText = {
        fontSize,
        font: CANVAS_CONFIG.font,
        draw: te.draw,
        text: char.char,
        pos: midpoint(tile.pos, {
            x: tile.pos.x + tile.width,
            y: tile.pos.y + tile.height,
        }),
        color: char.color,
    };

    return text;
};
