import { Color } from '../../../types';
import { clampDown, clampUp, Clamped } from '../../clamped';
import * as ti from '../../entities/tile';
import { Viewport } from '../../viewport';

export const tile = (
    viewport: Viewport,
    options: {
        countX: Clamped;
        countY: Clamped;
        colors: [Color, Color];
        stagger?: boolean;
    }
): ti.Tile[] => {
    const { countX, countY, colors, stagger } = options;

    const width = viewport.width / countX;
    const height = viewport.height / countY;

    let color = colors[0];
    let x = viewport.x as number,
        y = viewport.y as number;

    const tiles: ti.Tile[] = [];
    while (y + height <= viewport.y + viewport.height) {
        while (x + width <= viewport.x + viewport.width) {
            const tile: ti.Tile = {
                pos: { x: clampDown(x), y: clampDown(y) },
                width: clampUp(width),
                height: clampUp(height),
                draw: ti.draw,
                color,
            };

            tiles.push(tile);

            color = color === colors[0] ? colors[1] : colors[0];
            x = x + width;
        }

        if (stagger && countX % 2 == 0) {
            color = color === colors[0] ? colors[1] : colors[0];
        }

        if (!stagger && countX % 2 == 1) {
            color = color === colors[0] ? colors[1] : colors[0];
        }

        y = y + height;
        x = viewport.x;
    }

    return tiles;
};
