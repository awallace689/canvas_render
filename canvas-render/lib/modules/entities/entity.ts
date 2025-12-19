import { Color } from '../../types';
import { Box } from '../components/box';
import { Drawable } from '../components/drawable';
import { Text } from '../components/text';

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
