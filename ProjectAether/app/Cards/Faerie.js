var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    (function (Cards) {
        var Faerie = (function (_super) {
            __extends(Faerie, _super);
            function Faerie(owner) {
                        _super.call(this, "Faerie", 2, owner, {
            damage: 2,
            life: 5,
            movement: 4,
            flying: true
        });
            }
            return Faerie;
        })(ProjectAether.CreatureCard);
        Cards.Faerie = Faerie;        
    })(ProjectAether.Cards || (ProjectAether.Cards = {}));
    var Cards = ProjectAether.Cards;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Faerie.js.map
