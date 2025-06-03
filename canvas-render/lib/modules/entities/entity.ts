export type Draw = (canvas: HTMLCanvasElement, entity: any) => void;

export interface HasSize {
    width: number;
    height: number;
}

export interface Entity {
    pos: { x: number; y: number };
    description: string;
    draw: Draw;
}
