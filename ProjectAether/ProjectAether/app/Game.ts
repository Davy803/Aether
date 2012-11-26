/// <reference path="main.ts" />

module ProjectAether {
    export class Game extends Helpers.HasCallbacks {
        currentPlayer: KnockoutObservablePlayer = ko.observable(Player);
        currentState = ko.observable(ProjectAether.States.InProgress);
        currentTurn = ko.observable(1);
        currentAction: KnockoutObservableAction = ko.observable();
        board: Board;
        endTurnButton = new EndTurnButton();
        cancelButton = new CancelButton();
        mainPhaseAction: Actions.MainPhase;
        constructor (public player1: Player, public player2: Player, width: number, height: number) {
            super();
            this.currentPlayer(player1);
            this.board = new Board(width, height, player1, player2);
            player1.init();
            player2.init();
            this.currentAction.subscribe(newAction => {
                this._clearAllTargetValidity();
                this.setValidTargets(newAction);
            });
            this.mainPhaseAction = new Actions.MainPhase(this);
            this.currentAction(this.mainPhaseAction);
        }

        cb_selectTarget(target: Target) {
            if (!target.isCurrentlyValidTarget()) {
                return;
            }

            var player = this.currentPlayer();
            var currentAction = this.currentAction();

            if (!currentAction.targetValidator(target)) {
                throw Error("Not valid target");
            }

            if (!target.isCurrentlyValidTarget()) {
                throw Error("Target validity not set");
            }
            var nextAction = currentAction.perform(target) || this.mainPhaseAction;
            this.currentAction(nextAction);
        }

        endTurn() {
            if (this.currentPlayer() === this.player1) {
                this.currentPlayer(this.player2);
            } else {
                this.currentPlayer(this.player1);
            }
            this.currentPlayer().beginTurn();
        }


        setValidTargets(action: Action) {
            _.each(this.getValidTargets(action), (x) => x.isCurrentlyValidTarget(true));
        }

        getValidTargets(action: Action): Target[] {
            var targets: Target[] = [];
            _.forEach(action.targetTypes, targetType => {
                switch (targetType) {
                    case TargetTypes.Card:
                        targets.push.apply(targets, this._getAllCards());
                        break;
                    case TargetTypes.Creature:
                        targets.push.apply(targets, this._getAllCreatures());
                        break;
                    case TargetTypes.Player:
                        targets.push.apply(targets, this._getAllPlayers());
                        break;
                    case TargetTypes.Space:
                        targets.push.apply(targets, this._getAllSpaces());
                        break;
                    case TargetTypes.Button:
                        targets.push.apply(targets, this._getAllButtons());
                        break;
                    default:
                        throw Error("Unknown Target Type: " + targetType)
                }
            });
            return _.filter(targets, (x: Target) => action.targetValidator(x));
        }

        hasValidNonButtonTargets(action: Action) {
            return _.filter(this.getValidTargets(action), (x: Target) => !(x instanceof Button)).length > 0;
        }
        private _getAllCards(): Card[] {
            return _.union(
                this.player1.cardsInHand(),
                this.player1.deck.cards,
                this.player2.cardsInHand(),
                this.player2.deck.cards);
        }

        private _getAllCreatures(): Creature[] {
            return _.chain(this.board.spaces)
                .map((s: Space) => s.value())
                .filter((x) => x instanceof Creature)
                .value();
        }

        private _getAllPlayers(): Player[] {
            return [this.player1, this.player2];
        }

        private _getAllSpaces(): Space[] {
            return this.board.spaces;
        }

        private _getAllButtons(): Button[] {
            return [this.endTurnButton, this.cancelButton];
        }

        private _getAllTargets(): Target[] {
            return _.union(this._getAllCards(), this._getAllCreatures(), this._getAllPlayers(), this._getAllSpaces(), this._getAllButtons());
        }
        private _clearAllTargetValidity() {
            _.each(this._getAllTargets(), (x: Target) =>x.isCurrentlyValidTarget(false));
        }
    }

    export class Button implements Target {
        isCurrentlyValidTarget = ko.observable(false);
    }
    export class EndTurnButton extends Button { }

    export class CancelButton extends Button { }
}