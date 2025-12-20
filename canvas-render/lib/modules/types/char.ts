export type Char = string & { __brand: 'character string' };

export const isChar = (str: string): str is Char => str.length === 1;
