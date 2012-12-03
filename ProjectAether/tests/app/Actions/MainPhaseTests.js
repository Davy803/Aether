var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    (function (Tests) {
        var MainPhaseTests = (function (_super) {
            __extends(MainPhaseTests, _super);
            function MainPhaseTests() {
                _super.apply(this, arguments);

            }
            MainPhaseTests.prototype._canPlayCard_PlayerNotHoldingCard_ReturnsFalse = function (c) {
                var game = Tests.GameFactory.create();
                var mainPhase = new ProjectAether.Actions.MainPhase(game);
                mainPhase._getCardAction = function (c) {
                    return new Tests.MockAction();
                };
                var card = new ProjectAether.CardBase("test", 5, game.currentPlayer());
                game.currentPlayer().isHoldingCard = function (card) {
                    return false;
                };
                c.isFalsey(mainPhase._canPlayCard(card));
            };
            MainPhaseTests.prototype._canPlayCard_PlayerCantAffordCard_ReturnsFalse = function (c) {
                var player = Tests.PlayerFactory.create();
                var game = Tests.GameFactory.create(player);
                player.mana(2);
                var mainPhase = new ProjectAether.Actions.MainPhase(game);
                mainPhase._getCardAction = function (c) {
                    return new Tests.MockAction();
                };
                var card = Tests.CardFactory.create(player, 5);
                c.isFalsey(mainPhase._canPlayCard(card));
            };
            MainPhaseTests.prototype._canPlayCard_DoesNotHaveValidTargets_ReturnsFalse = function (c) {
                var player = Tests.PlayerFactory.create();
                var game = Tests.GameFactory.create(player);
                var mainPhase = new ProjectAether.Actions.MainPhase(game);
                mainPhase._getCardAction = function (c) {
                    return new Tests.MockAction();
                };
                game.hasValidNonButtonTargets = function (action) {
                    return false;
                };
                var card = Tests.CardFactory.create(player, 5);
                c.isFalsey(mainPhase._canPlayCard(card));
            };
            MainPhaseTests.prototype._canPlayCard_IsHoldingCardAndCanAffordAndHasValidTargets_ReturnsTrue = function (c) {
                var player = Tests.PlayerFactory.create();
                var game = Tests.GameFactory.create(player);
                var mainPhase = new ProjectAether.Actions.MainPhase(game);
                mainPhase._getCardAction = function (c) {
                    return new Tests.MockAction();
                };
                player.mana(10);
                game.currentPlayer().isHoldingCard = function (card) {
                    return true;
                };
                game.hasValidNonButtonTargets = function (action) {
                    return true;
                };
                var card = Tests.CardFactory.create(player, 5);
                c.isTrue(mainPhase._canPlayCard(card));
            };
            MainPhaseTests.prototype.getTargetAction_CardThatCanBePlayed_ReturnsPlace = function () {
                var player = Tests.PlayerFactory.create();
                var game = Tests.GameFactory.create(player);
                var mainPhase = new ProjectAether.Actions.MainPhase(game);
                mainPhase._canPlayCard = function (card) {
                    return true;
                };
                var card = Tests.CardFactory.create(player);
                this.assert.areIdentical(mainPhase.getTargetAction(card), ProjectAether.TargetActions.Place);
            };
            return MainPhaseTests;
        })(Tests.TestClassBase);
        Tests.MainPhaseTests = MainPhaseTests;        
    })(ProjectAether.Tests || (ProjectAether.Tests = {}));
    var Tests = ProjectAether.Tests;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=MainPhaseTests.js.map
