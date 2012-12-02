var ProjectAether;
(function (ProjectAether) {
    ProjectAether.TargetTypes = {
        Card: "Card",
        Creature: "Creature",
        Player: "Player",
        Space: "Space",
        Button: "EndTurnButton"
    };
    ProjectAether.TargetActions = {
        None: "",
        Move: "target move",
        Attack: "target attack",
        Button: "target button",
        Place: "target place",
        Select: "target select"
    };
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Target.js.map
