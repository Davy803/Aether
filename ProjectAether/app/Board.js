var ProjectAether;
(function (ProjectAether) {
    var Board = (function () {
        function Board(width, height, player1, player2) {
            this.width = width;
            this.height = height;
            var _this = this;
            this._spaceLookup = {
            };
            var col;
            var row;
            this.spaces = [];
            var spaceIndex = 0;
            var totalSpace = width * height;
            var newSpace;
            for(row = 0; row < height; row++) {
                for(col = 0; col < width; col++) {
                    var x = Math.floor(col + row / 2);
                    var y = -row;
                    newSpace = new ProjectAether.Space(y, x, spaceIndex < totalSpace / 2 ? player1 : player2);
                    this.spaces.push(newSpace);
                    this._spaceLookup["coord:" + x + y] = newSpace;
                    spaceIndex++;
                }
            }
            this.rows = ko.computed(function () {
                return _.map(_.range(_this.height), function (i) {
                    return _this._getRow(i);
                });
            });
        }
        Board.prototype._getRow = function (row) {
            var nodes = [];
            var start = row * this.width;
            var end = row * this.width + this.width;
            var i;
            for(i = start; i < end; i++) {
                nodes.push(this.spaces[i]);
            }
            return nodes;
        };
        Board.prototype.getDistance = function (source, target, flying, max) {
            if (typeof flying === "undefined") { flying = false; }
            if (typeof max === "undefined") { max = Math.max(this.height, this.width); }
            if(flying) {
                var dx = Math.abs(target.x - source.x);
                var dy = Math.abs(target.y - source.y);
                var dz = Math.abs(target.z() - source.z());
                return Math.max(dx, dy, dz);
            }
            var n = 1;
            while(n <= max) {
                if(this.findEmptySquaresWithinXSteps(source, n).contains(target)) {
                    return n;
                }
                n = n + 1;
            }
            return null;
        };
        Board.prototype.findEmptySquaresWithinXSteps = function (space, x, flying) {
            if (typeof flying === "undefined") { flying = false; }
            var _this = this;
            if(flying) {
                var hashSet = new HashSet();
                hashSet.addAll(_.filter(this.spaces, function (s) {
                    return s.isEmpty() && x >= _this.getDistance(space, s, true);
                }));
                return hashSet;
            }
            var results = this._recursiveFindEmptySquaresWithinXSteps(space, x);
            results.remove(space);
            return results;
        };
        Board.prototype._recursiveFindEmptySquaresWithinXSteps = function (space, x, current_set) {
            if (typeof current_set === "undefined") { current_set = null; }
            var _this = this;
            if(current_set === null) {
                current_set = new HashSet();
            } else {
                current_set.add(space);
            }
            if(x > 0) {
                _.each(this._getEmptyNeighbors(space), function (neighbor) {
                    _this._recursiveFindEmptySquaresWithinXSteps(neighbor, x - 1, current_set);
                });
            }
            return current_set;
        };
        Board.prototype.spacesAreAdjacent = function (space1, space2) {
            return _.include(this._getNeighbors(space1), space2);
        };
        Board.prototype._getNeighbors = function (space, condition) {
            if (typeof condition === "undefined") { condition = function (space) {
                return true;
            }; }
            var spaces = [
                this._getSpace(space.x + 0, space.y + 1), 
                this._getSpace(space.x + 1, space.y + 0), 
                this._getSpace(space.x + 1, space.y - 1), 
                this._getSpace(space.x + 0, space.y - 1), 
                this._getSpace(space.x - 1, space.y + 0), 
                this._getSpace(space.x - 1, space.y + 1)
            ];
            return _.filter(_.compact(spaces), condition);
        };
        Board.prototype._getEmptyNeighbors = function (node) {
            return this._getNeighbors(node, function (space) {
                return space.isEmpty();
            });
        };
        Board.prototype._getSpace = function (x, y) {
            return this._spaceLookup["coord:" + x + y];
        };
        return Board;
    })();
    ProjectAether.Board = Board;    
})(ProjectAether || (ProjectAether = {}));
//@ sourceMappingURL=Board.js.map
