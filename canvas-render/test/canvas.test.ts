import { attach } from '../lib/canvas.ts';
import { CANVAS_ID } from '../lib/constants.ts';
import { expect, describe, test, beforeEach, afterEach, vi } from 'vitest';

const MOCK_CONTAINER_ID = 'mock-container-id';

describe('attach', () => {
    describe('with container', () => {
        beforeEach(() => {
            createContainer(MOCK_CONTAINER_ID);
        });

        afterEach(() => {
            cleanupContainer(MOCK_CONTAINER_ID);
        });

        test('returns canvas ID after attaching', () => {
            const res = attach(MOCK_CONTAINER_ID);

            expect(res).toEqual(CANVAS_ID);
        });

        test('actually attaches canvas to container', () => {
            attach(MOCK_CONTAINER_ID);
            const container = document.querySelector(`#${MOCK_CONTAINER_ID}`);
            const canvas = container!.querySelector(`canvas#${CANVAS_ID}`);

            expect(canvas).not.toBeNull();
        });

        test('throws if canvas not attached to container', () => {
            const container = document.querySelector(`#${MOCK_CONTAINER_ID}`);
            container!.appendChild = vi.fn();

            expect(() => attach(MOCK_CONTAINER_ID)).toThrow(
                `Failed to attach element with id: ${MOCK_CONTAINER_ID}`
            );
            expect(container!.appendChild).toHaveBeenCalledTimes(1);
        });

        const createContainer = (containerId: string) => {
            const container = document.createElement('div');
            container.id = containerId;

            document.body.appendChild(container);

            return container;
        };

        const cleanupContainer = (containerId: string) => {
            let container = document.querySelector(`#${containerId}`);
            if (!container) {
                throw new Error('Container not found.');
            }

            document.body.removeChild(container);

            container = document.querySelector(`#${containerId}`);
            if (container) {
                throw new Error('Container not removed.');
            }

            return container;
        };
    });

    describe('without container', () => {
        test('cleans up', () => {
            expect(() => attach(MOCK_CONTAINER_ID)).toThrow(
                `Could not find element with id: ${MOCK_CONTAINER_ID}`
            );
        });
    });
});
