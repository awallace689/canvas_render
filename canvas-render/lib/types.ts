import { TypeAssertError } from './errors';
import { COLORS } from './constants';

export type Color = (typeof COLORS)[keyof typeof COLORS];
export type HasColor = { color: Color };

type Char = string & { __brand: 'character string' };
export type CharColor = { char: Char } & HasColor;

export const isChar = (str: string): str is Char => str.length === 1;
export const createCharColor = (
    str: string,
    color: Color,
    assert = true
): CharColor => {
    if (assert && str.length !== 1) {
        throw new TypeAssertError('Char', str);
    }

    return { char: str as Char, color: color };
};
