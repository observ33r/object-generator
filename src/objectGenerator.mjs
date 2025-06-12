var globalIdx = 0;

const nestedTypes = [Object, Array, Set, Map];
const objectTypes = [...nestedTypes, Uint8Array];
const valueTypes = [Boolean, Number, String, Date, RegExp, Uint8Array, NaN, undefined, null];

const seedMul = 1664525, seedInc = 1013904223, seedDiv = 4294967296;

export function objectGenerator(options) {
    if (options == null || typeof options !== 'object') 
        options = {};
    const prefix = (typeof options.prefix === 'string' && options.prefix.length > 0 
        || typeof options.prefix === 'number') ? options.prefix : false;
    const objectType = objectTypes.includes(options.type) 
        ? options.type : Object;
    const size = Math.max(0, Number.isInteger(options.size) 
        ? options.size : 16);
    const nestedSize = Math.max(1, Number.isInteger(options.nestedSize) 
        ? options.nestedSize : 16);
    const depth = Math.max(0, Number.isInteger(options.depth) 
        ? options.depth : 0);
    const allTypes = Array.isArray(options.valueTypes) 
        ? options.valueTypes : [String];
    const validValueTypes = allTypes.filter(type => 
        valueTypes.includes(type));
    const validNestedTypes = allTypes.filter(type => 
        nestedTypes.includes(type));
    const globalIndex = (options.globalIndex !== false);
    const circular = (options.circular === true);
    const shuffle = (options.shuffle === true);
    let seed = (shuffle) 
        ? (!Number.isInteger(options.seed)) 
            ? Math.floor(Math.random() * seedDiv)
            : options.seed
        : 0;
    const level = Number.isInteger(options.level) 
        ? options.level : 0;
    if (level === 0)
        globalIdx = -1;
    if (validNestedTypes.length === 0 && level < depth) 
        validNestedTypes.push(Object);
    const objectSize = (level > 0) 
        ? nestedSize : size;
    const types = (level < depth || circular)
        ? validValueTypes.slice(0, Math.max(0, objectSize - validNestedTypes.length)).concat(validNestedTypes)
        : (validValueTypes.length > 0) 
            ? validValueTypes : [String];
    const typesSize = types.length;
    const typesSizeDiv = (circular) 
        ? Math.max(2, (typesSize % 2 === 1) ? typesSize - 2 : typesSize - 1) : 0;
    const operand = (objectType === Uint8Array)
        ? new Uint8Array(objectSize) 
        : new objectType();
    const usedIndices = (shuffle) 
        ? new Set() : null;
    let idx, key, value, typeName;
    for (let objectIdx = 0; objectIdx < objectSize; objectIdx++) {
        if (shuffle) {
            do {
                seed = (seedMul * seed + seedInc) % seedDiv;
                idx = Math.floor((seed / seedDiv) * objectSize);
            } while (usedIndices.has(idx))
            usedIndices.add(idx);
        } else 
            idx = objectIdx;
        if (objectType === Uint8Array) {
            operand[objectIdx] = idx % 256;
            continue;
        }
        globalIdx++;
        const suffix = (depth > 0)
            ? (globalIndex)
                ? `${size}-${level}-${globalIdx}-${idx}` 
                : `${size}-${level}-${idx}` 
            : `${size}-${idx}`;
        const type = types[idx % typesSize];
        if (
            circular 
            && (level === depth - 1 || globalIdx % typesSizeDiv === 0) 
            && validNestedTypes.includes(type)
        ) {
            typeName = type.name.toLowerCase();
            switch (objectType) {
                case Object: 
                    key = (prefix !== false)
                        ? `${prefix}-${typeName}-${suffix}`
                        : `${typeName}-${suffix}`;
                    operand[key] = operand; 
                    break;
                case Array: 
                    operand.push(operand); 
                    break;
                case Map: 
                    key = (prefix !== false)
                        ? `${prefix}-${typeName}-${suffix}`
                        : `${typeName}-${suffix}`;
                    operand.set(key, operand); 
                    break;
                case Set: 
                    operand.add(operand); 
                    break;
            }
            continue;
        }
        switch (type) {
            case Boolean:
                typeName = 'boolean';
                value = idx % 2 === 0;
                break;
            case Number:
                typeName = 'number';
                value = idx;
                break;
            case String:
                typeName = 'string';
                value = (prefix !== false)
                    ? `${prefix}-value-${suffix}`
                    : `value-${suffix}`;
                break;
            case Date: 
                typeName = 'date'; 
                value = (globalIndex)
                    ? new Date(2025, globalIdx, idx)
                    : new Date(2025, idx); 
                break;
            case RegExp:
                typeName = 'regexp';
                const pattern = (prefix !== false)
                    ? `${prefix}-pattern-${suffix}`
                    : `pattern-${suffix}`;
                value = new RegExp(pattern, 'g');
                break;
            case undefined: 
                typeName = 'undefined'; 
                value = undefined; 
                break;
            case null: 
                typeName = 'null'; 
                value = null; 
                break;
            case Uint8Array:
            case Object:
            case Array:
            case Map:
            case Set:
                typeName = type.name.toLowerCase();
                value = objectGenerator({ ...options, type, level: level + 1, seed });
                break;
            default:
                if (type !== type) { 
                    typeName = 'nan'; 
                    value = NaN;
                }
                break;
        }
        switch (objectType) {
            case Object: 
                key = (prefix !== false)
                    ? `${prefix}-${typeName}-${suffix}`
                    : `${typeName}-${suffix}`;
                operand[key] = value; 
                break;
            case Array: 
                operand.push(value); 
                break;
            case Map: 
                key = (prefix !== false)
                    ? `${prefix}-${typeName}-${suffix}`
                    : `${typeName}-${suffix}`;
                operand.set(key, value); 
                break;
            case Set: 
                operand.add(value); 
                break;
        }
    }
    return operand;
}