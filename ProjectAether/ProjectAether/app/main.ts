
/// <reference path="../libs/knockout.d.ts" />
/// <reference path="../libs/underscore.d.ts" />
/// <reference path="../libs/hash/jshashset.d.ts" />
/// <reference path="../libs/hash/jshashtable.d.ts" />
/// <reference path="Helpers.ts" />
/// <reference path="Player.ts" />
/// <reference path="Creature.ts" />
/// <reference path="Space.ts" />
/// <reference path="Deck.ts" />
/// <reference path="Board.ts" />
/// <reference path="Game.ts" />
/// <reference path="Action.ts" />
/// <reference path="Target.ts" />
/// <reference path="Cards/_.ts" />
/// <reference path="Actions/_.ts" />
/// <reference path="Decks/decks.ts" />

module ProjectAether {
    export var States = {
        InProgress: "In Progress",
        WinnerX: "X Wins",
        WinnerO: "O Wins",
        Tie: "Tie"
    };
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