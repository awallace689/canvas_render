import { Color } from '../../types';
import { Text } from '../components/text';
import { Drawable } from '../components/drawable';
import { Box } from '../components/box';

export type Draw<T> = (canvas: HTMLCanvasElement, entity: T) => void;

export interface Entity {
    pos: { x: number; y: number };
    type: string;
    abilities: Partial<{
        box?: Box;
        color?: Color;
        text?: Text;
        drawable?: Drawable;
    }>;
}
