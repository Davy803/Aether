var ProjectAether;
(function (ProjectAether) {
    (function (Actions) {
        var MoveCreatureAction = (function () {
            function MoveCreatureAction(board, creature) {
                this.board = board;
                this.creature = creature;
                this.targetTypes = [
                    ProjectAether.TargetTypes.Space, 
                    ProjectAether.TargetTypes.Button
                ];
            }
            MoveCreatureAction.prototype.targetValidator = function (target) {
                if(target instanceof ProjectAether.Space) {
                    var space = target;
                    return space !== this.creature.location() && this.board.findEmptySquaresWithinXSteps(this.creature.location(), this.creature.movement.current()).contains(space);
                }
                if(target instanceof ProjectAether.Button) {
                    return target instanceof ProjectAether.CancelButton;
                }
                throw new Helpers.NotImplementedError();
            };
            MoveCreatureAction.prototype.perform = function (target) {
                if(target instanceof ProjectAether.CancelButton) {
                    return null;
                }
                if(target instanceof ProjectAether.Space) {
                    var newSpace = target;
                } else {
                    throw Error("Invalid target");
                }
                var creature = this.creature;
                var oldSpace = creature.location();
                creature.movement.current(creature.movement.current() - this.board.getDistance(creature, newSpace));
                creature.location(newSpace);
                oldSpace.setValue(null);
                newSpace.setValue(this.creature);
                this.creature.isSelected(false);
                return null;
            };
            MoveCreatureAction.prototype.performMulti = function (spaces) {
                throw Error("Cannot target multiple spaces");
            };
            return MoveCreatureAction;
        })();
        Actions.MoveCreatureAction = MoveCreatureAction;        
    })(ProjectAether.Actions || (ProjectAether.Actions = {}));
    var Actions = ProjectAether.Actions;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=MoveCreatureAction.js.map
