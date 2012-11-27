var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    (function (Cards) {
        var Unicorn = (function (_super) {
            __extends(Unicorn, _super);
            function Unicorn(owner) {
                        _super.call(this, "Unicorn", 4, owner, {
            damage: 5,
            life: 10,
            movement: 2
        });
            }
            return Unicorn;
        })(ProjectAether.CreatureCard);
        Cards.Unicorn = Unicorn;        
    })(ProjectAether.Cards || (ProjectAether.Cards = {}));
    var Cards = ProjectAether.Cards;
})(ProjectAether || (ProjectAether = {}));
