export type Clamped = number & { __brand: 'Clamped number' };

export const clamp = (decimal: number): Clamped => {
    if (Number.isInteger(decimal)) {
        return decimal as Clamped;
    }

    return Math.floor(decimal) as Clamped;
};

export const clamp2 = (x: number, y: number): { x: Clamped; y: Clamped } => {
    return { x: clamp(x), y: clamp(y) };
};
