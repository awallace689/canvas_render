import { attach, getCanvasConfig, renderCanvas } from '../../lib/canvas';
import { CanvasId, Color, createCanvasConfig } from '../../lib/constants';
import { TextColor } from '../../lib/modules/entities/textColor';
import { createFrame, Frame } from '../../lib/modules/frame';
import { fitChar } from '../../lib/modules/render/utils/entities/tile';
import { tile } from '../../lib/modules/render/utils/viewport';
import { createCharColor } from '../../lib/modules/types/charColor';
import { clamp } from '../../lib/modules/types/clamped';
import { Viewport } from '../../lib/modules/viewport';

export const buildFrame = (canvasId: CanvasId): Frame => {
    const config = getCanvasConfig(canvasId);
    const margin = 100;
    const viewport: Viewport = {
        width: clamp(config.width - 2 * margin),
        height: clamp(config.width - 2 * margin),
        x: clamp(100),
        y: clamp(100),
        entities: [],
        description: 'Frame',
    };
    const tiles = tile(viewport, {
        countX: clamp(8),
        countY: clamp(8),
        colors: [Color.white, Color.black],
        stagger: true,
    });

    const chars: TextColor[] = tiles.map((tile) =>
        fitChar(canvasId, createCharColor('P', Color.brown), tile)
    );

    viewport.entities.push(...tiles, ...chars);

    return createFrame(viewport);
};

export const run = (containerId: string): void => {
    const canvasId = attach(
        containerId,
        createCanvasConfig({
            width: clamp(800),
            height: clamp(800),
            backgroundColor: Color.green,
            font: 'serif',
            keyEvents: false,
        })
    );

    renderCanvas(buildFrame(canvasId), canvasId);
};
