var ProjectAether;
(function (ProjectAether) {
    (function (Tests) {
        window.onload = function () {
            var tests = new tsUnit.Test();
            tests.addTestClass(new Tests.GameTests(), "Game Tests");
            tests.addTestClass(new Tests.PlayerTests(), "Player Tests");
            tests.addTestClass(new Tests.MainPhaseTests(), "Main Phase Tests");
            tests.addTestClass(new Tests.DeckTests(), "Deck Tests");
            tests.showResults(document.getElementById('results'), tests.run());
        };
        var TestClassBase = (function () {
            function TestClassBase() {
                this.assert = new tsUnit.TestContext();
            }
            return TestClassBase;
        })();
        Tests.TestClassBase = TestClassBase;        
    })(ProjectAether.Tests || (ProjectAether.Tests = {}));
    var Tests = ProjectAether.Tests;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=main.js.map
