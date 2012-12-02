/// <reference path="Slow.ts" />
/// <reference path="../../main.ts" />

module ProjectAether {
    export class Buff {
        apply(creature: Creature){
            throw Error("Method is abstract");
        } 
    }
    
    export interface KnockoutObservableArrayBuff extends KnockoutObservableArray {
        (newValue: Buff[]): void;
        (): Buff[];
        subscribe: (callback: (newValue: Buff[]) => void , target?: any, topic?: string) => KnockoutSubscription;
        indexOf(item: Buff): number;
        replace(oldItem: Buff, newItem: Buff): void;
        slice(start: number, end?: number): Buff[];
        splice(start: number): Buff[];
        splice(start: number, deleteCount: number, ...items: any[]): Buff[];
        push(item: Buff): void;
        pop(): Buff;
        unshift(...items: Buff[]): number;
        shift(): Buff;
        reverse(): Buff[];
        sort(): void;
        sort(func: (left: Buff, right: Buff) => number): void;

        remove(func: (item: Buff) => bool): Buff[];
        remove(item: Buff): Buff[];
        removeAll(items: Buff[]): Buff[];
        removeAll(): Buff[];
        destroy(func: (item: Buff) => bool): void;
        destroy(item: Buff): void;
        destroyAll(): void;
        destroyAll(items: Buff[]): void;
        valueHasMutated(): void;
        valueWillMutate(): void;
    }

}