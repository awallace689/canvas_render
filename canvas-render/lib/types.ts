import { COLORS } from './constants';
import { TypeAssertError } from './errors';

export type Color = (typeof COLORS)[keyof typeof COLORS];

type Char = string & { __brand: 'character string' };
export type CharColor = { char: Char; color: Color };

export const isChar = (str: string): str is Char => str.length === 1;
export const createCharColor = (str: string, color: Color): CharColor => {
    if (!isChar(str)) {
        throw new TypeAssertError('Char', str);
    }

    return { char: str, color: color };
};
