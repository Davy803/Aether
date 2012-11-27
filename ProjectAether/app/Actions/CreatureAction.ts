/// <reference path="../main.ts" />

module ProjectAether.Actions {
    export class CreatureAction implements Action {
        targetTypes = [TargetTypes.Space, TargetTypes.Button, TargetTypes.Creature];
        constructor (private board: Board, private creature: Creature) {

        }
        getTargetAction(target: Target): string {
            //Moving
            if (target instanceof Space) {
                var space = <Space> target;
                return this.board.findEmptySquaresWithinXSteps(this.creature.location(), this.creature.movement.current()).contains(space)
                        ? TargetActions.Move
                        : TargetActions.None;
            }
            //Attacking
            if (target instanceof Creature) {
                return this._canAttack(<Creature>target)
                        ? TargetActions.Attack
                        : TargetActions.None;
            }

            if (target instanceof Button) {
                return target instanceof CancelButton
                        ? TargetActions.Button
                        : TargetActions.None;
            }
            throw new ProjectAether.NotImplementedError();
        }
        perform(target: Target): Action {
            if (target instanceof CancelButton) {
                return null;
            }
            //Move
            if (target instanceof Space) {
                var newSpace = <Space> target;
                this.creature.move(newSpace, this.board.getDistance(this.creature, newSpace));
                this.creature.isSelected(false);
                return null;
            }
                //Attack
            else if (target instanceof Creature) {
                var targetCreature = <Creature> target;
                this.creature.attack(targetCreature);
            }
            else {
                throw Error("Invalid target");
            }
        }

        performMulti(spaces: Space[]) {
            throw Error("Cannot target multiple spaces");
        }

        private _canAttack(targetCreature?: Creature) {
            if (targetCreature) {
                return this.creature.canAttack() && this.board.spacesAreAdjacent(this.creature.location(), targetCreature.location());
            }
            return this.creature.canAttack()
        }
        //private _getDistance(space1: Space, space2: Space){
        //    var dx = Math.abs(space1.x - space2.x);
        //    var dy = Math.abs(space1.y - space2.y);
        //    var dz = Math.abs(space1.z() - space2.z());
        //    return Math.max(dx, dy, dz);
        //}

    }
}