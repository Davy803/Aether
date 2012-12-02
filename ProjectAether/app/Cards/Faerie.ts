/// <reference path="Card.ts" />
module ProjectAether.Cards {
    export class Faerie extends CreatureCard {
        constructor (owner: Player) {
            super("Faerie", 2, owner, {
                damage: 2,
                life: 5,
                movement: 4,
                flying: true,
            });
        }
        
    }
}