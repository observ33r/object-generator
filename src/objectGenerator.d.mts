/**
 * A global index used to track object generation across recursive calls.
 */
declare var globalIdx: number;

/**
 * Options for configuring the object generator.
 */
interface GeneratorOptions {
    /**
    * A prefix to prepend to generated keys/strings.
    * @default false
    */
    prefix?: string | number | false;

    /**
    * The type of object to generate.
    * @default Object
    */
    type?: typeof Object | typeof Array | typeof Set | typeof Map | typeof Uint8Array;

    /**
    * The size of the top-level object.
    * @default 16
    */
    size?: number;

    /**
    * The size of nested objects.
    * @default 16
    */
    nestedSize?: number;

    /**
    * The maximum depth for nested structures.
    * @default 0
    */
    depth?: number;

    /**
    * Array of value types to include in the generated object.
    * @default [String]
    */
    valueTypes?: Array<
        | typeof Boolean
        | typeof Number
        | typeof String
        | typeof Date
        | typeof RegExp
        | typeof Uint8Array
        | typeof Object
        | typeof Array
        | typeof Set
        | typeof Map
        | number // for NaN
        | undefined
        | null
    >;

    /**
    * Whether to include a global index in generated keys/values.
    * @default true
    */
    globalIndex?: boolean;

    /**
    * Whether to allow circular references in the generated object.
    * @default false
    */
    circular?: boolean;

    /**
    * Whether to shuffle the order of elements/keys.
    * @default false
    */
    shuffle?: boolean;

    /**
    * Seed for randomization when shuffle is enabled. If not provided, a random seed is generated.
    */
    seed?: number;
}

/**
 * High-performance, customizable dummy object generator for testing and benchmarking.
 *
 * @param options - Configuration options for the generator.
 * @returns An object of the specified type (Object, Array, Set, Map, or Uint8Array) with generated content.
 */
export declare function objectGenerator(options?: GeneratorOptions): 
    | Record<string, any>
    | any[]
    | Set<any>
    | Map<string, any>
    | Uint8Array;