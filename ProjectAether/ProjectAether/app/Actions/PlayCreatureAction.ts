/// <reference path="../main.ts" />

module ProjectAether.Actions {
    export class PlayCreatureAction implements Action {
        targetTypes = [TargetTypes.Space, TargetTypes.Button];
        constructor (private player: Player, private card: CreatureCard) {

        }
        targetValidator(target: Target) {
            if (target instanceof Space) {
                var space = <Space> target;
                return space.isEmpty() && space.owner() == this.card.owner;
            }
            if (target instanceof CancelButton) {
                return true;
            }
            return false;
        }
        perform(target: Target) : Action {
            if (target instanceof CancelButton) {
                return null;
            }
            if (target instanceof Space) {
                var space = <Space> target;
            } else {
                throw Error("Invalid target");
            }
            

            this._assertCanPlayCard(space);
            
            var card = this.card;
            var player = this.player;
            space.setValue(card.creature);
            card.creature.enterPlay(player, space);
            card.isSelected(false);
            player.cardsInHand.remove(card);
            player.payCost(card.cost);
            return null;
        }
        performMulti(spaces: Space[]) {
            throw Error("Cannot target multiple spaces");
        }
        
        private _assertCanPlayCard(space: Space): void {
            var player = this.player;
            var card = this.card;
            if(! _.contains(player.cardsInHand(), card)
                && player.mana() >= card.cost){
                throw Error("Cannot Play Card");
            }
            if (!space.isEmpty()) {
                throw Error("Cannot cast create on non-empty space");
            }
        }

    }
}