import { CanvasId } from '../../constants';
import { Entity } from '../entities/entity';
import { getRealtimeKeyEventsByCanvasId, KeyEventType } from './keyEvents';

export type Event = {
    eventType: EventType;
    priority: number;
};

export type EventType = KeyEventType;

type Events = Event[];
export type SortedEvents = Event[] & { __brand: 'events sorted' };
type IsSortedEvents = { isSorted: boolean; events: Events };

export type EventIndex = Map<EventType, Set<Entity>>;

const EVENTS_BY_CANVAS_ID: Map<CanvasId, IsSortedEvents> = new Map();

const handleEvents = (canvasId: CanvasId): void => {
    const realtimeKeyEvents = getRealtimeKeyEventsByCanvasId(canvasId);
    const numRealtimeEvents = realtimeKeyEvents.length;

    raiseEvents(realtimeKeyEvents.slice(0, numRealtimeEvents), canvasId);
    realtimeKeyEvents.splice(0, numRealtimeEvents);
};

export const initializeEventsByCanvasId = (canvasId: CanvasId) => {
    if (EVENTS_BY_CANVAS_ID.has(canvasId)) {
        throw new Error(`Events already initialized for canvasId: ${canvasId}`);
    }

    EVENTS_BY_CANVAS_ID.set(canvasId, { isSorted: true, events: [] });
};

const getEventsByCanvasId = (canvasId: CanvasId): IsSortedEvents => {
    const events = EVENTS_BY_CANVAS_ID.get(canvasId);
    if (!events) {
        throw new Error(`No events initialized for canvasId: ${canvasId}`);
    }

    return events;
};

export const getSortedEventsByCanvasId = (canvasId: CanvasId): Events => {
    const isSortedEvents = getEventsByCanvasId(canvasId);
    if (!isSortedEvents.isSorted) {
        isSortedEvents.events.sort(
            (a, b) => b.priority - a.priority
        ) as SortedEvents;
    }

    return isSortedEvents.events;
};

export const raiseEvent = (event: Event, canvasId: CanvasId): void => {
    const isSortedEvents = getEventsByCanvasId(canvasId);

    isSortedEvents.isSorted = false;
    isSortedEvents.events.push(event);
};

export const raiseEvents = (event: Event[], canvasId: CanvasId): void => {
    const isSortedEvents = getEventsByCanvasId(canvasId);

    isSortedEvents.isSorted = false;
    isSortedEvents.events.push(...event);
};
