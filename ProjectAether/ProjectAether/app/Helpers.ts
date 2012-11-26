// Module
module Helpers {
    // Class
    export class HasCallbacks {
        constructor () {
            var _this = this, _constructor = (<any>this).constructor;
            if (!_constructor.__cb__) {
                _constructor.__cb__ = {};
                for (var m in this) {
                    var fn = this[m];
                    if (typeof fn === 'function' && m.indexOf('cb_') == 0) {
                        _constructor.__cb__[m] = fn;
                    }
                }
            }
            for (var m in _constructor.__cb__) {
                (function (m, fn) {
                    _this[m] = function () {
                        return fn.apply(_this, Array.prototype.slice.call(arguments));
                    };
                })(m, _constructor.__cb__[m]);
            }
        }
    }

    //export class Set {
    //    private _array = [];
    //    push(newValue){
    //        if(!this._array.
    //    }
    //}

    export class NotImplementedError implements Error {
        name = "NotImplementedError";
        constructor (public message = "Not Implemented") {

        }
    }


}
