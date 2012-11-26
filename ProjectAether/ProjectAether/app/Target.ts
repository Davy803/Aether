/// <reference path="main.ts" />

module ProjectAether {
    
    export interface Target {
        isCurrentlyValidTarget: KnockoutObservableBool;
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
}