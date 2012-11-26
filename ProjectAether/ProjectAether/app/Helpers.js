var Helpers;
(function (Helpers) {
    var HasCallbacks = (function () {
        function HasCallbacks() {
            var _this = this, _constructor = (this).constructor;
            if(!_constructor.__cb__) {
                _constructor.__cb__ = {
                };
                for(var m in this) {
                    var fn = this[m];
                    if(typeof fn === 'function' && m.indexOf('cb_') == 0) {
                        _constructor.__cb__[m] = fn;
                    }
                }
            }
            for(var m in _constructor.__cb__) {
                (function (m, fn) {
                    _this[m] = function () {
                        return fn.apply(_this, Array.prototype.slice.call(arguments));
                    };
                })(m, _constructor.__cb__[m]);
            }
        }
        return HasCallbacks;
    })();
    Helpers.HasCallbacks = HasCallbacks;    
    var NotImplementedError = (function () {
        function NotImplementedError(message) {
            if (typeof message === "undefined") { message = "Not Implemented"; }
            this.message = message;
            this.name = "NotImplementedError";
        }
        return NotImplementedError;
    })();
    Helpers.NotImplementedError = NotImplementedError;    
})(Helpers || (Helpers = {}));
//@ sourceMappingURL=Helpers.js.map
