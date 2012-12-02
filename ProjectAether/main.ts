
/// <reference path="libs/knockout.d.ts" />
/// <reference path="libs/underscore.d.ts" />
/// <reference path="libs/hash/jshashset.d.ts" />
/// <reference path="libs/hash/jshashtable.d.ts" />
/// <reference path="app/Helpers.ts" />
/// <reference path="app/Player.ts" />
/// <reference path="app/Creature.ts" />
/// <reference path="app/Space.ts" />
/// <reference path="app/Deck.ts" />
/// <reference path="app/Board.ts" />
/// <reference path="app/Game.ts" />
/// <reference path="app/Target.ts" />
/// <reference path="app/Actions/Action.ts" />
/// <reference path="app/Buffs/Buff.ts" />
/// <reference path="app/Cards/Card.ts" />
/// <reference path="app/Decks/decks.ts" />

module ProjectAether {
    export function assert(value: bool){
        if(!value){
            throw Error("Assertion Failed");
        }
    }
}
var viewModel;
window.onload = () => {
    var player1 = new ProjectAether.Player("Player 1");
    player1.deck = ProjectAether.Decks.centaurDeck(player1);
    var player2 = new ProjectAether.Player("Player 2");
    player2.deck = ProjectAether.Decks.faerieDeck(player2);
    var game = new ProjectAether.Game(player1, player2, 7, 6);
    ko.applyBindings(game);
    var hash = new HashSet();
    viewModel = game;
};