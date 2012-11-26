var ProjectAether;
(function (ProjectAether) {
    ProjectAether.States = {
        InProgress: "In Progress",
        WinnerX: "X Wins",
        WinnerO: "O Wins",
        Tie: "Tie"
    };
})(ProjectAether || (ProjectAether = {}));
var viewModel;
window.onload = function () {
    var player1 = new ProjectAether.Player("Player 1");
    player1.deck = ProjectAether.Decks.centaurDeck(player1);
    var player2 = new ProjectAether.Player("Player 2");
    player2.deck = ProjectAether.Decks.faerieDeck(player2);
    var game = new ProjectAether.Game(player1, player2, 7, 6);
    ko.applyBindings(game);
    var hash = new HashSet();
    viewModel = game;
};
//@ sourceMappingURL=main.js.map
