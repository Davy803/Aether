// Module
module ProjectAether {
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

    export class NotImplementedError implements Error {
        name = "NotImplementedError";
        constructor (public message = "Not Implemented") {

        }
    }
}
var classesWrittenByBindingKey = '__ko__classValue';
ko.bindingHandlers['class'] = {
    'update': function (element: HTMLElement, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        value = String(value || ''); // Make sure we don't try to store or set a non-string value
        ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
        element[classesWrittenByBindingKey] = value;
        ko.utils.toggleDomNodeCssClass(element, value, true);
    }
};

ko.bindingHandlers['stat'] = {
    'update': function (element: HTMLElement, valueAccessor) {
        var value =<ProjectAether.Stat>ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers['text'].update(element, () =>value.current);
        var cssObj = { 'increased': value.increased, 'decreased': value.decreased };
        ko.bindingHandlers['css'].update(element, () => cssObj);
        var attrObj = { 'title': value.initial };
        ko.bindingHandlers['attr'].update(element, () => attrObj);

    }
};
