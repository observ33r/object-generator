import { objectGenerator } from '../src/objectGenerator.mjs';

describe('objectGenerator', () => {

    test('generates an Object with default settings', () => {
        const result = objectGenerator();
        expect(result).toBeInstanceOf(Object);
        expect(Object.keys(result).length).toBe(16);
        expect(typeof result['string-16-0']).toBe('string');
        expect(result['string-16-0']).toBe('value-16-0');
    });

    test('generates a nested Object with custom size and types', () => {
        const result = objectGenerator({
            type: Object,
            size: 2,
            nestedSize: 2,
            depth: 1,
            valueTypes: [String, Number, Object]
        });
        expect(result).toBeInstanceOf(Object);
        expect(Object.keys(result).length).toBe(2);
        expect(typeof result['string-2-0-0-0']).toBe('string');
        expect(result['object-2-0-1-1']).toBeInstanceOf(Object);
        expect(Object.keys(result['object-2-0-1-1']).length).toBe(2);
        expect(typeof result['object-2-0-1-1']['string-2-1-2-0']).toBe('string');
        expect(typeof result['object-2-0-1-1']['number-2-1-3-1']).toBe('number');

    });

    test('generates a shuffled Array with repeatable seed', () => {
        const result1 = objectGenerator({
            type: Array,
            size: 4,
            valueTypes: [Number],
            shuffle: true,
            seed: 42
        });
        const result2 = objectGenerator({
            type: Array,
            size: 4,
            valueTypes: [Number],
            shuffle: true,
            seed: 42
        });
        expect(result1).toBeInstanceOf(Array);
        expect(result1.length).toBe(4);
        expect(result1).toEqual(result2); // Repeatable with same seed
        expect(result1).not.toEqual([0, 1, 2, 3]); // Shuffled
    });

    test('generates a nested Set with custom options', () => {
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
                    expect(value).toMatch(/^value-2-[1-3]-[0-1]$/);
                });
            });
        });
    });

    test('respects depth and stops nesting', () => {
        const result = objectGenerator({
            type: Object,
            size: 1,
            nestedSize: 1,
            depth: 1,
            valueTypes: [Object]
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