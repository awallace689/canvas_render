export type Char = string & { __brand: 'char' };

export const isChar = (str: string): str is Char => str.length === 1;
