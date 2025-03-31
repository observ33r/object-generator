# object-generator

High-performance, customizable dummy object generator for testing and benchmarking.

## Installation

Install the package via npm:

`npm install @observ33r/object-generator`

## Usage

### objectGenerator(options) 

#### Parameters

- `options` {Object} Optional configuration for the generator.
  - `preffix` {string|false} A prefix to prepend to generated keys/strings. Must be a non-empty string or `false`. **Default:** `false`.
  - `type` {Function} The type of object to generate. Must be one of `Object`, `Array`, `Set`, `Map`, or `Uint8Array`. **Default:** `Object`.
  - `size` {number} The size of the top-level object. Must be an integer. **Default:** `16`.
  - `nestedSize` {number} The size of nested objects. Must be an integer. **Default:** `16`.
  - `depth` {number} The maximum depth for nested structures. Must be an integer. **Default:** `0`.
  - `valueTypes` {Array<Function|NaN|undefined|null>}> Array of value types to include in the generated object. Valid types are `Boolean`, `Number`, `String`, `Date`, `RegExp`, `Uint8Array`, `Object`, `Array`, `Set`, `Map`, `NaN`, `undefined`, or `null`. **Default:** `[String]`.
  - `globalIndex` {boolean} Whether to include a global index in generated keys/values. **Default:** `true`.
  - `circular` {boolean} Whether to allow circular references in the generated object. **Default:** `false`.
  - `shuffle` {boolean} Whether to shuffle the order of elements or keys. **Default:** `false`.
  - `seed` {number} Seed for randomization when `shuffle` is enabled. If not provided, a random seed is generated. **Default:** Random value if `shuffle` is `true`, otherwise `0`.

#### Returns

- {Object|Array|Set|Map|Uint8Array} An object of the specified type with generated content based on the provided options.

### Examples

#### Generate a simple nested Object
 
```javascript
import { objectGenerator } from '@observ33r/object-generator';

const obj = objectGenerator({
  preffix: 'data',
  type: Object,
  size: 4,
  nestedSize: 4,
  depth: 1,
  valueTypes: [String, Number, Boolean, Object]
});

console.log(obj);
```
```console
{
  'data-string-4-0-0-0': 'data-value-4-0-0-0',
  'data-number-4-0-1-1': 1,
  'data-boolean-4-0-2-2': true,
  'data-object-4-0-3-3': {
    'data-string-4-1-4-0': 'data-value-4-1-4-0',
    'data-number-4-1-5-1': 1,
    'data-boolean-4-1-6-2': true,
    'data-string-4-1-7-3': 'data-value-4-1-7-3'
  }
}
```

#### Generate a repeatable shuffled Array with numbers


```javascript
import { objectGenerator } from '@observ33r/object-generator';

const arr = objectGenerator({
  type: Array,
  size: 16,
  valueTypes: [Number],
  shuffle: true,
  seed: 42
});

console.log(arr);
```
```console
[
  4,  1,  9,  3, 6,  0,
  7, 13, 15, 10, 2, 14,
  8, 11, 12,  5
]
```

#### Generate a repeatable shuffled and nested Set without a global index

```javascript
import { objectGenerator } from '@observ33r/object-generator';

const set = objectGenerator({
  type: Set,
  size: 2,
  nestedSize: 2,
  depth: 2,
  valueTypes: [Set],
  globalIndex: false,
  shuffle: true,
  seed: 42
});

console.log(set);
```
```console
Set(2) {
  Set(2) {
    Set(2) { 'value-2-2-1', 'value-2-2-0' },
    Set(2) { 'value-2-2-0', 'value-2-2-1' }
  },
  Set(2) {
    Set(2) { 'value-2-2-0', 'value-2-2-1' },
    Set(2) { 'value-2-2-1', 'value-2-2-0' }
  }
}
```

## Testing

Run the included tests with Jest:

`npm test`

## Contributing

Feel free to open issues or submit pull requests on [GitHub](https://github.com/observ33r/object-generator).

## License

This project is licensed under the [MIT License](LICENSE).