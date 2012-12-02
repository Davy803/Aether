var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    (function (Buffs) {
        var Slow = (function (_super) {
            __extends(Slow, _super);
            function Slow() {
                _super.apply(this, arguments);

            }
            Slow.prototype.apply = function (creature) {
                creature.totalMovement.halve();
                creature.movement.halve();
            };
            return Slow;
        })(ProjectAether.Buff);
        Buffs.Slow = Slow;        
    })(ProjectAether.Buffs || (ProjectAether.Buffs = {}));
    var Buffs = ProjectAether.Buffs;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Slow.js.map
