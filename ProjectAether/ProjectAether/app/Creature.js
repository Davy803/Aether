var ProjectAether;
(function (ProjectAether) {
    var Creature = (function () {
        function Creature(name, stats) {
            this.isCurrentlyValidTarget = ko.observable(false);
            this.isSelected = ko.observable(false);
            this.controller = ko.observable();
            this.location = ko.observable();
            this.name = ko.observable(name);
            this.damage = new Stat("damage", stats.damage);
            this.movement = new Stat("movement", stats.movement);
            this.life = new Stat("life", stats.life);
        }
        Creature.prototype.enterPlay = function (controller, location) {
            this.controller(controller);
            this.location(location);
        };
        return Creature;
    })();
    ProjectAether.Creature = Creature;    
    var Stat = (function () {
        function Stat(name, initial) {
            this.name = name;
            this.initial = initial;
            this.current = ko.observable(initial);
        }
        return Stat;
    })();
    ProjectAether.Stat = Stat;    
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Creature.js.map
