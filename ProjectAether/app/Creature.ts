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
        canAttack = ko.observable(true);
        canMove: KnockoutComputedBool;
        constructor (name: string, stats: Stats) {
            this.name = ko.observable(name);
            this.damage = new Stat("damage", stats.damage);
            this.movement = new Stat("movement", stats.movement);
            this.life = new Stat("life", stats.life);
            this.canMove = ko.computed((): bool=> this.movement.current() > 0);
        }
        enterPlay(controller: Player, location: Space) {
            this.controller(controller);
            this.location(location);
        }
        beginTurn(){
            this.canAttack(true);
            this.movement.reset();
            this.location().owner(this.controller());
        }
        attack(targetCreature: Creature){
            assert(this.canAttack());
            targetCreature.takeDamage(this.damage.current());
            this.canAttack(false);
        }
        takeDamage(amount: number){
            this.life.subtract(amount);
            if (!this.isAlive()) {
                this._die();
            }
        }
        isAlive(){
            return this.life.current() > 0;
        }
        move(newSpace: Space, distance: number) {
            this.movement.subtract(distance);
            this.location().setValue(null);
            this.location(newSpace);
            newSpace.setValue(this);
        }
        private _die() {
            this.location().setValue(null);
            this.location(null);
            this.controller().creaturesInPlay.remove(this);
            this.controller(null);
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
        add(amount: number){
            this.current(this.current() + amount);
        }
        subtract(amount: number){
            this.current(this.current() - amount);
        }
        reset(){
            this.current(this.initial);
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