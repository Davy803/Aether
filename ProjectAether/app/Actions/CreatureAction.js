var ProjectAether;
(function (ProjectAether) {
    (function (Actions) {
        var CreatureAction = (function () {
            function CreatureAction(board, creature) {
                this.board = board;
                this.creature = creature;
                this.targetTypes = [
                    ProjectAether.TargetTypes.Space, 
                    ProjectAether.TargetTypes.Button, 
                    ProjectAether.TargetTypes.Creature
                ];
            }
            CreatureAction.prototype.getTargetAction = function (target) {
                if(target instanceof ProjectAether.Space) {
                    var space = target;
                    return this.board.findEmptySquaresWithinXSteps(this.creature.location(), this.creature.movement.current()).contains(space) ? ProjectAether.TargetActions.Move : ProjectAether.TargetActions.None;
                }
                if(target instanceof ProjectAether.Creature) {
                    return this._canAttack(target) ? ProjectAether.TargetActions.Attack : ProjectAether.TargetActions.None;
                }
                if(target instanceof ProjectAether.Button) {
                    return target instanceof ProjectAether.CancelButton ? ProjectAether.TargetActions.Button : ProjectAether.TargetActions.None;
                }
                throw new ProjectAether.NotImplementedError();
            };
            CreatureAction.prototype.perform = function (target) {
                if(target instanceof ProjectAether.CancelButton) {
                    return null;
                }
                if(target instanceof ProjectAether.Space) {
                    var newSpace = target;
                    this.creature.move(newSpace, this.board.getDistance(this.creature, newSpace));
                    this.creature.isSelected(false);
                    return null;
                } else {
                    if(target instanceof ProjectAether.Creature) {
                        var targetCreature = target;
                        this.creature.attack(targetCreature);
                    } else {
                        throw Error("Invalid target");
                    }
                }
            };
            CreatureAction.prototype.performMulti = function (spaces) {
                throw Error("Cannot target multiple spaces");
            };
            CreatureAction.prototype._canAttack = function (targetCreature) {
                if(targetCreature) {
                    return this.creature.canAttack() && this.board.spacesAreAdjacent(this.creature.location(), targetCreature.location());
                }
                return this.creature.canAttack();
            };
            return CreatureAction;
        })();
        Actions.CreatureAction = CreatureAction;        
    })(ProjectAether.Actions || (ProjectAether.Actions = {}));
    var Actions = ProjectAether.Actions;
})(ProjectAether || (ProjectAether = {}));
