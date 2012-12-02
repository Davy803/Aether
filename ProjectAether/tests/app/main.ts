/// <reference path="../../main.ts" />
/// <reference path="../../libs/tsUnit.ts" />
/// <reference path="GameTests.ts" />
/// <reference path="PlayerTests.ts" />
/// <reference path="Actions/MainPhaseTests.ts" />
/// <reference path="Decks/DeckTests.ts" />

module ProjectAether.Tests {
    window.onload = () => {
        var tests = new tsUnit.Test();
        tests.addTestClass(new GameTests(), "Game Tests");
        tests.addTestClass(new PlayerTests(), "Player Tests");
        tests.addTestClass(new MainPhaseTests(), "Main Phase Tests");
        tests.addTestClass(new DeckTests(), "Deck Tests");
        tests.showResults(document.getElementById('results'), tests.run());
    }

    export class TestClassBase implements tsUnit.ITestClass {
        assert = new tsUnit.TestContext();
    }
}