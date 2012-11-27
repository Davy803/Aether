/// <reference path="main.ts" />

module ProjectAether {
    export class CardBase {
        targetAction = ko.observable(TargetActions.None);
        isSelected = ko.observable(false);
        constructor (public name: string, public cost: number, public owner: Player) {

        }
        
    }

    export class CreatureCard extends CardBase implements Card {
        creature: Creature;
        owner: Player;

        constructor (name: string, cost: number, owner: Player, stats: Stats) {
            super(name, cost, owner);
            this.creature = new Creature(name, stats);
        }
    }

    export interface Card extends Target, Selectable{
        name: string;
        cost: number;
    }

    export interface KnockoutObservableCard extends KnockoutObservableAny {
        (): Card;
        (value: Card): void;
        subscribe(callback: (newValue: Card) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Card, topic?: string);
    }

    export interface KnockoutObservableArrayCard extends KnockoutObservableArray {
        (newValue: Card[]): void;
        (): Card[];
        subscribe: (callback: (newValue: Card[]) => void , target?: any, topic?: string) => KnockoutSubscription;
        indexOf(item: Card): number;
        replace(oldItem: Card, newItem: Card): void;
        slice(start: number, end?: number): Card[];
        splice(start: number): Card[];
        splice(start: number, deleteCount: number, ...items: any[]): Card[];  
        push(item: Card): void;
        pop(): Card;
        unshift(...items: Card[]): number;
        shift(): Card;
        reverse(): Card[];
        sort(): void;
        sort(func: (left: Card, right: Card) => number): void;

        remove(func: (item: Card) => bool): Card[];
        remove(item: Card): Card[];
        removeAll(items: Card[]): Card[];
        removeAll(): Card[];
        destroy(func: (item: Card) => bool): void;
        destroy(item: Card): void;
        destroyAll(): void;
        destroyAll(items: Card[]): void;
        valueHasMutated(): void;
        valueWillMutate(): void;
    }

    export interface KnockoutComputedArrayCard extends KnockoutComputed {
        (): Card[];
        (value: Card[]): void;
        subscribe(callback: (newValue: Card[]) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Card[], topic?: string);
    }
}