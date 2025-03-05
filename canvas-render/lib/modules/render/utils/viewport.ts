import { clamp, Clamped } from '../../clamped';
import * as ti from '../../entities/tile';
import { Viewport } from '../../viewport';

export const tile = (
    viewport: Viewport,
    options: {
        countX: Clamped;
        countY: Clamped;
        colors: [string, string];
        stagger?: boolean;
    }
): ti.Tile[] => {
    const { countX, countY, colors, stagger } = options;

    const width = clamp(viewport.width / countX);
    const height = clamp(viewport.height / countY);

    let color = colors[0];
    let x = viewport.x,
        y = viewport.y;

    const tiles: ti.Tile[] = [];
    while (y + height <= viewport.y + viewport.height) {
        while (x + width <= viewport.x + viewport.width) {
            const tile: ti.Tile = {
                pos: { x, y },
                width: width,
                height: height,
                draw: ti.draw,
                color,
            };
            tiles.push(tile);

            color = color === colors[0] ? colors[1] : colors[0];
            x = clamp(x + width);
        }

        if (stagger) {
            color = color === colors[0] ? colors[1] : colors[0];
        }

        y = clamp(y + height);
        x = viewport.x;
    }

    return tiles;
};
