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
    let xPos = viewport.x as number,
        yPos = viewport.y as number;

    const tiles: Tile[] = [];
    while (yPos + height <= viewport.y + viewport.height) {
        while (xPos + width <= viewport.x + viewport.width) {
            const tile: Tile = {
                pos: { x: clampDown(xPos), y: clampDown(yPos) },
                width: clampUp(width),
                height: clampUp(height),
                draw: draw,
                color,
                description: 'Tile',
            };

            tiles.push(tile);

            color = color === colors[0] ? colors[1] : colors[0];
            xPos = xPos + width;
        }

        const isEven = countX % 2 == 0;
        if ((stagger && isEven) || (!stagger && !isEven)) {
            color = alternateColor(color, colors);
        }

        yPos = yPos + height;
        xPos = viewport.x;
    }

    return tiles;
};
const alternateColor = (color: string, colors: [Color, Color]): Color =>
    color === colors[0] ? colors[1] : colors[0];
