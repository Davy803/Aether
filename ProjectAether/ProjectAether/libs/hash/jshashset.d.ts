declare interface IHashSet {
    
    add(o): void;

    addAll(arr): void;

    values(): any[];

    remove(o): any;

    contains(o): bool;

    clear(): void;

    size(): number;

    isEmpty(): bool;

    clone(): IHashSet;

    intersection(hashSet: IHashSet): IHashSet;

    union(hashSet): IHashSet;

    isSubsetOf(hashSet): bool;
}

declare interface HashSetCtor {
    new (hashingFunctionParam?: (any) => string, equalityFunctionParamFunction?: (x: any, y: any) => bool) : IHashSet;
}

declare var HashSet: HashSetCtor;