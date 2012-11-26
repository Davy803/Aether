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
            this.isCurrentlyValidTarget = ko.observable(false);
            this.cardsInHand = ko.observableArray();
            this.graveyard = ko.observableArray();
            this.mana = ko.observable(0);
        }
        Player.prototype.init = function () {
            var _this = this;
            _.times(7, function (index) {
                return _this._drawCard();
            });
            this.mana(5);
        };
        Player.prototype.payCost = function (cost) {
            this.mana(this.mana() - cost);
        };
        Player.prototype.beginTurn = function () {
            this._drawCard();
            this.mana(this.mana() + 5);
        };
        Player.prototype._drawCard = function () {
            this.cardsInHand.push(this.deck.drawCard());
        };
        return Player;
    })(Helpers.HasCallbacks);
    ProjectAether.Player = Player;    
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Player.js.map
