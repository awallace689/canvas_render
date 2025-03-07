export type Draw = (canvas: HTMLCanvasElement, entity: any) => void;

export interface Entity {
    pos: { x: number; y: number };
    draw: Draw;
}
