var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectAether;
(function (ProjectAether) {
    var Creature = (function () {
        function Creature(name, stats) {
            var _this = this;
            this.targetAction = ko.observable(ProjectAether.TargetActions.None);
            this.isSelected = ko.observable(false);
            this.controller = ko.observable();
            this.location = ko.observable();
            this.canAttack = ko.observable(true);
            this.name = ko.observable(name);
            this.damage = new StatNumber("damage", stats.damage);
            this.movement = new StatNumber("movement", stats.movement);
            this.life = new StatNumber("life", stats.life);
            this.flying = new StatBool("flying", stats.flying);
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
        Stat.prototype.reset = function () {
            this.current(this.initial);
        };
        return Stat;
    })();
    ProjectAether.Stat = Stat;    
    var StatNumber = (function (_super) {
        __extends(StatNumber, _super);
        function StatNumber(name, initial) {
                _super.call(this, name, initial);
            this.name = name;
            this.initial = initial;
        }
        StatNumber.prototype.add = function (amount) {
            this.current(this.current() + amount);
        };
        StatNumber.prototype.subtract = function (amount) {
            this.current(this.current() - amount);
        };
        return StatNumber;
    })(Stat);
    ProjectAether.StatNumber = StatNumber;    
    var StatBool = (function (_super) {
        __extends(StatBool, _super);
        function StatBool(name, initial) {
                _super.call(this, name, initial);
            this.name = name;
            this.initial = initial;
        }
        StatBool.prototype.invert = function () {
            this.current(!this.current());
        };
        return StatBool;
    })(Stat);
    ProjectAether.StatBool = StatBool;    
})(ProjectAether || (ProjectAether = {}));
