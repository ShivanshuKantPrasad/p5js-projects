function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

let rows = 8;
let cols = 10;
let grid;

requestAnimationFrame(animate);

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);
  grid = new Grid(8, 10);
}

function draw() {
  background(0);
  grid.draw();
  ellipse(mouseX, mouseY, 20);
}

function mousePressed() {
  console.log("OMG! You clicked");
  grid.mousePressed(mouseX, mouseY);
}
