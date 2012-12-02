var ProjectAether;
(function (ProjectAether) {
    (function (Actions) {
        var MainPhase = (function () {
            function MainPhase(game) {
                this.game = game;
                this.name = "Main Phase";
                this.targetTypes = [
                    ProjectAether.TargetTypes.Card, 
                    ProjectAether.TargetTypes.Creature, 
                    ProjectAether.TargetTypes.Button
                ];
            }
            MainPhase.prototype.getTargetAction = function (target) {
                if(target instanceof ProjectAether.CardBase) {
                    return this._canPlayCard(target) ? ProjectAether.TargetActions.Place : ProjectAether.TargetActions.None;
                }
                if(target instanceof ProjectAether.Space) {
                    target = (target).value();
                }
                if(target instanceof ProjectAether.Creature) {
                    return this._canMoveCreature(target) ? ProjectAether.TargetActions.Select : ProjectAether.TargetActions.None;
                }
                if(target instanceof ProjectAether.Button) {
                    return target instanceof ProjectAether.EndTurnButton ? ProjectAether.TargetActions.Button : ProjectAether.TargetActions.None;
                }
                throw new ProjectAether.NotImplementedError();
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
                throw new ProjectAether.NotImplementedError();
            };
            MainPhase.prototype.performMulti = function (spaces) {
                throw Error("Cannot target multiple spaces");
            };
            MainPhase.prototype._canPlayCard = function (card) {
                var player = this.game.currentPlayer();
                var action = this._getCardAction(card);
                return player.isHoldingCard(card) && player.canPayCost(card.cost) && this.game.hasValidNonButtonTargets(action);
            };
            MainPhase.prototype._playCard = function (card) {
                var action = this._getCardAction(card);
                card.isSelected(true);
                return action;
            };
            MainPhase.prototype._canMoveCreature = function (creature) {
                var player = this.game.currentPlayer();
                var action = new ProjectAether.Actions.CreatureAction(this.game.board, creature);
                return creature.controller() === player && this.game.hasValidNonButtonTargets(action);
            };
            MainPhase.prototype._moveCreature = function (creature) {
                var player = this.game.currentPlayer();
                var action = new ProjectAether.Actions.CreatureAction(this.game.board, creature);
                creature.isSelected(true);
                return action;
            };
            MainPhase.prototype._getCardAction = function (card) {
                var player = this.game.currentPlayer();
                if(card instanceof ProjectAether.CreatureCard) {
                    return new ProjectAether.Actions.PlayCreatureAction(player, card);
                }
                throw new ProjectAether.NotImplementedError();
            };
            return MainPhase;
        })();
        Actions.MainPhase = MainPhase;        
    })(ProjectAether.Actions || (ProjectAether.Actions = {}));
    var Actions = ProjectAether.Actions;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=MainPhase.js.map
