import { objectGenerator } from '../src/objectGenerator.mjs';

describe('objectGenerator', () => {

    test('Generates a Object with default settings', () => {
        const result = objectGenerator();
        expect(result).toBeInstanceOf(Object);
        expect(result).toStrictEqual({
            'string-16-0': 'value-16-0',
            'string-16-1': 'value-16-1',
            'string-16-2': 'value-16-2',
            'string-16-3': 'value-16-3',
            'string-16-4': 'value-16-4',
            'string-16-5': 'value-16-5',
            'string-16-6': 'value-16-6',
            'string-16-7': 'value-16-7',
            'string-16-8': 'value-16-8',
            'string-16-9': 'value-16-9',
            'string-16-10': 'value-16-10',
            'string-16-11': 'value-16-11',
            'string-16-12': 'value-16-12',
            'string-16-13': 'value-16-13',
            'string-16-14': 'value-16-14',
            'string-16-15': 'value-16-15'
        });
    });

    test('Generates a nested Object with custom prefix, size, and value types', () => {
        const result = objectGenerator({
            prefix: 'data',
            size: 4,
            nestedSize: 4,
            depth: 1,
            valueTypes: [String, Number, Boolean]
        });
        expect(result).toBeInstanceOf(Object);
        expect(result).toStrictEqual({
            'data-string-4-0-0-0': 'data-value-4-0-0-0',
            'data-number-4-0-1-1': 1,
            'data-boolean-4-0-2-2': true,
            'data-object-4-0-3-3': {
              'data-string-4-1-4-0': 'data-value-4-1-4-0',
              'data-number-4-1-5-1': 1,
              'data-boolean-4-1-6-2': true,
              'data-string-4-1-7-3': 'data-value-4-1-7-3'
            }
        });
    });

    test('Generates a simple Array', () => {
        const result = objectGenerator({
            type: Array,
            size: 8,
            valueTypes: [Number],
        });
        expect(result).toBeInstanceOf(Array);
        expect(result).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    test('Generate a repeatable shuffled Typed Array', () => {
        const result1 = objectGenerator({
            type: Uint8Array,
            size: 8,
            shuffle: true,
            seed: 42
        });
        const result2 = objectGenerator({
            type: Uint8Array,
            size: 8,
            shuffle: true,
            seed: 42
        });
        expect(result1).toBeInstanceOf(Uint8Array);
        expect(result1).toEqual(new Uint8Array([2, 0, 4, 1, 3, 6, 7, 5])); 
        expect(result1).toEqual(result2);
    });

    test('Generates a nested Set with custom options', () => {
        const result = objectGenerator({
            type: Set,
            size: 2,
            nestedSize: 2,
            depth: 2,
            valueTypes: [Set],
            globalIndex: false,
            shuffle: true,
            seed: 42
        });
        expect(result).toBeInstanceOf(Set);
        expect(result.size).toBe(2);
        result.forEach(nested => {
            expect(nested).toBeInstanceOf(Set);
            expect(nested.size).toBe(2);
            nested.forEach(deepNested => {
                expect(deepNested).toBeInstanceOf(Set);
                expect(deepNested.size).toBe(2);
                deepNested.forEach(value => {
                    expect(typeof value).toBe('string');
                    expect(value).toMatch(/^value-2-2-[0-1]$/);
                });
            });
        });
    });

    test('Respects nesting size and depth', () => {
        const result = objectGenerator({
            size: 1,
            nestedSize: 1,
            depth: 1,
        });
        expect(result).toBeInstanceOf(Object);
        expect(Object.keys(result).length).toBe(1);
        const nested = result['object-1-0-0-0'];
        expect(nested).toBeInstanceOf(Object);
        expect(Object.keys(nested).length).toBe(1);
        expect(typeof nested['string-1-1-1-0']).toBe('string');
        expect(nested['string-1-1-1-0']).toBe('value-1-1-1-0');
    });

});