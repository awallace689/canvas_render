import { Clamped } from '../clamped';

export type Draw = (canvas: HTMLCanvasElement, entity: any) => void;

export interface Entity {
    pos: { x: Clamped; y: Clamped };
    draw: Draw;
}
