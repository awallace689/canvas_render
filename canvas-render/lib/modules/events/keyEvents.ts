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

export const REALTIME_KEY_EVENTS_BY_CANVAS_ID: Map<CanvasId, KeyEvent[]> =
    new Map();

type KeyCode = string;

type KeyEventHandlers = Set<KeyEventHandler>;

type KeyEventHandlersByKeyCode = Map<KeyCode, KeyEventHandlers>;

type KeyEventHandlersByType = Readonly<
    Record<KeyEventType, KeyEventHandlersByKeyCode>
>;

type KeyEventHandlersByTypeByCanvasId = Map<CanvasId, KeyEventHandlersByType>;

export type RealtimeKeyEvent = 'keyup' | 'keydown';
export type KeyEventType = RealtimeKeyEvent | 'held';

type UnregisterKeyEvent = () => void;

export type EventsConfig = {
    unregister: () => void;
};

const KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID: KeyEventHandlersByTypeByCanvasId =
    new Map();

const HELD_KEYS_BY_CANVAS_ID = new Map<CanvasId, Set<KeyCode>>();

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
    const keyEventHandlersByKeyCodeByType =
        KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.get(canvasId);

    if (!keyEventHandlersByKeyCodeByType) {
        throw new Error(`No key events initialized for canvasId: ${canvasId}`);
    }

    return keyEventHandlersByKeyCodeByType[category];
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

export const initializeKeyEventHandlersByCanvasId = (
    canvas: HTMLCanvasElement,
    canvasId: CanvasId
): void => {
    initializeKeyEventHandlersByTypeForCanvas(canvasId);

    addEventListeners(canvas, canvasId);
};

const addEventListeners = (canvas: HTMLCanvasElement, canvasId: CanvasId) => {
    const keyDown = 'keydown';

    const realtimeKeyEvents = getRealtimeKeyEventsByCanvasId(canvasId);

    canvas.addEventListener(keyDown, (event) => {
        let heldKeys = getHeldKeysByCanvasId(canvasId);
        if (!heldKeys) {
            heldKeys = new Set<KeyCode>();
            HELD_KEYS_BY_CANVAS_ID.set(canvasId, heldKeys);
        }

        realtimeKeyEvents.push({
            eventType: keyDown,
            keyboardEvent: event,
            priority: -100,
        });
        heldKeys.add(event.code);
    });

    const keyUp = 'keyup';
    canvas.addEventListener(keyUp, (event) => {
        const heldKeys = HELD_KEYS_BY_CANVAS_ID.get(canvasId);

        realtimeKeyEvents.push({
            eventType: keyUp,
            keyboardEvent: event,
            priority: -100,
        });
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

const initializeKeyEventHandlersByTypeForCanvas = (canvasId: CanvasId) => {
    if (KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.has(canvasId)) {
        throw new Error(
            `Key events by category already initialized for canvasId: ${canvasId}`
        );
    }

    if (REALTIME_KEY_EVENTS_BY_CANVAS_ID.has(canvasId)) {
        throw new Error(
            `Realtime key events already initialized for canvasId: ${canvasId}`
        );
    }

    KEY_EVENTS_BY_CATEGORY_BY_CANVAS_ID.set(
        canvasId,
        createKeyEventHandlersByType()
    );

    REALTIME_KEY_EVENTS_BY_CANVAS_ID.set(canvasId, []);
};

export const getRealtimeKeyEventsByCanvasId = (
    canvasId: CanvasId
): KeyEvent[] => {
    const realtimeKeyEvents = REALTIME_KEY_EVENTS_BY_CANVAS_ID.get(canvasId);
    if (!realtimeKeyEvents) {
        throw new Error(
            `Realtime key events not initialized for canvasId: ${canvasId}`
        );
    }

    return realtimeKeyEvents;
};

export const getHeldKeysByCanvasId = (canvasId: CanvasId) => {
    const heldKeys = HELD_KEYS_BY_CANVAS_ID.get(canvasId);
    if (!heldKeys) {
        throw new Error(`Held keys not initialized for canvasId: ${canvasId}`);
    }

    return heldKeys;
};

export const setHeldKeyByCanvasId = (canvasId: CanvasId, keyCode: KeyCode) => {
    const heldKeys = getHeldKeysByCanvasId(canvasId);
    heldKeys.add(keyCode);
};

export const removeHeldKeyByCanvasId = (
    canvasId: CanvasId,
    keyCode: KeyCode
) => {
    const heldKeys = getHeldKeysByCanvasId(canvasId);
    const success = heldKeys.delete(keyCode);

    if (!success) {
        console.debug(
            `Tried to remove non-existent held key: ${keyCode} for canvasId: ${canvasId}`
        );
    }
};
