/// <reference path="../main.ts" />
/// <reference path="_.ts" />

module ProjectAether.Cards {
    export class Unicorn extends CreatureCard {
        constructor (owner: Player) {
            super("Unicorn", 4, owner, {
                damage: 5,
                life: 10,
                movement: 2,
            });
        }
    }
}