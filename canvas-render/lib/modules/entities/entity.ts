export type Draw<T> = (canvas: HTMLCanvasElement, entity: T) => void;

export interface HasSize {
    width: number;
    height: number;
}

export interface Entity {
    pos: { x: number; y: number };
    description: string;
    draw: Draw<T>;
}
