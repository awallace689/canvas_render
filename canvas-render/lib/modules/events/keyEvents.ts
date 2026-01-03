import { CanvasId } from '../../constants';
import { Timestamp } from '../../time';
import { Entity } from '../entities/entity';
import { Event } from '../events/events';

export type KeyEvent = Event & {
    eventType: KeyEventType;
    keyboardEvent: KeyboardEvent;
};

type KeyEventHandler = (
    keyboardEvent: KeyboardEvent,
    delta: Timestamp,
    entity: Entity
) => void;

type KeyCode = string;

type KeyEventHandlers = Set<KeyEventHandler>;

type KeyEventHandlersByKeyCode = Map<KeyCode, KeyEventHandlers>;

type KeyEventHandlersByType = Readonly<
    Record<KeyEventType, KeyEventHandlersByKeyCode>
>;

type KeyEventHandlersByTypeByCanvasId = Map<CanvasId, KeyEventHandlersByType>;

export type KeyEventType = 'keyup' | 'keydown' | 'held';

type UnregisterKeyEvent = () => void;

export type EventsConfig = {
    unregister: () => void;
};

const KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID: KeyEventHandlersByTypeByCanvasId =
    new Map();

const HELD_KEYS_BY_CANVAS = new Map<CanvasId, Set<KeyCode>>();

const createKeyEventHandlersByType = (): KeyEventHandlersByType => {
    return {
        keyup: new Map(),
        keydown: new Map(),
        held: new Map(),
    };
};

const getKeyEventHandlersByKeyCodeByType = (
    canvasId: CanvasId,
    category: KeyEventType
): KeyEventHandlersByKeyCode => {
    const sByKeyCodeByType = KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.get(canvasId);

    if (!sByKeyCodeByType) {
        throw new Error(`No key events initialized for canvasId: ${canvasId}`);
    }

    return sByKeyCodeByType[category];
};

export const registerKeyEventHandler = (
    entity: Entity,
    canvasId: CanvasId,
    options: {
        category: KeyEventType;
        keyCode: string;
        handler: KeyEventHandler;
    }
): UnregisterKeyEvent => {
    const { category, keyCode, handler } = options;
    const keyEventHandlersByKeyCode = getKeyEventHandlersByKeyCodeByType(
        canvasId,
        category
    );

    let keyEventHandlers: KeyEventHandlers | undefined =
        keyEventHandlersByKeyCode.get(keyCode);
    if (!keyEventHandlers) {
        keyEventHandlers = new Set([handler]);
        keyEventHandlersByKeyCode.set(keyCode, keyEventHandlers);
    } else {
        keyEventHandlers.add(handler);
    }

    return () => {
        keyEventHandlers.delete(handler);
    };
};

export const initializeKeyEventHandlers = (
    canvas: HTMLCanvasElement,
    canvasId: CanvasId
): void => {
    initializeKeyEventHandlersByTypeForCanvas(canvasId);

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

const handleEvents = (canvasId: CanvasId): void => {};

const initializeKeyEventHandlersByTypeForCanvas = (canvasId: CanvasId) => {
    if (KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.has(canvasId)) {
        throw new Error(
            `Key events already initialized for canvasId: ${canvasId}`
        );
    }

    KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.set(
        canvasId,
        createKeyEventHandlersByType()
    );
};
