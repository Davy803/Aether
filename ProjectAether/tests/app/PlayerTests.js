var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    (function (Tests) {
        var PlayerTests = (function (_super) {
            __extends(PlayerTests, _super);
            function PlayerTests() {
                _super.apply(this, arguments);

            }
            PlayerTests.prototype.ctor_Default_HasNoCardsInHand = function (c) {
                var deck = new ProjectAether.Deck(Tests.CardFactory.createMany(10, null, 2, "draw card test"));
                var player = new ProjectAether.Player("test", deck);
                this.assert.areIdentical(player.cardsInHand().length, 0);
            };
            PlayerTests.prototype._drawCard_WithCardsInDeck_PutsCardInPlayersHand = function (c) {
                var deck = new ProjectAether.Deck(Tests.CardFactory.createMany(10, null, 2, "draw card test"));
                var player = new ProjectAether.Player("test", deck);
                player._drawCard();
                this.assert.areIdentical(player.cardsInHand().length, 1);
                this.assert.areIdentical(player.cardsInHand()[0].name, "draw card test");
            };
            PlayerTests.prototype._drawCard_WithoutCardsInDeck_DoesNotPutsCardInPlayersHand = function (c) {
                var deck = new ProjectAether.Deck([]);
                var player = new ProjectAether.Player("test", deck);
                player._drawCard();
                this.assert.areIdentical(player.cardsInHand().length, 0);
            };
            return PlayerTests;
        })(Tests.TestClassBase);
        Tests.PlayerTests = PlayerTests;        
    })(ProjectAether.Tests || (ProjectAether.Tests = {}));
    var Tests = ProjectAether.Tests;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=PlayerTests.js.map
