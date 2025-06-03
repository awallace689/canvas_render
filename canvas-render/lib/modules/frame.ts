import { Viewport } from './viewport';

export type Frame = { viewports: Viewport[] };

export const createFrame = () => ({ viewports: [] });

export const pushViewport = (vp: Viewport, frame: Frame): void => {
    frame.viewports.push(vp);
};

export const popViewport = (index: number, frame: Frame): void => {
    frame.viewports = frame.viewports.splice(index, 1);
};
