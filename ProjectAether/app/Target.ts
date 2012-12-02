/// <reference path="../main.ts" />

module ProjectAether {
    
    export interface Target {
        targetAction: KnockoutObservableString;
    }
    export interface Selectable {
        isSelected: KnockoutObservableBool;
    }
    export var TargetTypes = {
        Card: "Card",
        Creature: "Creature",
        Player: "Player",
        Space: "Space",
        Button: "EndTurnButton"
    }
    
    export var TargetActions = {
        None: "",
        Move: "target move",
        Attack: "target attack",
        Button: "target button",
        Place: "target place",
        Select: "target select",
    }
}