import { attach } from '../../lib/canvas.ts';
import { COLORS } from '../../lib/constants';
import { clampDown } from '../../lib/modules/types/clamped';
import { TextColor } from '../../lib/modules/entities/textColor';
import { createFrame, Frame } from '../../lib/modules/frame';
import { fitChar } from '../../lib/modules/render/utils/entities/tile';
import { tile } from '../../lib/modules/render/utils/viewport';
import { Viewport } from '../../lib/modules/viewport';
import { createCharColor } from '../../lib/modules/types/charColor';

export const buildFrame = (): Frame => {
    const viewport: Viewport = {
        width: clampDown(600),
        height: clampDown(600),
        x: clampDown(100),
        y: clampDown(100),
        entities: [],
        description: 'Frame',
    };
    const tiles = tile(viewport, {
        countX: clampDown(8),
        countY: clampDown(8),
        colors: [COLORS.white, COLORS.black],
        stagger: true,
    });

    const chars: TextColor[] = tiles.map((tile) =>
        fitChar(createCharColor('P', COLORS.brown), tile)
    );

    viewport.entities.push(...tiles, ...chars);

    return createFrame(viewport);
};

export const run = (containerId: string): string =>
    attach(containerId, buildFrame());
