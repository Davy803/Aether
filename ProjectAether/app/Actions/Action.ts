/// <reference path="CreatureAction.ts" />
/// <reference path="MainPhase.ts" />
/// <reference path="PlayCreatureAction.ts" />
/// <reference path="../../main.ts" />

module ProjectAether {
    export interface Action {
        name: string;
        targetTypes: string[];
        getTargetAction: (Target) => string;
        performMulti(targets: Target[]): void;
        perform(target: Target): Action;
    }

    export interface KnockoutObservableAction extends KnockoutObservableAny { 
        (): Action;
        (value: Action): void;
        subscribe(callback: (newValue: Action) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Action, topic?: string);
    }
}