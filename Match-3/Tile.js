class Tile {
  constructor(x, y, size) {
    let tileTypes = [
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 0, 255),
      color(255, 255, 255),
      color(255, 255, 0)
    ];

    this.size = size;
    this.pos = { x, y };
    this.color = random(tileTypes);
  }

  draw() {
    fill(this.color);
    stroke(this.color);
    let centerX = this.pos.x + this.size / 2;
    let centerY = this.pos.y + this.size / 2;
    ellipse(centerX, centerY, this.size / 2, this.size / 2);
  }
}
