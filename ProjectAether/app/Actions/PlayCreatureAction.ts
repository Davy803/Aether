/// <reference path="../../main.ts" />

module ProjectAether.Actions {
    export class PlayCreatureAction implements Action {
        name = "Play Creature Action";
        targetTypes = [TargetTypes.Space, TargetTypes.Button];
        constructor (private player: Player, private card: CreatureCard) {

        }
        getTargetAction(target: Target) : string {
            if (target instanceof Space) {
                var space = <Space> target;
                return space.isEmpty() && space.owner() === this.card.owner
                        ? TargetActions.Place
                        : TargetActions.None;
            }
            if (target instanceof CancelButton) {
                return TargetActions.Button;
            }
            return TargetActions.None;
        }
        canPerform(target?: Target) {
            var card = this.card;
            var player = this.player;
            return player.isHoldingCard(card) && player.canPayCost(card.cost);
        }
        perform(target: Target): Action {
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
            player.playCreature(card.creature, space)
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
            if (!player.isHoldingCard(card)
                && player.mana() >= card.cost) {
                throw Error("Cannot Play Card");
            }
            if (!space.isEmpty()) {
                throw Error("Cannot cast create on non-empty space");
            }
        }

    }
}