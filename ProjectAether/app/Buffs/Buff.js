var ProjectAether;
(function (ProjectAether) {
    var Buff = (function () {
        function Buff() { }
        Buff.prototype.apply = function (creature) {
            throw Error("Method is abstract");
        };
        return Buff;
    })();
    ProjectAether.Buff = Buff;    
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Buff.js.map
