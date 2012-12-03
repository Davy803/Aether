var ProjectAether;
(function (ProjectAether) {
    (function (Tests) {
        var GameTests = (function () {
            function GameTests() { }
            GameTests.prototype.cb_selectTargetWithTargetActionNoneDoesNotCallPerform = function (c) {
                var mockAction = new MockAction();
                var game = GameFactory.create();
                game.currentAction(mockAction);
                game.cb_selectTarget({
                    targetAction: ko.observable(ProjectAether.TargetActions.None)
                });
                c.isFalse(mockAction.performWasCalled);
            };
            GameTests.prototype.cb_selectTargetWithTargetActionNoneDoesNotChangeAction = function (c) {
                var mockAction = new MockAction();
                var game = GameFactory.create();
                game.currentAction(mockAction);
                game.cb_selectTarget({
                    targetAction: ko.observable(ProjectAether.TargetActions.None)
                });
                c.areIdentical(mockAction, game.currentAction());
            };
            return GameTests;
        })();
        Tests.GameTests = GameTests;        
        var MockAction = (function () {
            function MockAction() {
                this.name = "Mock Action";
                this.targetTypes = [
                    ProjectAether.TargetTypes.Button
                ];
                this.getTargetAction = function (t) {
                    return "";
                };
                this.performMulti = function (targets) {
                };
                this.perform = function (target) {
                    return null;
                };
                this.performWasCalled = false;
            }
            return MockAction;
        })();
        Tests.MockAction = MockAction;        
        var GameFactory = (function () {
            function GameFactory() { }
            GameFactory.create = function create(player1, player2) {
                var player1 = player1 || PlayerFactory.create("player1");
                var player2 = player2 || PlayerFactory.create("player2");
                return new ProjectAether.Game(player1, player2, 5, 5);
            }
            return GameFactory;
        })();
        Tests.GameFactory = GameFactory;        
        var PlayerFactory = (function () {
            function PlayerFactory() { }
            PlayerFactory.create = function create(name, deck) {
                if (typeof name === "undefined") { name = "test"; }
                if (typeof deck === "undefined") { deck = null; }
                var player = new ProjectAether.Player(name);
                player.deck = deck || new ProjectAether.Deck([
                    CardFactory.create(player, 0)
                ]);
                return player;
            }
            return PlayerFactory;
        })();
        Tests.PlayerFactory = PlayerFactory;        
        var CardFactory = (function () {
            function CardFactory() { }
            CardFactory.create = function create(player, cost, name) {
                if (typeof player === "undefined") { player = null; }
                if (typeof cost === "undefined") { cost = 5; }
                if (typeof name === "undefined") { name = "test card"; }
                player = player || PlayerFactory.create();
                return new ProjectAether.CreatureCard(name, cost, player, {
                    damage: 5,
                    life: 10,
                    movement: 2
                });
            }
            CardFactory.createMany = function createMany(count, player, cost, name) {
                if (typeof player === "undefined") { player = null; }
                if (typeof cost === "undefined") { cost = 5; }
                if (typeof name === "undefined") { name = "test card"; }
                return _.map(_.range(count), function () {
                    return CardFactory.create(player, cost, name);
                });
            }
            return CardFactory;
        })();
        Tests.CardFactory = CardFactory;        
        var MainPhaseFactory = (function () {
            function MainPhaseFactory() { }
            MainPhaseFactory.create = function create(game) {
                if (typeof game === "undefined") { game = null; }
                game = game || GameFactory.create();
                return new ProjectAether.Actions.MainPhase(game);
            }
            return MainPhaseFactory;
        })();
        Tests.MainPhaseFactory = MainPhaseFactory;        
    })(ProjectAether.Tests || (ProjectAether.Tests = {}));
    var Tests = ProjectAether.Tests;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=GameTests.js.map
