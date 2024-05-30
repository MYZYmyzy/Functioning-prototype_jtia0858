let gridSize = 50;
let canvasSize = 800;

let yellow = '#ffd800'
let red = '#A2362A'
let gray = '#DADBD5'
let blue = '#4B66C1'

function setup() {
  createCanvas(canvasSize, canvasSize);
  canvasSize = min(windowWidth, windowHeight);
  noLoop(); // Ensure draw() is called only once
}

function draw() {
  background(255);
  drawGrid();
  drawLines();
  drawRectangles(); 
  drawSingleGrids(); 
}

//  draw grid lines
function drawGrid() {
  stroke(0);
  strokeWeight(0);
  for (let i = 0; i <= gridSize; i++) {
    let pos = i * (canvasSize / gridSize);
    line(pos, 0, pos, canvasSize);
    line(0, pos, canvasSize, pos);
  }
}

// Get coordinates based on line segments
function getIntersectingGrids(x1, y1, x2, y2) {
  let intersectingGrids = [];
  let x1Idx = x1;
  let y1Idx = y1;
  let x2Idx = x2;
  let y2Idx = y2;

  let dx = Math.abs(x2Idx - x1Idx);
  let dy = Math.abs(y2Idx - y1Idx);
  let sx = x1Idx < x2Idx ? 1 : -1;
  let sy = y1Idx < y2Idx ? 1 : -1;
  let err = dx - dy;

  while (true) {
    intersectingGrids.push(`${x1Idx},${y1Idx}`);
    if (x1Idx === x2Idx && y1Idx === y2Idx) break;
    let e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x1Idx += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1Idx += sy;
    }
  }

  return intersectingGrids;
}

// Fill in the grid
function fillGrid(x, y, color) {
  fill(color);
  noStroke();
  rect(x * (canvasSize / gridSize), y * (canvasSize / gridSize), canvasSize / gridSize, canvasSize / gridSize);
}

//  Draw line
function drawLine(x1, y1, x2, y2, color) {
  let intersectingGrids = getIntersectingGrids(x1, y1, x2, y2);
  for (let coord of intersectingGrids) {
    let [x, y] = coord.split(',').map(Number);
    fillGrid(x, y, color);
  }

  // Auxiliary line
  // stroke(0);
  // strokeWeight(2);
  // line(x1, y1, x2, y2);
}

function drawTestLine() {
  let startX = 0;
  let startY = 0;
  let endX = 400;
  let endY = 600;

  drawLine(startX, startY, endX, endY, yellow);
}

function drawLines(){
  // whole lines
  let x1s = [3,6,11,26,42,48]
  for (let i = 0; i < x1s.length; i++) {
    drawLine(x1s[i], 0, x1s[i], 50, yellow);
  }
  let y1s = [1,8,17,21,27,30,42,47,]
  for (let i = 0; i < y1s.length; i++) {
    drawLine(0, y1s[i], 50, y1s[i], yellow);
  }
  // vertical partial lines
  // let vps = [1,28,31,44,46];
  let vps = [
    [1,0,1,y1s[2]], 
    [28,0,28,y1s[2]], 
    [28,y1s[3],28,49], 
    [31, y1s[3], 31, y1s[5]],
    [44, y1s[2], 44, 0],
    [46, y1s[3], 46, y1s[1]],
    [46,0,46,4],
    [46,y1s[5],46,40]
  ];
  for (let vp of vps) {
    drawLine(vp[0], vp[1], vp[2], vp[3],yellow);
  }

  let hps = [
    [0,44,3,44],
    [0,38,3,38],
    [0,33,3,33],
    [3,35,x1s[3]+2,35],
    [42,40,48,40]
  ];
  for (let hp of hps) {
    drawLine(hp[0], hp[1], hp[2], hp[3],yellow);
  }
}


function drawRectangle(x1, y1, x2, y2, color) {
  fill(color);
  noStroke();
  let width = (x2 - x1) * (canvasSize / gridSize);
  let height = (y2 - y1) * (canvasSize / gridSize);
  rect(x1 * (canvasSize / gridSize), y1 * (canvasSize / gridSize), width, height);
}

function drawRectangles() {
  let rectangles = [
    // [Upper left corner x, upper left corner y, lower right corner x, lower right corner y, color]
    [7, 3, 11, 5, yellow],
    [8, 2, 10, 8, red], 
    [8, 5, 10, 6, gray], 
    [13, 2, 17, 7, red],
    [14, 4, 16, 6, gray],
    [13, 7, 17, 8, gray],
    [45, 5, 48, 7, blue],
    [4, 10, 7, 12, blue],
    [7, 13, 11, 16, yellow],
    [8, 14, 10, 15, gray],
    [32, 9, 37, 17, blue],
    [32, 11, 37, 15, red],
    [33, 12, 36, 14, yellow],
    [44, 10, 47, 13, red],
    [8, 17, 10, 21, yellow],
    [8.5, 19, 9.5, 20, gray],
    [19, 17, 23, 27, yellow],
    [7, 24, 11, 27, red],
    [13.5, 22, 17, 23, yellow],
    [13.5, 23, 17, 27, blue],
    [14, 24.3, 16.4, 26, yellow],
    [19, 22.8, 23, 25.7, gray],
    [33.5, 22, 38, 28.7, red],
    [34.5, 23.5, 37.2, 25.8, gray],
    [33.5, 28.7, 38, 30, gray],
    [43, 23, 48, 26, yellow],
    [45, 23, 46, 26, red],
    [4, 32, 7, 35, blue],
    [43, 32, 46, 35, blue],
    [43, 35, 46, 37, yellow],
    [43, 37, 46, 40, red],
    [7, 38, 11, 42, yellow],
    [8.5, 39, 10, 40.2, gray],
    [21, 48, 25, 49.8, red],
  ];
    for (let rect of rectangles) {
      drawRectangle(rect[0], rect[1], rect[2], rect[3], rect[4]);
    }
}

function drawSingleGrids() {
  //Single grid coloring - 0
  fillGrid(3,0,red);
  fillGrid(11,0,red);
  fillGrid(26,0,red);
  fillGrid(44,0,red);
  fillGrid(48,0,red);
  //Single grid coloring - 1
  fillGrid(1,1,blue);
  fillGrid(7.5,1,blue);
  fillGrid(10,1,gray);
  fillGrid(16.5,1,gray);
  fillGrid(25,1,gray);
  fillGrid(27,1,gray);
  fillGrid(29,1,gray);
  fillGrid(35,1,gray);
  fillGrid(36,1,gray);
  fillGrid(41,1,gray);
  fillGrid(42,1,blue);
  fillGrid(44,1,gray);
  fillGrid(46,1,blue);
  fillGrid(47,1,gray);
  fillGrid(49,1,gray);
  //Single grid coloring - 2
  fillGrid(1,2,gray);
  fillGrid(3,2,gray);
  fillGrid(11,2,gray);
  fillGrid(26,2.5,gray);
  fillGrid(28,2,gray);
  fillGrid(42,2,gray);
  fillGrid(44,2,blue);
  fillGrid(46,2,gray);
  fillGrid(48,2,red);
  //Single grid coloring - 3
  fillGrid(6,3,gray);
  fillGrid(44,3,gray);
  fillGrid(48,3,gray);
  fillGrid(28,3,red);
  //Single grid coloring - 4
  fillGrid(6,4,gray);
  fillGrid(6,4,gray);
  fillGrid(46,4,gray);
  fillGrid(44,4.8,red);
  fillGrid(48,4.8,red);
  //Single grid coloring - 5
  fillGrid(1,5,blue);
  fillGrid(3,5,red);
  fillGrid(6,5,blue);
  fillGrid(11,5,blue);
  fillGrid(26,5,blue);
  fillGrid(28,5,gray);
  //Single grid coloring - 6
  fillGrid(26,6,red);
  fillGrid(42,6,blue);
  //Single grid coloring - 7
  fillGrid(3,7,gray);
  fillGrid(26,7,gray);
  fillGrid(28,7,gray);
  fillGrid(44,7,gray);
  fillGrid(48,7,gray);
  //Single grid coloring - 8
  fillGrid(1,8,red);
  fillGrid(6,8,blue);
  fillGrid(8,8,gray);
  fillGrid(9,8,gray);
  fillGrid(10,8,red);
  fillGrid(12,8,gray);
  fillGrid(14.5,8,blue);
  fillGrid(18,8,gray);
  fillGrid(25,8,gray);
  fillGrid(26,8,blue);
  fillGrid(28,8,red);
  fillGrid(29,8,gray);
  fillGrid(36.5,8,gray);
  fillGrid(37,8,gray);
  fillGrid(41,8,gray);
  fillGrid(42,8,blue);
  fillGrid(43,8,gray);
  fillGrid(45,8,red);
  fillGrid(47,8,gray);
  fillGrid(48,8,blue);
  //Single grid coloring - 9
  fillGrid(3,9,gray);
  fillGrid(11,9,gray);
  fillGrid(28,9,gray);
  fillGrid(44,9,gray);
  fillGrid(46,9,gray);
  fillGrid(48,9,gray);
  //Single grid coloring - 11
  fillGrid(1,11,blue);
  fillGrid(11,11,blue);
  fillGrid(26,10.5,red);
  fillGrid(26,11,red);
  fillGrid(28,10.8,red);
  fillGrid(42,11,red);
  fillGrid(48,11,blue);
  //Single grid coloring - 12
  fillGrid(3,12,gray);
  fillGrid(26,12,gray);
  fillGrid(28,12,gray);
  fillGrid(48,12,gray);
  //Single grid coloring - 13
  fillGrid(1,13,red);
  fillGrid(6,13,red);
  fillGrid(11,13,red);
  fillGrid(42,13,gray);
  //Single grid coloring - 14
  fillGrid(6,14,gray);
  fillGrid(11,14.5,gray);
  //Single grid coloring - 15
  fillGrid(6,15,gray);
  fillGrid(26,15,blue);
  fillGrid(28,15,gray);
  fillGrid(42,15,blue);
  fillGrid(44,15,blue);
  fillGrid(46,15,gray);
  fillGrid(48,15,red);
  //Single grid coloring - 16
  fillGrid(1,16,gray);
  fillGrid(6,16,blue);
  //Single grid coloring - 17
  fillGrid(1,17,red);
  fillGrid(3,17,blue);
  fillGrid(6,17,gray);
  fillGrid(7,17,red);
  fillGrid(10,17,gray);
  fillGrid(11,17,blue);
  fillGrid(13,17,gray);
  fillGrid(15.5,17,blue);
  fillGrid(16,17,blue);
  fillGrid(17.5,17,red);
  fillGrid(18,17,red);
  fillGrid(23,17,blue);
  fillGrid(26,17,red);
  fillGrid(28,17,blue);
  fillGrid(31.5,17,red);
  fillGrid(32,17,red);
  fillGrid(36.8,17,red);
  fillGrid(37,17,red);
  fillGrid(42,17,blue);
  fillGrid(44,17,red);
  fillGrid(46,17,gray);
  fillGrid(47,17,blue);
  fillGrid(48,17,gray);
  //Single grid coloring - (18~20)
  fillGrid(6,18,blue);
  fillGrid(11,18,gray);
  fillGrid(26,18,gray);
  fillGrid(26,18.5,blue);
  fillGrid(6,19,gray);
  fillGrid(46,19,gray);
  fillGrid(6,20,gray);
  fillGrid(42,20,gray);
  fillGrid(48,20,gray);
  //Single grid coloring - 21
  fillGrid(1,21,red);
  fillGrid(2,21,gray);
  fillGrid(3,21,blue);
  fillGrid(6,21,red);
  fillGrid(7,21,gray);
  fillGrid(10,21,gray);
  fillGrid(11,21,blue);
  fillGrid(13.5,21,red);
  fillGrid(14,21,red);
  fillGrid(15,21,gray);
  fillGrid(16,21,gray);
  fillGrid(18,21,red);
  fillGrid(19,21,gray);fillGrid(20,21,gray);fillGrid(21,21,gray);fillGrid(22,21,gray);
  fillGrid(23,21,blue);
  fillGrid(26,21,gray);
  fillGrid(28,21,gray);
  fillGrid(30,21,red);
  fillGrid(31,21,gray);
  fillGrid(33,21,gray);fillGrid(33.5,21,gray);
  fillGrid(37.5,21,blue);fillGrid(38,21,blue);
  fillGrid(42,21,red);
  fillGrid(45,21,gray);
  fillGrid(46,21,red);
  fillGrid(48,21,red);
  fillGrid(49,21,gray);
  //Single grid coloring - (22~26)
  fillGrid(11,22,gray);
  fillGrid(42,23.5,blue);
  fillGrid(48,23.5,blue);
  fillGrid(3,24.3,red);
  fillGrid(11,24,gray);
  fillGrid(26,24,red);
  fillGrid(28,24,blue);
  fillGrid(31,24.3,gray);
  fillGrid(48,24.5,gray);
  fillGrid(3,26,gray);
  fillGrid(11,26,gray);
  fillGrid(28,26,red);
  //Single grid coloring - 27
  fillGrid(2,27,gray);
  fillGrid(3,27,blue);
  fillGrid(6,27,blue);
  fillGrid(11,27,blue);
  fillGrid(13,27,gray);fillGrid(13.5,27,gray);
  fillGrid(16.5,27,red);
  fillGrid(18.5,27,red);
  fillGrid(19.5,27,gray);fillGrid(20.5,27,gray);fillGrid(21.5,27,gray);
  fillGrid(22.5,27,red);
  fillGrid(26,27,gray);
  fillGrid(28,27,gray);
  fillGrid(31,27,red);
  fillGrid(33.5,27,blue);
  fillGrid(34.5,27,gray);fillGrid(35.5,27,gray);fillGrid(36.3,27,gray);
  fillGrid(37.3,27,blue);fillGrid(38,27,blue);
  fillGrid(42,27,red);
  fillGrid(46,27,blue);
  fillGrid(47,27,gray);
  fillGrid(48,27,red);
  //Single grid coloring - (28~29)
  fillGrid(26,29,red);
  fillGrid(31,29,red);
  fillGrid(42,29,gray);
  fillGrid(48,29,gray);
  //Single grid coloring - 30
  fillGrid(2.3,30,gray);
  fillGrid(3,30,red);
  fillGrid(6,30,blue);
  fillGrid(9,30,gray);
  fillGrid(11,30,blue);
  fillGrid(13.5,30,gray);fillGrid(14,30,gray);
  fillGrid(17,30,blue);
  fillGrid(19,30,red);
  fillGrid(23,30,blue);
  fillGrid(26,30,gray);
  fillGrid(28,30,gray);
  fillGrid(31,30,gray);
  fillGrid(34,30,blue);
  fillGrid(37.5,30,blue);
  fillGrid(42,30,blue);
  fillGrid(46,30,red);
  fillGrid(47,30,gray);
  fillGrid(49,30,red);
  //Single grid coloring - (31~41)
  fillGrid(26,31,red);
  fillGrid(28,31,blue);
  fillGrid(42,31,gray);
  fillGrid(46,31,gray);
  fillGrid(48,31,gray);
  fillGrid(3,32,gray);
  fillGrid(11,32,gray);
  fillGrid(26,32,gray);
  fillGrid(1,33,blue);
  fillGrid(3,33,red);
  fillGrid(28,33,gray);
  fillGrid(3,34,gray);
  fillGrid(42,34,red);
  fillGrid(46,34,gray);
  fillGrid(48,34,red);
  fillGrid(3,35,red);
  fillGrid(6,35,red);
  fillGrid(9,35,gray);
  fillGrid(11,35,blue);
  fillGrid(14,35,gray);
  fillGrid(17.5,35,blue);
  fillGrid(19.5,35,red);
  fillGrid(23.5,35,blue);
  fillGrid(26,35,gray);
  fillGrid(27,35,red);
  fillGrid(28,35,gray);
  fillGrid(42,35,gray);
  fillGrid(42,36,blue);
  fillGrid(46,35,gray);
  fillGrid(46,36,blue);
  fillGrid(48,35,gray);
  fillGrid(48,36,blue);
  fillGrid(1.5,38,blue);
  fillGrid(3,38.2,red);
  fillGrid(3,39.2,gray);
  fillGrid(6,38,blue);
  fillGrid(11,38,red);
  fillGrid(26,38,blue);
  fillGrid(28,38,red);
  fillGrid(6,39,gray);
  fillGrid(6,39.7,red);
  fillGrid(11,39,gray);
  fillGrid(28,39,gray);
  fillGrid(42,40,blue);
  fillGrid(46,40,gray);
  fillGrid(48,40,red);
  fillGrid(11,41,gray);
  fillGrid(26,41,red);
 //Single grid coloring - 42
  fillGrid(1,42,gray);
  fillGrid(3,42,blue);
  fillGrid(6,42,blue);
  fillGrid(9,42,red);
  fillGrid(10,42,gray);
  fillGrid(11,42,blue);
  fillGrid(15,42,gray);
  fillGrid(18,42,blue);
  fillGrid(20,42,red);
  fillGrid(22,42,blue);
  fillGrid(24,42,red);
  fillGrid(26,42,blue);
  fillGrid(28,42,red);
  fillGrid(30,42,blue);
  fillGrid(32,42,red);
  fillGrid(34,42,blue);
  fillGrid(38,42,gray);
  fillGrid(42,42,red);
  fillGrid(45,42,blue);
  fillGrid(48,42,red);
  //Single grid coloring - (43~46)
  fillGrid(3,43,gray);
  fillGrid(6,43,gray);
  fillGrid(11,43,gray);
  fillGrid(26,43,gray);
  fillGrid(28,43,gray);
  fillGrid(2,44,red);
  fillGrid(6,44,blue);
  fillGrid(11,44,red);
  fillGrid(42,44,gray);
  fillGrid(48,44,gray);
  fillGrid(3,46,gray);
  fillGrid(6,46,gray);
  fillGrid(11,46,gray);
  fillGrid(26,46,red);
  fillGrid(28,46,blue);
  //Single grid coloring - 47
  fillGrid(2,47,gray);
  fillGrid(3,47,red);
  fillGrid(6,47,blue);
  fillGrid(9,47,red);
  fillGrid(11,47,blue);
  fillGrid(14,47,gray);
  fillGrid(16,47,gray);
  fillGrid(18,47,blue);
  fillGrid(20,47,blue);
  fillGrid(21,47,red);fillGrid(22,47,red);fillGrid(23,47,red);fillGrid(24,47,red);
  fillGrid(26,47,gray);
  fillGrid(28,47,gray);
  fillGrid(30,47,red);
  fillGrid(32,47,blue);
  fillGrid(34,47,blue);
  fillGrid(37,47,gray);
  fillGrid(42,47,blue);
  fillGrid(45,47,red);
  fillGrid(48,47,red);
  //Single grid coloring - (48~49)
  fillGrid(42,48,gray);
  
}

function draw() {
  background(255);
  drawGrid();
  drawLines();
  drawRectangles();
  drawSingleGrids();
}  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSize = min(windowWidth, windowHeight);
  draw(); 
}
