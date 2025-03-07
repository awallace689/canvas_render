import { TypeAssertError } from './errors';
import { COLORS } from './constants';

export type Color = (typeof COLORS)[keyof typeof COLORS];

type Char = string & { __brand: 'character string' };
export type CharColor = { char: Char; color: Color };

export const isChar = (str: string): str is Char => str.length === 1;
export const createCharColor = (
    str: string,
    color: Color,
    assert = true
): CharColor => {
    if (assert && str.length === 1) {
        return { char: str as Char, color: color };
    } else {
        throw new TypeAssertError('Char', str);
    }
};
