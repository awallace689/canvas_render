import { Timestamp } from '../../../examples/movement/main';
import { CanvasId } from '../../constants';
import { Entity } from '../entities/entity';

type KeyCode = string;
type KeyEvent = (keyboardEvent: KeyboardEvent, delta: Timestamp) => void;
type KeyEventCategory = 'keyup' | 'keydown' | 'held';
type KeyEvents = Set<KeyEvent>;
type KeyEventsByKeyCode = Map<KeyCode, KeyEvents>;
type KeyEventsByCategory = Readonly<
    Record<KeyEventCategory, KeyEventsByKeyCode>
>;
type KeyEventsByCategoryByCanvasId = Map<CanvasId, KeyEventsByCategory>;
type UnregisterKeyEvent = () => void;
export type EventsConfig = {
    unregister: () => void;
};

const KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID: KeyEventsByCategoryByCanvasId =
    new Map();

const HELD_KEYS_BY_CANVAS = new Map<CanvasId, Set<KeyCode>>();

const createKeyEventsByCategory = (): KeyEventsByCategory => {
    return {
        keyup: new Map(),
        keydown: new Map(),
        held: new Map(),
    };
};

const getKeyEventsByKeyCodeByCategory = (
    canvasId: CanvasId,
    category: KeyEventCategory
): KeyEventsByKeyCode => {
    const keyEventsByKeyCodeByCategory =
        KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.get(canvasId);

    if (!keyEventsByKeyCodeByCategory) {
        throw new Error(`No key events initialized for canvasId: ${canvasId}`);
    }

    return keyEventsByKeyCodeByCategory[category];
};

export const registerKeyEvent = (
    entity: Entity,
    canvasId: CanvasId,
    category: KeyEventCategory,
    keyCode: string,
    handler: KeyEvent
): UnregisterKeyEvent => {
    if (isEntityWithEvents(entity)) {
        entity.events.unregister();
    }

    const keyEventsByKeyCode = getKeyEventsByKeyCodeByCategory(
        canvasId,
        category
    );

    let keyEvents: KeyEvents | undefined = keyEventsByKeyCode.get(keyCode);
    if (!keyEvents) {
        keyEvents = new Set([handler]);
        keyEventsByKeyCode.set(keyCode, keyEvents);
    } else {
        keyEvents.add(handler);
    }

    return () => {
        keyEvents.delete(handler);
    };
};

export const initializeKeyEvents = (
    canvas: HTMLCanvasElement,
    canvasId: CanvasId
): void => {
    initializeKeyEventsByCategoryForCanvas(canvasId);

    addEventListeners(canvas, canvasId);
};

const addEventListeners = (canvas: HTMLCanvasElement, canvasId: CanvasId) => {
    canvas.addEventListener('keydown', (event) => {
        let heldKeys = HELD_KEYS_BY_CANVAS.get(canvasId);
        if (!heldKeys) {
            heldKeys = new Set<KeyCode>();
            HELD_KEYS_BY_CANVAS.set(canvasId, heldKeys);
        }
        heldKeys.add(event.code);
    });

    canvas.addEventListener('keyup', (event) => {
        const heldKeys = HELD_KEYS_BY_CANVAS.get(canvasId);
        const deleted = heldKeys?.delete(event.code);

        if (!deleted) {
            console.debug(
                'keydown with no keyup for key:',
                event.code,
                canvasId
            );
        }
    });
};

const initializeKeyEventsByCategoryForCanvas = (canvasId: CanvasId) => {
    if (KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.has(canvasId)) {
        throw new Error(
            `Key events already initialized for canvasId: ${canvasId}`
        );
    }

    KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.set(
        canvasId,
        createKeyEventsByCategory()
    );
};

const isEntityWithEvents = (
    entity: Entity
): entity is Entity & { events: EventsConfig } => {
    return entity.events !== undefined;
};
