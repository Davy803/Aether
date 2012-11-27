
declare interface IHashTable {
    new (hashingFunctionParam?: (any) => string, equalityFunctionParamFunction?: (x: any, y: any) => bool);
    size(): number;
    put(key, value): void;
    get(key): any;
    containsKey(key): bool;
    containsValue(key): bool;
    remove(key): any;
    clear(): void;
    isEmpty(): bool;
    each(callback: (any) => void ): void;
    putAll(hashtable: IHashTable, conflictCallback: (key, thisValue, value) => any);
    clone(): any;
    keys: any[];
    values: any[];
    entries: any[][];
}

declare interface HashTableCtor {
    new (hashingFunctionParam?: (any) => string, equalityFunctionParamFunction?: (x: any, y: any) => bool) : IHashTable;
}

declare var HashTable: HashTableCtor;