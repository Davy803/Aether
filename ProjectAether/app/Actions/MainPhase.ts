/// <reference path="../main.ts" />

module ProjectAether.Actions {
    export class MainPhase implements Action {
        targetTypes = [TargetTypes.Card, TargetTypes.Creature, TargetTypes.Button];
        constructor (private game: Game) {

        }
        getTargetAction(target: Target) : string {
            if (target instanceof CardBase) {
                return this._canPlayCard(<Card>target)
                        ? TargetActions.Place
                        : TargetActions.None;
            }
            if (target instanceof Space) {
                target = (<Space>target).value();
            }
            if (target instanceof Creature) {
                return this._canMoveCreature(<Creature>target)
                        ? TargetActions.Select
                        : TargetActions.None;
            }
            if (target instanceof Button) {
                return target instanceof EndTurnButton
                        ? TargetActions.Button
                        : TargetActions.None;
            }
            throw new ProjectAether.NotImplementedError();
        }
        perform(target: Target) {
            if (target instanceof CardBase) {
                return this._playCard(<Card>target);
            }
            if (target instanceof Space) {
                target = (<Space>target).value();
            }
            if (target instanceof Creature) {
                return this._moveCreature(<Creature>target);
            }
            if (target instanceof EndTurnButton) {
                this.game.endTurn();
                return null;
            }
            throw new ProjectAether.NotImplementedError();
        }
        performMulti(spaces: Space[]) {
            throw Error("Cannot target multiple spaces");
        }

        private _canPlayCard(card: Card) {
            var player = this.game.currentPlayer();
            var action = this._getCardAction(card);
            return _.contains(player.cardsInHand(), card) 
                && player.mana() >= card.cost 
                && this.game.hasValidNonButtonTargets(action);
        }

        private _playCard(card: Card) {
            var action = this._getCardAction(card);
            card.isSelected(true);
            return action;
        }

        
        private _canMoveCreature(creature: Creature) {
            var player = this.game.currentPlayer();
            var action = new Actions.CreatureAction(this.game.board, creature);
            return creature.controller() === player && this.game.hasValidNonButtonTargets(action);
        }

        private _moveCreature(creature: Creature) {
            var player = this.game.currentPlayer();
            var action = new Actions.CreatureAction(this.game.board, creature);
            creature.isSelected(true);
            return action;
        }


        private _getCardAction(card: Card): Action {
            var player = this.game.currentPlayer();
            if (card instanceof CreatureCard) {
                return new Actions.PlayCreatureAction(player, <CreatureCard> card);
            }
            throw new ProjectAether.NotImplementedError();
        }

    }
}