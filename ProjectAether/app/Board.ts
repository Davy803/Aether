/// <reference path="../main.ts" />
/// <reference path="../libs/hash/jshashset.d.ts" />
module ProjectAether {
    export class Board {
        /** Spaces Arranged as 
            [0,1,2]
            [3,4,5]
            [7,8,9]
        */
        spaces: Space[];
        rows: KnockoutComputedArraySpace;

        private _spaceLookup = {};
        // Constructor
        constructor (public width: number, public height: number, player1: Player, player2: Player) {
            var col: number;
            var row: number;

            this.spaces = [];
            var spaceIndex = 0;
            var totalSpace = width * height;
            var newSpace: Space;
            for (row = 0; row < height; row++) {
                for (col = 0; col < width; col++) {
                    //Using slanted coordinate system for hex grid distance
                    //See explaination at  http://keekerdc.com/2011/03/hexagon-grids-coordinate-systems-and-distance-calculations/ 
                    var x = Math.floor(col + row / 2);
                    var y = -row;
                    newSpace = new Space(y, x, spaceIndex < totalSpace / 2 ? player1 : player2);
                    this.spaces.push(newSpace);
                    this._spaceLookup["coord:" + x + y] = newSpace;
                    spaceIndex++;
                }
            }
            this.rows = <KnockoutComputedArraySpace>ko.computed((): Space[]=>{
                return _.map(_.range(this.height), i=>{
                    return this._getRow(i);
                });
            });
        }

        private _getRow(row: number) {
            var nodes: Space[] = [];
            var start = row * this.width;
            var end = row * this.width + this.width;
            var i: number;
            for (i = start; i < end; i++) {
                nodes.push(this.spaces[i]);
            }
            return nodes;
        }

        getDistance(creature: Creature, target: Space) {
            var n = 1;
            while (n <= creature.movement.current()) {
                if (this.findEmptySquaresWithinXSteps(creature.location(), n).contains(target)) {
                    return n
                }
                n = n + 1;
            }
            return null;
        }
        findEmptySquaresWithinXSteps(space: Space, x: number): IHashSet {
            var results = this._recursiveFindEmptySquaresWithinXSteps(space, x);
            results.remove(space);
            return results;
        }
        private _recursiveFindEmptySquaresWithinXSteps(space: Space, x: number, current_set: IHashSet = null) : IHashSet {
            if (current_set === null) {
                current_set = new HashSet();
            }
            else {
                current_set.add(space);
            }
            if (x > 0) {
                _.each(this._getEmptyNeighbors(space), (neighbor) =>{
                    this._recursiveFindEmptySquaresWithinXSteps(neighbor, x - 1, current_set);
                });
            }
            return current_set;
        }
        spacesAreAdjacent(space1: Space, space2: Space){
            return _.include(this._getNeighbors(space1), space2);
        }
        private _getNeighbors(space: Space, condition = (space: Space) => true) {
            var spaces = [
                    this._getSpace(space.x + 0, space.y + 1),
                    this._getSpace(space.x + 1, space.y + 0),
                    this._getSpace(space.x + 1, space.y - 1),
                    this._getSpace(space.x + 0, space.y - 1),
                    this._getSpace(space.x - 1, space.y + 0),
                    this._getSpace(space.x - 1, space.y + 1)
                ]
            return _.filter(_.compact(spaces), condition);
        }

        private _getEmptyNeighbors(node) {
            return this._getNeighbors(node, (space: Space) => space.isEmpty());
        }

        private _getSpace(x: number, y: number) {
            return this._spaceLookup["coord:" + x + y];
        }
    }
}