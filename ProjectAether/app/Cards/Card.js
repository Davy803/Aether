var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    var CardBase = (function () {
        function CardBase(name, cost, owner) {
            this.name = name;
            this.cost = cost;
            this.owner = owner;
            this.targetAction = ko.observable(ProjectAether.TargetActions.None);
            this.isSelected = ko.observable(false);
        }
        return CardBase;
    })();
    ProjectAether.CardBase = CardBase;    
    var CreatureCard = (function (_super) {
        __extends(CreatureCard, _super);
        function CreatureCard(name, cost, owner, stats) {
                _super.call(this, name, cost, owner);
            this.creature = new ProjectAether.Creature(name, stats);
        }
        return CreatureCard;
    })(CardBase);
    ProjectAether.CreatureCard = CreatureCard;    
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Card.js.map
