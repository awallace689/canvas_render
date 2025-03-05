import { TypeAssertError } from './errors';

export type Color = { color: string };

export type Char = string & { __brand: 'character string' };
export const isChar = (str: string): str is Char => str.length === 1;
export const assertChar = (str: string): Char => {
    if (str.length === 1) {
        return str as Char;
    } else {
        throw new TypeAssertError('Char', str);
    }
};
