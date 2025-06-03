import { Color } from '../../../types';
import { clampDown, clampUp, Clamped } from '../../clamped';
import { Tile, draw } from '../../entities/tile';
import { Viewport } from '../../viewport';

export const tile = (
    viewport: Viewport,
    options: {
        countX: Clamped;
        countY: Clamped;
        colors: [Color, Color];
        stagger?: boolean;
    }
): Tile[] => {
    const { countX, countY, colors, stagger } = options;

    const width = viewport.width / countX;
    const height = viewport.height / countY;

    let color = colors[0];
    let x_pos = viewport.x as number,
        y_pos = viewport.y as number;

    let i = 0,
        j = 0;

    const tiles: Tile[] = [];

    while (y_pos + height <= viewport.y + viewport.height) {
        while (x_pos + width <= viewport.x + viewport.width) {
            const tile: Tile = {
                pos: { x: clampDown(x_pos), y: clampDown(y_pos) },
                width: clampUp(width),
                height: clampUp(height),
                draw: draw,
                color,
                description: 'Tile',
            };

            tiles.push(tile);

            color = color === colors[0] ? colors[1] : colors[0];
            x_pos = x_pos + width;
            j += 1;
        }

        if (stagger && countX % 2 == 0) {
            color = color === colors[0] ? colors[1] : colors[0];
        }

        if (!stagger && countX % 2 == 1) {
            color = color === colors[0] ? colors[1] : colors[0];
        }

        y_pos = y_pos + height;
        x_pos = viewport.x;
        i += 1;
    }

    return tiles;
};
