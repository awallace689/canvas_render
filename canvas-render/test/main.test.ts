import { expect, describe, test } from 'vitest';
import { attach } from '../lib/main.ts';

describe('attach', () => {
    test('does a thing', () => {
        const res = attach('some id');
        expect(res).toEqual([1, 'asdf', 'some id']);
    });
});
