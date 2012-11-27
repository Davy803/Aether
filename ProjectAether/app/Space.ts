/// <reference path="../libs/knockout.d.ts" />
/// <reference path="../libs/underscore.d.ts" />
/// <reference path="main.ts" />

module ProjectAether {
    export class Space implements Target, Selectable{
        private _targetAction = ko.observable(TargetActions.None);
        targetAction: KnockoutComputedString;
        //targetAction = ko.observable(TargetActions.None);
        isSelected: KnockoutComputedBool ;
        private _value: KnockoutObservableAny = ko.observable(null);
        value: KnockoutComputed;
        owner: KnockoutObservablePlayer = ko.observable();
        constructor (public y: number, public x: number, owner: Player) {
            this.value = ko.computed(() =>this._value());
            this.owner(owner);
            this.targetAction = ko.computed({
                read: () => this._targetAction() || this._value() && this._value().targetAction(),
                write: (newValue) => this._targetAction(newValue)
            });
            this.isSelected = ko.computed((): bool => this._value() && this._value().isSelected());
        }
        //Calculated "z" coordinate for easy distance calculation.  See http://keekerdc.com/2011/03/hexagon-grids-coordinate-systems-and-distance-calculations/
        z() {
            return -(this.x + this.y);
        }
        setValue(value: Creature) {
            if (value !== null && this._value() !== null) {
                throw Error("Value Already Set");
            }
            this._value(value);
        }
        isEmpty() {
            return this._value() == null;
        }
    }

    export interface  KnockoutObservableSpace extends KnockoutObservableAny {
        (): Space;
        (value: Space): void;
        subscribe(callback: (newValue: Space) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Space, topic?: string);
    }
    export interface KnockoutComputedArraySpace extends KnockoutComputed {
        (): Space[];
        (value: Space[]): void;
        subscribe(callback: (newValue: Space[]) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Space[], topic?: string);
    }

    export interface KnockoutObservableArraySpace extends KnockoutObservableArray {
        (newValue: Space[]): void;
        (): Space[];
        subscribe: (callback: (newValue: Space[]) => void , target?: any, topic?: string) => KnockoutSubscription;
        indexOf(item: Space): number;
        replace(oldItem: Space, newItem: Space): void;
        slice(start: number, end?: number): Space[];
        splice(start: number): Space[];
        splice(start: number, deleteCount: number, ...items: any[]): Space[];
        push(item: Space): void;
        pop(): Space;
        unshift(...items: Space[]): number;
        shift(): Space;
        reverse(): Space[];
        sort(): void;
        sort(func: (left: Space, right: Space) => number): void;

        remove(func: (item: Space) => bool): Space[];
        remove(item: Space): Space[];
        removeAll(items: Space[]): Space[];
        removeAll(): Space[];
        destroy(func: (item: Space) => bool): void;
        destroy(item: Space): void;
        destroyAll(): void;
        destroyAll(items: Space[]): void;
        valueHasMutated(): void;
        valueWillMutate(): void;
    }
}