var ProjectAether;
(function (ProjectAether) {
    (function (Actions) {
        var MainPhase = (function () {
            function MainPhase(game) {
                this.game = game;
                this.targetTypes = [
                    ProjectAether.TargetTypes.Card, 
                    ProjectAether.TargetTypes.Creature, 
                    ProjectAether.TargetTypes.Button
                ];
            }
            MainPhase.prototype.targetValidator = function (target) {
                if(target instanceof ProjectAether.CardBase) {
                    return this._canPlayCard(target);
                }
                if(target instanceof ProjectAether.Space) {
                    target = (target).value();
                }
                if(target instanceof ProjectAether.Creature) {
                    return this._canMoveCreature(target);
                }
                if(target instanceof ProjectAether.Button) {
                    return target instanceof ProjectAether.EndTurnButton;
                }
                throw new Helpers.NotImplementedError();
            };
            MainPhase.prototype.perform = function (target) {
                if(target instanceof ProjectAether.CardBase) {
                    return this._playCard(target);
                }
                if(target instanceof ProjectAether.Space) {
                    target = (target).value();
                }
                if(target instanceof ProjectAether.Creature) {
                    return this._moveCreature(target);
                }
                if(target instanceof ProjectAether.EndTurnButton) {
                    this.game.endTurn();
                    return null;
                }
                throw new Helpers.NotImplementedError();
            };
            MainPhase.prototype.performMulti = function (spaces) {
                throw Error("Cannot target multiple spaces");
            };
            MainPhase.prototype._canPlayCard = function (card) {
                var player = this.game.currentPlayer();
                var action = this._getCardAction(card);
                return player.mana() >= card.cost && this.game.hasValidNonButtonTargets(action);
            };
            MainPhase.prototype._playCard = function (card) {
                var action = this._getCardAction(card);
                card.isSelected(true);
                return action;
            };
            MainPhase.prototype._canMoveCreature = function (creature) {
                var player = this.game.currentPlayer();
                var action = new ProjectAether.Actions.MoveCreatureAction(this.game.board, creature);
                return creature.controller() === player && this.game.hasValidNonButtonTargets(action);
            };
            MainPhase.prototype._moveCreature = function (creature) {
                var player = this.game.currentPlayer();
                var action = new ProjectAether.Actions.MoveCreatureAction(this.game.board, creature);
                creature.isSelected(true);
                return action;
            };
            MainPhase.prototype._getCardAction = function (card) {
                var player = this.game.currentPlayer();
                if(card instanceof ProjectAether.CreatureCard) {
                    return new ProjectAether.Actions.PlayCreatureAction(player, card);
                }
                throw new Helpers.NotImplementedError();
            };
            return MainPhase;
        })();
        Actions.MainPhase = MainPhase;        
    })(ProjectAether.Actions || (ProjectAether.Actions = {}));
    var Actions = ProjectAether.Actions;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=MainPhase.js.map
