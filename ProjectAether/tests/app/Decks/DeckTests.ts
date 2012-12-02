/// <reference path="../main.ts" />
module ProjectAether.Tests {
    export class DeckTests  implements tsUnit.ITestClass {
        _drawCard_WithCardsInDeck_ReturnsProperCard(c: tsUnit.TestContext) {
            var deck = new Deck(CardFactory.createMany(10, null, 2, "draw card test"));
            var card = deck.drawCard();
            c.areIdentical(card.name, "draw card test");
        }

        _drawCard_WithoutCardsInDeck_ReturnsUndefined(c: tsUnit.TestContext) {
            var deck = new Deck([]);
            var card = deck.drawCard();
            c.areIdentical(card, undefined);
        }
    }
}