/// <reference path="main.ts" />

module ProjectAether {
    export class Player extends Helpers.HasCallbacks implements Target {
        isCurrentlyValidTarget = ko.observable(false);
        cardsInHand: KnockoutObservableArrayCard = ko.observableArray();
        graveyard: KnockoutObservableArrayCard = ko.observableArray();
        mana = ko.observable(0);
        constructor (public name: string, public deck?: Deck) {
            super();
        }

        init() {
            _.times(7, index => this._drawCard());
            this.mana(5);
        }

        payCost(cost: number){
            this.mana(this.mana() - cost);
        }

        beginTurn() {
            this._drawCard();
            this.mana(this.mana() + 5);
        }
        private _drawCard() {
            this.cardsInHand.push(this.deck.drawCard());

        }
    }


    export interface KnockoutObservablePlayer extends KnockoutObservableAny {
        (): Player;
        (value: Player): void;
        subscribe(callback: (newValue: Player) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Player, topic?: string);
    }


}