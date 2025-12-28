import { TypeAssertError } from '../../errors';
import { Color } from '../../constants';
import type { Char } from './char';
import { isChar } from './char';

export type CharColor = { char: Char; color: Color };

export const createCharColor = (str: string, color: Color): CharColor => {
    if (!isChar(str)) {
        throw new TypeAssertError('Char', str);
    }

    return { char: str, color: color };
};
