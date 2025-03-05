export const midpoint = (
    pos1: {
        x: number;
        y: number;
    },
    pos2: { x: number; y: number }
): { x: number; y: number } => {
    const { x: x1, y: y1 } = pos1;
    const { x: x2, y: y2 } = pos2;

    return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
};
