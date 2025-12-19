import { COLORS } from '../../lib/constants';
import { Viewport } from '../../lib/modules/viewport';
import { clampDown } from '../../lib/modules/clamped';
import { tile } from '../../lib/modules/render/utils/viewport';
import { RText } from '../../lib/modules/entities/rText';
import { fitChar } from '../../lib/modules/render/utils/entities/tile';
import { createCharColor } from '../../lib/types';
import { createFrame, Frame } from '../../lib/modules/frame';
import { attach } from '../../lib/canvas.ts';

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

    const chars: RText[] = tiles.map((tile) =>
        fitChar(createCharColor('P', COLORS.brown), tile)
    );

    viewport.entities.push(...tiles, ...chars);

    return createFrame(viewport);
};

export const run = (containerId: string): string =>
    attach(containerId, buildFrame());
