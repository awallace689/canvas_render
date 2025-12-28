export type Clamped = number & { __brand: 'clamped' };

export const clamp = (decimal: number): Clamped => {
    return Math.floor(decimal) as Clamped;
};

export const clampUp = (decimal: number): Clamped => {
    if (Number.isInteger(decimal)) {
        return decimal as Clamped;
    }

    return Math.ceil(decimal) as Clamped;
};

export const clampDown2D = (pos: {
    x: number;
    y: number;
}): { x: Clamped; y: Clamped } => {
    const { x, y } = pos;
    return { x: clamp(x), y: clamp(y) };
};

export const clampAdd = (...params: Clamped[]): Clamped =>
    (params as number[]).reduce((x, y) => x + y, 0) as Clamped;
