import { COLORS } from './constants';

export type Color = (typeof COLORS)[keyof typeof COLORS];
