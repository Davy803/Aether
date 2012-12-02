var ProjectAether;
(function (ProjectAether) {
    (function (Decks) {
        function getCards(type, count, owner) {
            return _.map(_.range(40), function (i) {
                return new type(owner);
            });
        }
        function centaurDeck(owner) {
            return new ProjectAether.Deck(getCards(ProjectAether.Cards.Centaur, 40, owner));
        }
        Decks.centaurDeck = centaurDeck;
        function faerieDeck(owner) {
            return new ProjectAether.Deck(getCards(ProjectAether.Cards.Faerie, 40, owner));
        }
        Decks.faerieDeck = faerieDeck;
        function unicornDeck(owner) {
            return new ProjectAether.Deck(getCards(ProjectAether.Cards.Unicorn, 40, owner));
        }
        Decks.unicornDeck = unicornDeck;
    })(ProjectAether.Decks || (ProjectAether.Decks = {}));
    var Decks = ProjectAether.Decks;
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=decks.js.map
