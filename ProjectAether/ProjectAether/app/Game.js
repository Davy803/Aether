var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(player1, player2, width, height) {
            var _this = this;
                _super.call(this);
            this.player1 = player1;
            this.player2 = player2;
            this.currentPlayer = ko.observable(ProjectAether.Player);
            this.currentState = ko.observable(ProjectAether.States.InProgress);
            this.currentTurn = ko.observable(1);
            this.currentAction = ko.observable();
            this.endTurnButton = new EndTurnButton();
            this.cancelButton = new CancelButton();
            this.currentPlayer(player1);
            this.board = new ProjectAether.Board(width, height, player1, player2);
            player1.init();
            player2.init();
            this.currentAction.subscribe(function (newAction) {
                _this._clearAllTargetValidity();
                _this.setValidTargets(newAction);
            });
            this.mainPhaseAction = new ProjectAether.Actions.MainPhase(this);
            this.currentAction(this.mainPhaseAction);
        }
        Game.prototype.cb_selectTarget = function (target) {
            if(!target.isCurrentlyValidTarget()) {
                return;
            }
            var player = this.currentPlayer();
            var currentAction = this.currentAction();
            if(!currentAction.targetValidator(target)) {
                throw Error("Not valid target");
            }
            if(!target.isCurrentlyValidTarget()) {
                throw Error("Target validity not set");
            }
            var nextAction = currentAction.perform(target) || this.mainPhaseAction;
            this.currentAction(nextAction);
        };
        Game.prototype.endTurn = function () {
            if(this.currentPlayer() === this.player1) {
                this.currentPlayer(this.player2);
            } else {
                this.currentPlayer(this.player1);
            }
            this.currentPlayer().beginTurn();
        };
        Game.prototype.setValidTargets = function (action) {
            _.each(this.getValidTargets(action), function (x) {
                return x.isCurrentlyValidTarget(true);
            });
        };
        Game.prototype.getValidTargets = function (action) {
            var _this = this;
            var targets = [];
            _.forEach(action.targetTypes, function (targetType) {
                switch(targetType) {
                    case ProjectAether.TargetTypes.Card: {
                        targets.push.apply(targets, _this._getAllCards());
                        break;

                    }
                    case ProjectAether.TargetTypes.Creature: {
                        targets.push.apply(targets, _this._getAllCreatures());
                        break;

                    }
                    case ProjectAether.TargetTypes.Player: {
                        targets.push.apply(targets, _this._getAllPlayers());
                        break;

                    }
                    case ProjectAether.TargetTypes.Space: {
                        targets.push.apply(targets, _this._getAllSpaces());
                        break;

                    }
                    case ProjectAether.TargetTypes.Button: {
                        targets.push.apply(targets, _this._getAllButtons());
                        break;

                    }
                    default: {
                        throw Error("Unknown Target Type: " + targetType);

                    }
                }
            });
            return _.filter(targets, function (x) {
                return action.targetValidator(x);
            });
        };
        Game.prototype.hasValidNonButtonTargets = function (action) {
            return _.filter(this.getValidTargets(action), function (x) {
                return !(x instanceof Button);
            }).length > 0;
        };
        Game.prototype._getAllCards = function () {
            return _.union(this.player1.cardsInHand(), this.player1.deck.cards, this.player2.cardsInHand(), this.player2.deck.cards);
        };
        Game.prototype._getAllCreatures = function () {
            return _.chain(this.board.spaces).map(function (s) {
                return s.value();
            }).filter(function (x) {
                return x instanceof ProjectAether.Creature;
            }).value();
        };
        Game.prototype._getAllPlayers = function () {
            return [
                this.player1, 
                this.player2
            ];
        };
        Game.prototype._getAllSpaces = function () {
            return this.board.spaces;
        };
        Game.prototype._getAllButtons = function () {
            return [
                this.endTurnButton, 
                this.cancelButton
            ];
        };
        Game.prototype._getAllTargets = function () {
            return _.union(this._getAllCards(), this._getAllCreatures(), this._getAllPlayers(), this._getAllSpaces(), this._getAllButtons());
        };
        Game.prototype._clearAllTargetValidity = function () {
            _.each(this._getAllTargets(), function (x) {
                return x.isCurrentlyValidTarget(false);
            });
        };
        return Game;
    })(Helpers.HasCallbacks);
    ProjectAether.Game = Game;    
    var Button = (function () {
        function Button() {
            this.isCurrentlyValidTarget = ko.observable(false);
        }
        return Button;
    })();
    ProjectAether.Button = Button;    
    var EndTurnButton = (function (_super) {
        __extends(EndTurnButton, _super);
        function EndTurnButton() {
            _super.apply(this, arguments);

        }
        return EndTurnButton;
    })(Button);
    ProjectAether.EndTurnButton = EndTurnButton;    
    var CancelButton = (function (_super) {
        __extends(CancelButton, _super);
        function CancelButton() {
            _super.apply(this, arguments);

        }
        return CancelButton;
    })(Button);
    ProjectAether.CancelButton = CancelButton;    
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Game.js.map
