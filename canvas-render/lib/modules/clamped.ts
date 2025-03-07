export type Clamped = number & { __brand: 'Clamped number' };

export const clampDown = (decimal: number): Clamped => {
    if (Number.isInteger(decimal)) {
        return decimal as Clamped;
    }

    return Math.floor(decimal) as Clamped;
};

export const clampUp = (decimal: number): Clamped => {
    if (Number.isInteger(decimal)) {
        return decimal as Clamped;
    }

    return Math.ceil(decimal) as Clamped;
};

export const clampDown2 = (pos: {
    x: number;
    y: number;
}): { x: Clamped; y: Clamped } => {
    const { x, y } = pos;
    return { x: clampDown(x), y: clampDown(y) };
};
