/// <reference path="main.ts" />

module ProjectAether {
    export class Creature implements Target, Selectable {
        isCurrentlyValidTarget = ko.observable(false);
        isSelected = ko.observable(false);
        name: KnockoutObservableString;
        damage: Stat;
        life: Stat;
        movement: Stat;
        controller: KnockoutObservablePlayer = ko.observable();
        location: KnockoutObservableSpace = ko.observable();
        constructor (name: string, stats: Stats) {
            this.name = ko.observable(name);
            this.damage = new Stat("damage", stats.damage);
            this.movement = new Stat("movement", stats.movement);
            this.life = new Stat("life", stats.life);
        }
        enterPlay(controller: Player, location: Space) {
            this.controller(controller);
            this.location(location);
        }
    }

    export interface Stats {
        damage: number;
        movement: number;
        life: number;
    }

    export class Stat {
        current: KnockoutObservableNumber;
        constructor (public name: string, public initial: number) {
            this.current = ko.observable(initial);
        }
    }
    export interface KnockoutObservableCreature extends KnockoutObservableAny {
        (): Creature;
        (value: Creature): void;
        subscribe(callback: (newValue: Creature) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Creature, topic?: string);
    }

    export interface KnockoutObservableArrayCreature extends KnockoutObservableArray {
        (newValue: Creature[]): void;
        (): Creature[];
        subscribe: (callback: (newValue: Creature[]) => void , target?: any, topic?: string) => KnockoutSubscription;
        indexOf(item: Creature): number;
        replace(oldItem: Creature, newItem: Creature): void;
        slice(start: number, end?: number): Creature[];
        splice(start: number): Creature[];
        splice(start: number, deleteCount: number, ...items: any[]): Creature[];
        push(item: Creature): void;
        pop(): Creature;
        unshift(...items: Creature[]): number;
        shift(): Creature;
        reverse(): Creature[];
        sort(): void;
        sort(func: (left: Creature, right: Creature) => number): void;

        remove(func: (item: Creature) => bool): Creature[];
        remove(item: Creature): Creature[];
        removeAll(items: Creature[]): Creature[];
        removeAll(): Creature[];
        destroy(func: (item: Creature) => bool): void;
        destroy(item: Creature): void;
        destroyAll(): void;
        destroyAll(items: Creature[]): void;
        valueHasMutated(): void;
        valueWillMutate(): void;
    }

    export interface KnockoutComputedArrayCreature extends KnockoutComputed {
        (): Creature[];
        (value: Creature[]): void;
        subscribe(callback: (newValue: Creature[]) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Creature[], topic?: string);
    }
}