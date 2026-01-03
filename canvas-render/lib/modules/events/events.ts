import { CanvasId } from '../../constants';
import { Entity } from '../entities/entity';
import { KeyEventType } from './keyEvents';
import { MinQueue } from 'heapify';

export type Event = {
    eventType: EventType;
};

export type EventType = KeyEventType;

const EVENTS_BY_CANVAS_ID: Map<CanvasId, MinQueue> = new Map();

initializeEventsByCanvasId = (canvasId: CanvasId) => {
    if (EVENTS_BY_CANVAS_ID.has(canvasId)) {
        throw new Error(`Events already initialized for canvasId: ${canvasId}`);
    }

    EVENTS_BY_CANVAS_ID.set(canvasId, new MinQueue());
};
