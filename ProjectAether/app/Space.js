var ProjectAether;
(function (ProjectAether) {
    var Space = (function () {
        function Space(y, x, owner) {
            this.y = y;
            this.x = x;
            var _this = this;
            this._isCurrentlyValidTarget = ko.observable(false);
            this._value = ko.observable(null);
            this.owner = ko.observable();
            this.value = ko.computed(function () {
                return _this._value();
            });
            this.owner(owner);
            this.isCurrentlyValidTarget = ko.computed({
                read: function () {
                    return _this._isCurrentlyValidTarget() || _this._value() && _this._value().isCurrentlyValidTarget();
                },
                write: function (newValue) {
                    return _this._isCurrentlyValidTarget(newValue);
                }
            });
            this.isSelected = ko.computed(function () {
                return _this._value() && _this._value().isSelected();
            });
        }
        Space.prototype.z = function () {
            return -(this.x + this.y);
        };
        Space.prototype.setValue = function (value) {
            if(value !== null && this._value() !== null) {
                throw Error("Value Already Set");
            }
            this._value(value);
        };
        Space.prototype.isEmpty = function () {
            return this._value() == null;
        };
        return Space;
    })();
    ProjectAether.Space = Space;    
})(ProjectAether || (ProjectAether = {}));
