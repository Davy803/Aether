/// <reference path="main.ts" />

module ProjectAether.Tests {
    export class GameTests implements tsUnit.ITestClass {
        cb_selectTargetWithTargetActionNoneDoesNotCallPerform(c: tsUnit.TestContext) {
            var mockAction = new MockAction();
            var game = GameFactory.create();
            game.currentAction(mockAction);
            game.cb_selectTarget({ targetAction: ko.observable(TargetActions.None) });
            c.isFalse(mockAction.performWasCalled);
        }
        cb_selectTargetWithTargetActionNoneDoesNotChangeAction(c: tsUnit.TestContext) {
            var mockAction = new MockAction();
            var game = GameFactory.create();
            game.currentAction(mockAction);
            game.cb_selectTarget({ targetAction: ko.observable(TargetActions.None) });
            c.areIdentical(mockAction, game.currentAction());
        }

    }
    export class MockAction implements Action {
        name = "Mock Action";
        targetTypes = [TargetTypes.Button];
        getTargetAction = (t) => "";
        performMulti = (targets: Target[]) =>{ };
        perform = (target: Target) => <Action>null;
        performWasCalled = false;
    }

    export class GameFactory {
        static create(player1?: Player, player2?: Player) {
            var player1 = player1 || PlayerFactory.create("player1");
            var player2 = player2 || PlayerFactory.create("player2");
            return new Game(player1, player2, 5, 5);
        }
    }
    export class PlayerFactory {
        static create(name = "test", deck: Deck = null) {
            var player = new Player(name);
            player.deck = deck || new Deck([CardFactory.create(player, 0)]);
            return player;
        }
    }
    export class CardFactory {
        static create(player: Player = null, cost = 5, name = "test card") {
            player = player || PlayerFactory.create();
            return new CreatureCard(name, cost, player, {
                damage: 5,
                life: 10,
                movement: 2,
            });
        }
        static createMany(count, player: Player = null, cost = 5, name = "test card") {
            return _.map(_.range(count), () =>CardFactory.create(player, cost, name));
        }
    }

    export class MainPhaseFactory {
        static create(game: Game = null) {
            game = game || GameFactory.create();
            return new Actions.MainPhase(game);
        }
    }
}