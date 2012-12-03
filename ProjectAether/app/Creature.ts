/// <reference path="../main.ts" />

module ProjectAether {
    export class Creature implements Target, Selectable {
        targetAction = ko.observable(TargetActions.None);
        isSelected = ko.observable(false);
        name: KnockoutObservableString;
        damage: StatNumber;
        life: StatNumber;
        totalLife: StatNumber;
        movement: StatNumber;
        totalMovement: StatNumber;
        flying: StatBool;
        controller: KnockoutObservablePlayer = ko.observable();
        location: KnockoutObservableSpace = ko.observable();
        canAttack = ko.observable(true);
        canMove: KnockoutComputedBool;
        buffs: KnockoutObservableArrayBuff = ko.observableArray([]);
        nativeBuffs: Buff[];
        constructor (name: string, stats: Stats) {
            this.name = ko.observable(name);
            this.damage = new StatNumber("damage", stats.damage);
            this.movement = new StatNumber("movement", stats.movement);
            this.totalMovement = new StatNumber("totalMovement", stats.movement);
            this.life = new StatNumber("life", stats.life);
            this.totalLife = new StatNumber("totalLife", stats.life);
            this.flying = new StatBool("flying", stats.flying);
            this.canMove = ko.computed((): bool=> this.movement.current() > 0);
            this.nativeBuffs = stats.buffs || [];
        }
        enterPlay(controller: Player, location: Space) {
            this.controller(controller);
            this.location(location);
            this._applyAllBuffs();
        }
        beginTurn() {
            _.each(this._allBuffs(), (b: Buff) =>b.appliedThisTurn = false);
            this.canAttack(true);
            this.totalMovement.reset();
            this.totalLife.reset();
            this.damage.reset();
            this.movement.current(this.totalMovement.current());
            this.location().owner(this.controller());
            this._applyAllBuffs();
        }
        attack(targetCreature: Creature) {
            assert(this.canAttack());
            targetCreature.takeDamage(this.damage.current());
            this.canAttack(false);
        }
        takeDamage(amount: number) {
            this.life.subtract(amount);
            if (!this.isAlive()) {
                this._die();
            }
        }
        isAlive() {
            return this.life.current() > 0;
        }
        move(newSpace: Space, distance: number) {
            this.movement.subtract(distance);
            this.location().setValue(null);
            this.location(newSpace);
            newSpace.setValue(this);
        }

        private _allBuffs() : Buff[]{
            return _.union(this.nativeBuffs, this.buffs());
        }
        private _die() {
            this.location().setValue(null);
            this.location(null);
            this.controller().creaturesInPlay.remove(this);
            this.controller(null);
        }

        private _applyAllBuffs() {
            _.chain(this._allBuffs())
                .filter((b: Buff) => !b.appliedThisTurn)
                .each((b: Buff) =>b.apply(this));
        }
    }

    export interface Stats {
        damage: number;
        movement: number;
        life: number;
        flying?: bool;
        buffs?: Buff[];
    }
    export class Stat {
        current: KnockoutObservableAny;
        modified: KnockoutComputedBool;
        increased: KnockoutComputedBool;
        decreased: KnockoutComputedBool;
        constructor (public name: string, public initial: any) {
            this.current = ko.observable(initial);
            this.modified = ko.computed((): bool =>this.current() === this.initial);
        }
        
        reset() {
            this.current(this.initial);
        }
    }

    export class StatNumber extends Stat {
        current: KnockoutObservableNumber;
        constructor (public name: string, public initial: number) {
            super(name, initial);
            this.increased = ko.computed((): bool =>this.current() > this.initial);
            this.decreased = ko.computed((): bool =>this.current() < this.initial);
        }
        add(amount: number) {
            this.current(this.current() + amount);
        }
        subtract(amount: number) {
            this.current(this.current() - amount);
        }
        halve() {
            this.current(Math.round(this.current() / 2));
        }
    }

    export class StatBool extends Stat {
        current: KnockoutObservableBool;
        constructor (public name: string, public initial: bool) {
            super(name, initial);
            this.increased = ko.computed((): bool =>this.current() && !this.initial); //Went from false to true
            this.decreased = ko.computed((): bool =>!this.current() && this.initial); //Went from true to false
        }
        invert() {
            this.current(!this.current());
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