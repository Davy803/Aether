var ProjectAether;
(function (ProjectAether) {
    (function (Tests) {
        var DeckTests = (function () {
            function DeckTests() { }
            DeckTests.prototype._drawCard_WithCardsInDeck_ReturnsProperCard = function (c) {
                var deck = new ProjectAether.Deck(Tests.CardFactory.createMany(10, null, 2, "draw card test"));
                var card = deck.drawCard();
                c.areIdentical(card.name, "draw card test");
            };
            DeckTests.prototype._drawCard_WithoutCardsInDeck_ReturnsUndefined = function (c) {
                var deck = new ProjectAether.Deck([]);
                var card = deck.drawCard();
                c.areIdentical(card, undefined);
            };
            return DeckTests;
        })();
        Tests.DeckTests = DeckTests;        
    })(ProjectAether.Tests || (ProjectAether.Tests = {}));
    var Tests = ProjectAether.Tests;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=DeckTests.js.map
