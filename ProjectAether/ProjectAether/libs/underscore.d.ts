// Type definitions for Underscore 1.4.1
// Project: http://underscorejs.org/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface UnderscoreWrappedBool extends UnderscoreWrappedObject {
    value () : bool;
}

interface UnderscoreWrappedNumber extends UnderscoreWrappedObject {
    value () : number;
}

interface UnderscoreWrappedArray extends UnderscoreWrappedObject {
    value () : any[];
}

interface UnderscoreWrappedObject {
    value () : any;

    /****
     Collections
    *****/
    each(iterator: ListIterator, context?: any): UnderscoreWrappedArray;
    each(iterator: ObjectIterator, context?: any): UnderscoreWrappedArray;
    forEach(iterator: ListIterator, context?: any): UnderscoreWrappedArray;
    forEach(iterator: ObjectIterator, context?: any): UnderscoreWrappedArray;
    
    map(iterator: ListIterator, context?: any): UnderscoreWrappedArray;
    map(iterator: ObjectIterator, context?: any): UnderscoreWrappedArray;
    collect(iterator: ListIterator, context?: any): UnderscoreWrappedArray;
    collect(iterator: ObjectIterator, context?: any): UnderscoreWrappedArray;

    reduce(iterator: any, memo: any, context?: any): UnderscoreWrappedArray;
    inject(iterator: any, memo: any, context?: any): UnderscoreWrappedArray;
    foldl(iterator: any, memo: any, context?: any): UnderscoreWrappedArray;

    reduceRight(iterator: any, memo: any, context?: any): UnderscoreWrappedArray;
    foldr(iterator: any, memo: any, context?: any): UnderscoreWrappedArray;

    find(iterator: any, context?: any): UnderscoreWrappedObject;
    detect(iterator: any, context?: any): UnderscoreWrappedObject;

    filter(iterator: any, context?: any): UnderscoreWrappedArray;
    select(iterator: any, context?: any): UnderscoreWrappedArray;

    where(properties: any): UnderscoreWrappedArray;

    reject(iterator: any, context?: any): UnderscoreWrappedArray;

    all(iterator: any, context?: any): UnderscoreWrappedBool;
    every(iterator: any, context?: any): UnderscoreWrappedBool;

    any(iterator?: any, context?: any): UnderscoreWrappedBool;
    some(iterator?: any, context?: any): UnderscoreWrappedBool;

    contains(value: any): UnderscoreWrappedBool;
    include(value: any): UnderscoreWrappedBool;

    invoke(methodName: string, arguments: any[]): UnderscoreWrappedObject;
    invoke(methodName: string, ...arguments: any[]): UnderscoreWrappedObject;

    pluck(propertyName: string): UnderscoreWrappedArray;
    max(iterator?: any, context?: any): UnderscoreWrappedObject;
    min(iterator?: any, context?: any): UnderscoreWrappedObject;
    sortBy(iterator?: any, context?: any): UnderscoreWrappedObject;
    groupBy(iterator: any): UnderscoreWrappedObject;
    countBy(iterator: any): UnderscoreWrappedObject;
    shuffle(): UnderscoreWrappedArray;
    toArray(): UnderscoreWrappedArray;
    size(): UnderscoreWrappedNumber;

    /****
     Arrays
    *****/
    first(n?: number): UnderscoreWrappedObject;
    head(n?: number): UnderscoreWrappedObject;
    take(n?: number): UnderscoreWrappedObject;

    initial(n?: number): UnderscoreWrappedArray;

    last(n?: number): UnderscoreWrappedObject;

    rest(n?: number): UnderscoreWrappedArray;
    tail(n?: number): UnderscoreWrappedArray;
    drop(n?: number): UnderscoreWrappedArray;

    compact(): UnderscoreWrappedArray;
    flatten(shallow?: bool): UnderscoreWrappedArray;
    without(...values: any[]): UnderscoreWrappedArray;
    union(...arrays: any[][]): UnderscoreWrappedArray;
    intersection(...arrays: any[][]): UnderscoreWrappedArray;
    difference(...others: any[][]): UnderscoreWrappedArray;

    uniq(isSorted?: bool, iterator?: any): UnderscoreWrappedArray;
    unique(isSorted?: bool, iterator?: any): UnderscoreWrappedArray;

    zip(...arrays: any[]): UnderscoreWrappedArray;
    object(values: any[]): UnderscoreWrappedObject;
    indexOf(value: any, isSorted?: bool): UnderscoreWrappedNumber;
    lastIndexOf(value: any, fromIndex?: number): UnderscoreWrappedNumber;
    sortedIndex(valueL: any, iterator?: any): UnderscoreWrappedNumber;
}

interface TemplateSettings {
    evaluate?: RegExp;
    interpolate?: RegExp;
    escape?: RegExp;
}

interface ListIterator {
    (value, index: number, list?): void;
}

interface ObjectIterator {
    (element, key: string, list?): void;
}

interface UnderscoreStatic {

    /****
     Collections
    *****/
    each(list: any[], iterator: ListIterator, context?: any): any[];
    each(object: any, iterator: ObjectIterator, context?: any): any[];
    forEach(list: any[], iterator: ObjectIterator, context?: any): any[];
    forEach(object: any, iterator: ListIterator, context?: any): any[];

    map(list: any[], iterator: ListIterator, context?: any): any[];
    map(object: any, iterator: ObjectIterator, context?: any): any[];
    collect(list: any[], iterator: ListIterator, context?: any): any[];
    collect(object: any, iterator: ObjectIterator, context?: any): any[];

    reduce(list: any[], iterator: any, memo: any, context?: any): any[];
    inject(list: any[], iterator: any, memo: any, context?: any): any[];
    foldl(list: any[], iterator: any, memo: any, context?: any): any[];

    reduceRight(list: any[], iterator: any, memo: any, context?: any): any[];
    foldr(list: any[], iterator: any, memo: any, context?: any): any[];

    find(list: any[], iterator: any, context?: any): any;
    detect(list: any[], iterator: any, context?: any): any;

    filter(list: any[], iterator: any, context?: any): any[];
    select(list: any[], iterator: any, context?: any): any[];

    where(list: any[], properties: any): any[];

    reject(list: any[], iterator: any, context?: any): any[];

    all(list: any[], iterator: any, context?: any): bool;
    every(list: any[], iterator: any, context?: any): bool;

    any(list: any[], iterator?: any, context?: any): bool;
    some(list: any[], iterator?: any, context?: any): bool;

    contains(list: any, value: any): bool;
    contains(list: any[], value: any): bool;
    include(list: any, value: any): bool;
    include(list: any[], value: any): bool;

    invoke(list: any[], methodName: string, arguments: any[]): any;
    invoke(object: any, methodName: string, ...arguments: any[]): any;

    pluck(list: any[], propertyName: string): string[];
    max(list: any[], iterator?: any, context?: any): any;
    min(list: any[], iterator?: any, context?: any): any;
    sortBy(list: any[], iterator?: any, context?: any): any;
    groupBy(list: any[], iterator: any): any;
    countBy(list: any[], iterator: any): any;
    shuffle(list: any[]): any[];
    toArray(list: any): any[];
    size(list: any): number;

    /****
     Arrays
    *****/
    first(array: any[], n?: number): any;
    head(array: any[], n?: number): any;
    take(array: any[], n?: number): any;

    initial(array: any[], n?: number): any[];

    last(array: any[], n?: number): any;

    rest(array: any[], n?: number): any[];
    tail(array: any[], n?: number): any[];
    drop(array: any[], n?: number): any[];

    compact(array: any[]): any[];
    flatten(array: any[], shallow?: bool): any[];
    without(array: any[], ...values: any[]): any[];
    union(...arrays: any[][]): any[];
    intersection(...arrays: any[][]): any[];
    difference(array: any[], ...others: any[][]): any[];

    uniq(array: any[], isSorted?: bool, iterator?: any): any[];
    unique(array: any[], isSorted?: bool, iterator?: any): any[];

    zip(...arrays: any[]): any[];
    object(list: any[], values: any[]): any;
    indexOf(array: any[], value: any, isSorted?: bool): number;
    lastIndexOf(array: any[], value: any, fromIndex?: number): number;
    sortedIndex(list: any[], valueL: any, iterator?: any): number;
    range(stop: number): any[];
    range(start: number, stop: number, step?: number): any[];

    /****
     Functions
    *****/
    bind(func: (...as : any[]) => any, context: any, ...arguments: any[]): () => any;
    bindAll(object: any, ...methodNames: string[]): any;
    memoize(func: any, hashFunction?: any): any;
    defer(func: () => any);
    delay(func: any, wait: number, ...arguments: any[]): any;
    delay(func: any, ...arguments: any[]): any;
    throttle(func: any, wait: number): any;
    debounce(func: any, wait: number, immediate?: bool): any;
    once(func: any): any;
    after(count: number, func: any): any;
    wrap(func: (...as : any[]) => any, wrapper: any): () => any;
    compose(...functions: any[]): any;

    /****
     Objects
    *****/
    keys(object: any): any[];
    values(object: any): any[];
    pairs(object: any): any[];
    invert(object: any): any;

    functions(object: any): string[];
    methods(object: any): string[];

    extend(destination: any, ...sources: any[]): any;
    pick(object: any, ...keys: string[]): any;
    omit(object: any, ...keys: string[]): any;
    defaults(object: any, ...defaults: any[]): any;
    clone(object: any): any;
    tap(object: any, interceptor: (...as : any[]) => any): any;
    has(object: any, key: string): bool;
    isEqual(object: any, other: any): bool;
    isEmpty(object: any): bool;
    isElement(object: any): bool;
    isArray(object: any): bool;
    isObject(value: any): bool;
    isArguments(object: any): bool;
    isFunction(object: any): bool;
    isString(object: any): bool;
    isNumber(object: any): bool;
    isFinite(object: any): bool;
    isBoolean(object: any): bool;
    isDate(object: any): bool;
    isRegExp(object: any): bool;
    isNaN(object: any): bool;
    isNull(object: any): bool;
    isUndefined(value: any): bool;

    /****
     Utility
    *****/
    noConflict(): any;
    identity(value: any): any;
    times(n: number, iterator: (index : number) => void, context?: any): void;
    random(min: number, max: number): number;
    mixin(object: any): void;
    uniqueId(prefix: string): string;
    uniqueId(): number;
    escape(str: string): string;
    result(object: any, property: string): any;
    templateSettings: TemplateSettings;
    template(templateString: string, data?: any, settings?: any): (...data: any[]) => string;

    /****
     Chaining
    *****/
    chain(object: any): UnderscoreWrappedObject;
    chain(object: any[]): UnderscoreWrappedArray;
}

declare var _: UnderscoreStatic;