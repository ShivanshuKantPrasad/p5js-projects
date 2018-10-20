let paddingX = 200;
let paddingY = 5;

class Grid {
  constructor(rows, cols) {
    this.tiles = createArray(rows, cols);
    this.rows = rows;
    this.cols = cols;
    this.matches = [];
    var size = floor(min(windowHeight / rows, windowWidth / cols)) - 5;
    paddingX = (windowWidth - cols * size) * 0.5;
    paddingY = (windowHeight - rows * size) * 0.5;

    for (let i = 0; i < rows; i++) {
      var x = map(i, 0, rows, paddingX, windowWidth - paddingX);
      for (let j = 0; j < cols; j++) {
        var y = map(j, 0, cols, paddingY, windowHeight - paddingY);
        this.tiles[i][j] = new Tile(x, y, size);
      }
    }

    this.findMatches();
    this.eliminateMatchedTiles();
    this.moveTilesDown();
  }

  update() {
    // this.state
  }

  findMatches() {
    this.matches = [];
    for (let i = 0; i < this.tiles.length - 2; i++) {
      for (let j = 0; j < this.tiles[0].length; j++) {
        if (
          areColorSame(this.tiles[i][j].color, this.tiles[i + 1][j].color) &&
          areColorSame(this.tiles[i + 1][j].color, this.tiles[i + 2][j].color)
        ) {
          this.matches.push(
            {
              i: i,
              j: j
            },
            {
              i: i + 1,
              j: j
            },
            {
              i: i + 2,
              j: j
            }
          );
          console.log("horizontal match found at i: " + i + " j: " + j);
        }
      }
    }

    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[0].length - 2; j++) {
        if (
          areColorSame(this.tiles[i][j].color, this.tiles[i][j + 1].color) &&
          areColorSame(this.tiles[i][j + 1].color, this.tiles[i][j + 2].color)
        ) {
          this.matches.push(
            {
              i: i,
              j
            },
            {
              i: i,
              j: j + 1
            },
            {
              i: i,
              j: j + 2
            }
          );
          console.log("Vertical match found at i: " + i + " j: " + j);
        }
      }
    }
  }

  eliminateMatchedTiles() {
    this.matches.forEach(element => {
      this.tiles[element.i][element.j] = null;
    });
  }

  moveTilesDown() {
    console.log(this);
    for (let i = this.rows - 1; i >= 0; i--) {
      for (let j = this.cols - 1; j >= 0; j--) {
        if (this.tiles[i][j] == null) {
          let tileJ = j;
          while (tileJ >= 0 && this.tiles[i][tileJ] == null) tileJ--;
          var x = map(i, 0, rows, paddingX, windowWidth - paddingX);
          var y = map(j, 0, cols, paddingY, windowHeight - paddingY);
          var size = floor(min(windowHeight / rows, windowWidth / cols)) - 5;
          if (tileJ < 0) {
            this.tiles[i][j] = new Tile(x, y, size);
          } else {
            this.tiles[i][j] = this.tiles[i][tileJ];
            new TWEEN.Tween(this.tiles[i][j].pos).to({ x, y }, 500).start();
            this.tiles[i][tileJ] = null;
          }
        }
      }
    }
  }

  mousePressed(mouseX, mouseY) {
    var i = Math.floor(map(mouseX, paddingX, windowWidth - paddingX, 0, rows));
    var j = Math.floor(map(mouseY, paddingY, windowHeight - paddingY, 0, cols));
    if (this.activeTile != null) {
      console.log("Swapping");
      let deli = this.activePos.i - i;
      let delj = this.activePos.j - j;
      if (Math.abs(deli) + Math.abs(delj) == 1) {
        let tempTile = this.tiles[i][j];
        this.tiles[i][j] = this.activeTile;
        this.tiles[this.activePos.i][this.activePos.j] = tempTile;
        new TWEEN.Tween(this.tiles[i][j].pos)
          .to(
            {
              x: tempTile.pos.x,
              y: tempTile.pos.y
            },
            500
          )
          .start();
        new TWEEN.Tween(this.tiles[this.activePos.i][this.activePos.j].pos)
          .to(
            {
              x: this.activeTile.pos.x,
              y: this.activeTile.pos.y
            },
            500
          )
          .start();
      }
      this.activeTile = null;
    } else {
      this.activeTile = this.tiles[i][j];
      this.activePos = { i, j };
    }
    console.log(`You clicked on tile at i: ${i} j: ${j}`);
    this.findMatches();
    this.eliminateMatchedTiles();
    this.moveTilesDown();
  }

  draw() {
    stroke(255);
    //Draw the lines
    for (let i = 0; i <= rows; i++) {
      var x = map(i, 0, rows, paddingX, windowWidth - paddingX);
      line(x, paddingY, x, windowHeight - paddingY);
    }

    //Draw the lines
    for (let i = 0; i <= cols; i++) {
      var y = map(i, 0, cols, paddingY, windowHeight - paddingY);
      line(paddingX, y, windowWidth - paddingX, y);
    }

    //Draw the tiles
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (this.tiles[i][j] == null) continue;
        this.tiles[i][j].draw();
        // text(`${i} ${j}`, this.tiles[i][j].pos.x, this.tiles[i][j].pos.y);
      }
    }
  }
}

function areColorSame(colorA, colorB) {
  return (
    colorA.levels[0] === colorB.levels[0] &&
    colorA.levels[1] === colorB.levels[1] &&
    colorA.levels[2] === colorB.levels[2]
  );
}

function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}
