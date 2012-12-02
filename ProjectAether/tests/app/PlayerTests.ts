/// <reference path="main.ts" />

module ProjectAether.Tests {
    export class PlayerTests extends TestClassBase{       
        ctor_Default_HasNoCardsInHand(c: tsUnit.TestContext){
            var deck = new Deck(CardFactory.createMany(10, null, 2, "draw card test"));
            var player = new Player("test", deck);
            this.assert.areIdentical(player.cardsInHand().length, 0);
        }

        _drawCard_WithCardsInDeck_PutsCardInPlayersHand(c: tsUnit.TestContext){
            var deck = new Deck(CardFactory.createMany(10, null, 2, "draw card test"));
            var player = new Player("test", deck);
            player._drawCard();
            this.assert.areIdentical(player.cardsInHand().length, 1);
            this.assert.areIdentical(player.cardsInHand()[0].name, "draw card test");
        }
        
        _drawCard_WithoutCardsInDeck_DoesNotPutsCardInPlayersHand(c: tsUnit.TestContext){
            var deck = new Deck([]);
            var player = new Player("test", deck);
            player._drawCard();
            this.assert.areIdentical(player.cardsInHand().length, 0);
        }
    }
}
