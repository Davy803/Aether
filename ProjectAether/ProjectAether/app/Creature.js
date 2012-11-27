var ProjectAether;
(function (ProjectAether) {
    var Creature = (function () {
        function Creature(name, stats) {
            var _this = this;
            this.isCurrentlyValidTarget = ko.observable(false);
            this.isSelected = ko.observable(false);
            this.controller = ko.observable();
            this.location = ko.observable();
            this.canAttack = ko.observable(true);
            this.name = ko.observable(name);
            this.damage = new Stat("damage", stats.damage);
            this.movement = new Stat("movement", stats.movement);
            this.life = new Stat("life", stats.life);
            this.canMove = ko.computed(function () {
                return _this.movement.current() > 0;
            });
        }
        Creature.prototype.enterPlay = function (controller, location) {
            this.controller(controller);
            this.location(location);
        };
        Creature.prototype.beginTurn = function () {
            this.canAttack(true);
            this.movement.reset();
            this.location().owner(this.controller());
        };
        Creature.prototype.attack = function (targetCreature) {
            ProjectAether.assert(this.canAttack());
            targetCreature.takeDamage(this.damage.current());
            this.canAttack(false);
        };
        Creature.prototype.takeDamage = function (amount) {
            this.life.subtract(amount);
            if(!this.isAlive()) {
                this._die();
            }
        };
        Creature.prototype.isAlive = function () {
            return this.life.current() > 0;
        };
        Creature.prototype.move = function (newSpace, distance) {
            this.movement.subtract(distance);
            this.location().setValue(null);
            this.location(newSpace);
            newSpace.setValue(this);
        };
        Creature.prototype._die = function () {
            this.location().setValue(null);
            this.location(null);
            this.controller().creaturesInPlay.remove(this);
            this.controller(null);
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
        Stat.prototype.add = function (amount) {
            this.current(this.current() + amount);
        };
        Stat.prototype.subtract = function (amount) {
            this.current(this.current() - amount);
        };
        Stat.prototype.reset = function () {
            this.current(this.initial);
        };
        return Stat;
    })();
    ProjectAether.Stat = Stat;    
})(ProjectAether || (ProjectAether = {}));
