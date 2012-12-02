/// <reference path="../main.ts" />

module ProjectAether {
    export class Deck {
        constructor (public cards: Card[]) {
            
        }

        drawCard(){
            return this.cards.pop();
        }
    }
}