/// <reference path="../main.ts" />

module ProjectAether {
    export class Player extends ProjectAether.HasCallbacks implements Target {
        targetAction = ko.observable(TargetActions.None);
        cardsInHand: KnockoutObservableArrayCard = ko.observableArray();
        graveyard: KnockoutObservableArrayCard = ko.observableArray();
        creaturesInPlay: KnockoutObservableArrayCreature = ko.observableArray();
        mana = ko.observable(0);
        constructor (public name: string, public deck?: Deck) {
            super();
        }

        init() {
            _.times(7, index => this._drawCard());
        }
        canPayCost(cost: number) {
            return this.mana() >= cost;
        } 
        payCost(cost: number) {
            this.mana(this.mana() - cost);
        }
        playCreature(creature: Creature, space: Space) {
            this.creaturesInPlay.push(creature);
            space.setValue(creature);
            creature.enterPlay(this, space);
        }
        beginTurn() {
            this._drawCard();
            this.mana(this.mana() + 5);
            _.each(this.creaturesInPlay(), (creature: Creature) => creature.beginTurn());
        }

        isHoldingCard(card: Card) {
            return _.contains(this.cardsInHand(), card);
        }
        _drawCard() {
            var card = this.deck.drawCard()
            if (card !== undefined) {
                this.cardsInHand.push(card);
            }
        }
    }


    export interface KnockoutObservablePlayer extends KnockoutObservableAny {
        (): Player;
        (value: Player): void;
        subscribe(callback: (newValue: Player) => void , target?: any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: Player, topic?: string);
    }


}