/// <reference path="../main.ts" />

module ProjectAether.Actions {
    export class MoveCreatureAction implements Action {
        targetTypes = [TargetTypes.Space, TargetTypes.Button];
        constructor (private board: Board, private creature: Creature) {

        }
        targetValidator(target: Target) {
            if (target instanceof Space) {
                var space = <Space> target;
                return space !== this.creature.location() && this.board.findEmptySquaresWithinXSteps(this.creature.location(), this.creature.movement.current()).contains(space);
            }
            if (target instanceof Button) {
                return target instanceof CancelButton;
            }
            throw new Helpers.NotImplementedError();
        }
        perform(target: Target) : Action {
            if (target instanceof CancelButton) {
                return null;
            }
            if (target instanceof Space) {
                var newSpace = <Space> target;
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
        }
        performMulti(spaces: Space[]) {
            throw Error("Cannot target multiple spaces");
        }
        
        //private _getDistance(space1: Space, space2: Space){
        //    var dx = Math.abs(space1.x - space2.x);
        //    var dy = Math.abs(space1.y - space2.y);
        //    var dz = Math.abs(space1.z() - space2.z());
        //    return Math.max(dx, dy, dz);
        //}

    }
}