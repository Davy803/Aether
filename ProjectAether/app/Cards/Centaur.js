var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    (function (Cards) {
        var Centaur = (function (_super) {
            __extends(Centaur, _super);
            function Centaur(owner) {
                        _super.call(this, "Centaur", 5, owner, {
            damage: 5,
            life: 12,
            movement: 2,
            buffs: [
                new ProjectAether.Buffs.Slow()
            ]
        });
            }
            return Centaur;
        })(ProjectAether.CreatureCard);
        Cards.Centaur = Centaur;        
    })(ProjectAether.Cards || (ProjectAether.Cards = {}));
    var Cards = ProjectAether.Cards;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Centaur.js.map
