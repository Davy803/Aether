/// <reference path="Card.ts" />
module ProjectAether.Cards {
    export class Centaur extends CreatureCard {
        constructor (owner: Player) {
            super("Centaur", 5, owner, {
                damage: 5,
                life: 12,
                movement: 2,
                buff: [new Buffs.Slow()]
            });
        }
    }
}