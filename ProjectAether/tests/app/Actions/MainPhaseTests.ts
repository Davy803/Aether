/// <reference path="../main.ts" />
module ProjectAether.Tests {
    export class MainPhaseTests extends TestClassBase {

        _canPlayCard_PlayerNotHoldingCard_ReturnsFalse(c: tsUnit.TestContext) {
            var game = GameFactory.create();
            var mainPhase = new ProjectAether.Actions.MainPhase(game);
            mainPhase._getCardAction = (c) => new MockAction();
            var card = new CardBase("test", 5, game.currentPlayer());
            game.currentPlayer().isHoldingCard = (card) => false;
            c.isFalsey(mainPhase._canPlayCard(card))
        }

        _canPlayCard_PlayerCantAffordCard_ReturnsFalse(c: tsUnit.TestContext) {
            var player = PlayerFactory.create();
            var game = GameFactory.create(player);
            player.mana(2);
            var mainPhase = new ProjectAether.Actions.MainPhase(game);
            mainPhase._getCardAction = (c) => new MockAction();
            var card = CardFactory.create(player, 5)
            c.isFalsey(mainPhase._canPlayCard(card))
        }

        
        _canPlayCard_DoesNotHaveValidTargets_ReturnsFalse(c: tsUnit.TestContext) {
            var player = PlayerFactory.create();
            var game = GameFactory.create(player);
            var mainPhase = new ProjectAether.Actions.MainPhase(game);
            mainPhase._getCardAction = (c) => new MockAction();
            game.hasValidNonButtonTargets = (action) => false;
            var card = CardFactory.create(player, 5)
            c.isFalsey(mainPhase._canPlayCard(card))
        }

        
        _canPlayCard_IsHoldingCardAndCanAffordAndHasValidTargets_ReturnsTrue(c: tsUnit.TestContext) {
            var player = PlayerFactory.create();
            var game = GameFactory.create(player);
            
            var mainPhase = new ProjectAether.Actions.MainPhase(game);
            mainPhase._getCardAction = (c) => new MockAction();
            
            player.mana(10);
            game.currentPlayer().isHoldingCard = (card) => true;
            game.hasValidNonButtonTargets = (action) => true;
            
            var card = CardFactory.create(player, 5)
            c.isTrue(mainPhase._canPlayCard(card))
        }

        getTargetAction_CardThatCanBePlayed_ReturnsPlace() {
            var player = PlayerFactory.create();
            var game = GameFactory.create(player);            
            var mainPhase = new ProjectAether.Actions.MainPhase(game);
            mainPhase._canPlayCard = (card) => true;

            var card = CardFactory.create(player)
            this.assert.areIdentical(mainPhase.getTargetAction(card), TargetActions.Place);

        }
            //    getTargetAction(target: Target) : string {
            //if (target instanceof CardBase) {
            //    return this._canPlayCard(<Card>target)
            //            ? TargetActions.Place
            //            : TargetActions.None;
            //}
    }
}