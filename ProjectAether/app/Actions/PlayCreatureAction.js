var ProjectAether;
(function (ProjectAether) {
    (function (Actions) {
        var PlayCreatureAction = (function () {
            function PlayCreatureAction(player, card) {
                this.player = player;
                this.card = card;
                this.name = "Play Creature Action";
                this.targetTypes = [
                    ProjectAether.TargetTypes.Space, 
                    ProjectAether.TargetTypes.Button
                ];
            }
            PlayCreatureAction.prototype.getTargetAction = function (target) {
                if(target instanceof ProjectAether.Space) {
                    var space = target;
                    return space.isEmpty() && space.owner() === this.card.owner ? ProjectAether.TargetActions.Place : ProjectAether.TargetActions.None;
                }
                if(target instanceof ProjectAether.CancelButton) {
                    return ProjectAether.TargetActions.Button;
                }
                return ProjectAether.TargetActions.None;
            };
            PlayCreatureAction.prototype.canPerform = function (target) {
                var card = this.card;
                var player = this.player;
                return player.isHoldingCard(card) && player.canPayCost(card.cost);
            };
            PlayCreatureAction.prototype.perform = function (target) {
                if(target instanceof ProjectAether.CancelButton) {
                    return null;
                }
                if(target instanceof ProjectAether.Space) {
                    var space = target;
                } else {
                    throw Error("Invalid target");
                }
                this._assertCanPlayCard(space);
                var card = this.card;
                var player = this.player;
                player.playCreature(card.creature, space);
                card.isSelected(false);
                player.cardsInHand.remove(card);
                player.payCost(card.cost);
                return null;
            };
            PlayCreatureAction.prototype.performMulti = function (spaces) {
                throw Error("Cannot target multiple spaces");
            };
            PlayCreatureAction.prototype._assertCanPlayCard = function (space) {
                var player = this.player;
                var card = this.card;
                if(!player.isHoldingCard(card) && player.mana() >= card.cost) {
                    throw Error("Cannot Play Card");
                }
                if(!space.isEmpty()) {
                    throw Error("Cannot cast create on non-empty space");
                }
            };
            return PlayCreatureAction;
        })();
        Actions.PlayCreatureAction = PlayCreatureAction;        
    })(ProjectAether.Actions || (ProjectAether.Actions = {}));
    var Actions = ProjectAether.Actions;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=PlayCreatureAction.js.map
