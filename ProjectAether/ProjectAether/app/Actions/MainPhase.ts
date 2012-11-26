/// <reference path="../main.ts" />

module ProjectAether.Actions {
    export class MainPhase implements Action {
        targetTypes = [TargetTypes.Card, TargetTypes.Creature, TargetTypes.Button];
        constructor (private game: Game) {

        }
        targetValidator(target: Target) {
            if (target instanceof CardBase) {
                return this._canPlayCard(<Card>target);
            }
            if (target instanceof Space) {
                target = (<Space>target).value();
            }
            if (target instanceof Creature) {
                return this._canMoveCreature(<Creature>target);
            }
            if (target instanceof Button) {
                return target instanceof EndTurnButton;
            }
            throw new Helpers.NotImplementedError();
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
            throw new Helpers.NotImplementedError();
        }
        performMulti(spaces: Space[]) {
            throw Error("Cannot target multiple spaces");
        }

        private _canPlayCard(card: Card) {
            var player = this.game.currentPlayer();
            var action = this._getCardAction(card);
            return player.mana() >= card.cost && this.game.hasValidNonButtonTargets(action);
        }

        private _playCard(card: Card) {
            var action = this._getCardAction(card);
            card.isSelected(true);
            return action;
        }

        
        private _canMoveCreature(creature: Creature) {
            var player = this.game.currentPlayer();
            var action = new Actions.MoveCreatureAction(this.game.board, creature);
            return creature.controller() === player && this.game.hasValidNonButtonTargets(action);
        }

        private _moveCreature(creature: Creature) {
            var player = this.game.currentPlayer();
            var action = new Actions.MoveCreatureAction(this.game.board, creature);
            creature.isSelected(true);
            return action;
        }


        private _getCardAction(card: Card): Action {
            var player = this.game.currentPlayer();
            if (card instanceof CreatureCard) {
                return new Actions.PlayCreatureAction(player, <CreatureCard> card);
            }
            throw new Helpers.NotImplementedError();
        }

    }
}