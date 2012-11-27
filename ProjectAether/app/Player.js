var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(name, deck) {
                _super.call(this);
            this.name = name;
            this.deck = deck;
            this.targetAction = ko.observable(ProjectAether.TargetActions.None);
            this.cardsInHand = ko.observableArray();
            this.graveyard = ko.observableArray();
            this.creaturesInPlay = ko.observableArray();
            this.mana = ko.observable(0);
        }
        Player.prototype.init = function () {
            var _this = this;
            _.times(7, function (index) {
                return _this._drawCard();
            });
        };
        Player.prototype.canPayCost = function (cost) {
            return this.mana() >= cost;
        };
        Player.prototype.payCost = function (cost) {
            this.mana(this.mana() - cost);
        };
        Player.prototype.playCreature = function (creature, space) {
            this.creaturesInPlay.push(creature);
            space.setValue(creature);
            creature.enterPlay(this, space);
        };
        Player.prototype.beginTurn = function () {
            this._drawCard();
            this.mana(this.mana() + 5);
            _.each(this.creaturesInPlay(), function (creature) {
                return creature.beginTurn();
            });
        };
        Player.prototype.isHoldingCard = function (card) {
            return _.contains(this.cardsInHand(), card);
        };
        Player.prototype._drawCard = function () {
            this.cardsInHand.push(this.deck.drawCard());
        };
        return Player;
    })(ProjectAether.HasCallbacks);
    ProjectAether.Player = Player;    
})(ProjectAether || (ProjectAether = {}));
