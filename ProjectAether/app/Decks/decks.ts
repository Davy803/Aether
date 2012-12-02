/// <reference path="../../main.ts" />

module ProjectAether.Decks {
    function getCards(type: new (owner: Player) => Card, count: number, owner: Player) {
        return <Card[]>_.map(_.range(40), i => new type(owner))
    }
    export function centaurDeck(owner: Player) {
        return new Deck(getCards(ProjectAether.Cards.Centaur, 40, owner));
    }
    export function faerieDeck(owner: Player) {
        return new Deck(getCards(ProjectAether.Cards.Faerie, 40, owner));
    }    
    export function unicornDeck(owner: Player) {
        return new Deck(getCards(ProjectAether.Cards.Unicorn, 40, owner));
    }
}