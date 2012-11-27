var ProjectAether;
(function (ProjectAether) {
    var Deck = (function () {
        function Deck(cards) {
            this.cards = cards;
        }
        Deck.prototype.drawCard = function () {
            return this.cards.pop();
        };
        return Deck;
    })();
    ProjectAether.Deck = Deck;    
})(ProjectAether || (ProjectAether = {}));
