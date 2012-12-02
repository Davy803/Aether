/// <reference path="Buff.ts" />

module ProjectAether.Buffs {
    export class Slow extends Buff {
        apply(creature: Creature){
            //Halve both because buffs are applied after beginTurn
            creature.totalMovement.halve();
            creature.movement.halve();
        }
    }
}