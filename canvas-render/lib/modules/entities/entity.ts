import { Color } from '../../types';
import { Text } from '../abilities/text';
import { Drawable } from '../abilities/drawable';
import { Size } from '../abilities/size';

export type Draw<T> = (canvas: HTMLCanvasElement, entity: T) => void;

export interface Entity {
    pos: { x: number; y: number };
    type: string;
    abilities: Partial<{
        size?: Size;
        color?: Color;
        text?: Text;
        drawable?: Drawable;
    }>;
}
