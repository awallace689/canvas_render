import type { Color } from '../../constants';
import { Box } from '../components/box';
import { Drawable } from '../components/drawable';
import { Text } from '../components/text';

export type Draw<T> = (canvas: HTMLCanvasElement, entity: T) => void;

export interface Entity {
    pos: { x: number; y: number };
    type: string;
    abilities: Partial<{
        box?: Box;
        radius?: number;
        color?: Color;
        text?: Text;
        drawable?: Drawable;
    }>;
}
