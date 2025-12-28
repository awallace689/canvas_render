import { Color } from '../../../constants';
import { Tile, createTile } from '../../entities/tile';
import { clamp, clampUp, Clamped, clampAdd } from '../../types/clamped';
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
    let xPos = viewport.x,
        yPos = viewport.y;

    const tiles: Tile[] = [];
    while (yPos + height <= viewport.y + viewport.height) {
        while (xPos + width <= viewport.x + viewport.width) {
            const tile = createTile(
                { x: clamp(xPos), y: clamp(yPos) },
                { width: clampUp(width), height: clampUp(height) },
                color
            );

            tiles.push(tile);

            color = alternateColor(color, colors);
            xPos = clampAdd(xPos, clamp(width));
        }

        const isEven = countX % 2 == 0;
        if ((stagger && isEven) || (!stagger && !isEven)) {
            color = alternateColor(color, colors);
        }

        yPos = clampAdd(yPos, clamp(height));
        xPos = viewport.x;
    }

    return tiles;
};
const alternateColor = (color: string, colors: [Color, Color]): Color =>
    color === colors[0] ? colors[1] : colors[0];
