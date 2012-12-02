var ProjectAether;
(function (ProjectAether) {
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
    ProjectAether.HasCallbacks = HasCallbacks;    
    var NotImplementedError = (function () {
        function NotImplementedError(message) {
            if (typeof message === "undefined") { message = "Not Implemented"; }
            this.message = message;
            this.name = "NotImplementedError";
        }
        return NotImplementedError;
    })();
    ProjectAether.NotImplementedError = NotImplementedError;    
})(ProjectAether || (ProjectAether = {}));
var classesWrittenByBindingKey = '__ko__classValue';
ko.bindingHandlers['class'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        value = String(value || '');
        ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
        element[classesWrittenByBindingKey] = value;
        ko.utils.toggleDomNodeCssClass(element, value, true);
    }
};
ko.bindingHandlers['stat'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers['text'].update(element, function () {
            return value.current;
        });
        var cssObj = {
            'increased': value.increased,
            'decreased': value.decreased
        };
        ko.bindingHandlers['css'].update(element, function () {
            return cssObj;
        });
        var attrObj = {
            'title': value.initial
        };
        ko.bindingHandlers['attr'].update(element, function () {
            return attrObj;
        });
    }
};
//@ sourceMappingURL=Helpers.js.map
