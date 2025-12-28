import {
    createFrame,
    pushViewport,
    popViewport,
} from '../../lib/modules/frame';
import { clamp } from '../../lib/modules/types/clamped';
import { Viewport } from '../../lib/modules/viewport';
import { expect, describe, test } from 'vitest';

const createMockViewport = (
    description: string = 'Mock Viewport'
): Viewport => ({
    width: clamp(100),
    height: clamp(100),
    x: clamp(0),
    y: clamp(0),
    entities: [],
    description,
});

describe('frame', () => {
    describe('createFrame', () => {
        test('creates empty frame when no viewports provided', () => {
            const frame = createFrame();
            expect(frame.viewports).toEqual([]);
        });

        test('creates frame with single viewport', () => {
            const viewport = createMockViewport();
            const frame = createFrame(viewport);
            expect(frame.viewports).toHaveLength(1);
            expect(frame.viewports[0]).toBe(viewport);
        });

        test('creates frame with array of viewports', () => {
            const viewports = [
                createMockViewport('v1'),
                createMockViewport('v2'),
            ];
            const frame = createFrame(viewports);
            expect(frame.viewports).toHaveLength(2);
            expect(frame.viewports).toEqual(viewports);
        });

        test('creates a copy of the viewports array', () => {
            const viewports = [createMockViewport()];
            const frame = createFrame(viewports);
            expect(frame.viewports).not.toBe(viewports);
            expect(frame.viewports).toEqual(viewports);
        });
    });

    describe('pushViewport', () => {
        test('adds viewport to frame', () => {
            const frame = createFrame();
            const viewport = createMockViewport();

            pushViewport(viewport, frame);

            expect(frame.viewports).toHaveLength(1);
            expect(frame.viewports[0]).toBe(viewport);
        });

        test('adds viewport to existing viewports', () => {
            const v1 = createMockViewport('v1');
            const v2 = createMockViewport('v2');
            const frame = createFrame(v1);

            pushViewport(v2, frame);

            expect(frame.viewports).toHaveLength(2);
            expect(frame.viewports[1]).toBe(v2);
        });
    });

    describe('popViewport', () => {
        test('removes viewport at index', () => {
            const v1 = createMockViewport('v1');
            const v2 = createMockViewport('v2');
            const v3 = createMockViewport('v3');
            const frame = createFrame([v1, v2, v3]);

            popViewport(1, frame);

            expect(frame.viewports).toHaveLength(2);
            expect(frame.viewports[0]).toBe(v1);
            expect(frame.viewports[1]).toBe(v3);
        });

        test('handles index out of bounds gracefully (splice behavior)', () => {
            const v1 = createMockViewport('v1');
            const frame = createFrame([v1]);

            popViewport(5, frame);

            expect(frame.viewports).toHaveLength(1);
            expect(frame.viewports[0]).toBe(v1);
        });
    });
});
