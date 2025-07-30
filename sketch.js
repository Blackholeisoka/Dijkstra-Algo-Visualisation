let grid = [];
let size = 50; 
let columns;
let rows;

let start_j_random, end_j_random;
let noVisited = [];

let wallColor = [255];
let startColor = [0, 255, 0];
let endColor = [255, 0, 0];
let visitedColor = [0, 0, 255];

let pathColor = [255, 255, 0];

function setup() {
  createCanvas(500, 500);
  columns = Math.floor(width / size);
  rows = Math.floor(height / size);
  
  start_j_random = Math.floor(Math.random() * rows);
  end_j_random = Math.floor(Math.random() * rows);
  
  for(let i = 0; i < columns; i++){
    grid[i] = [];
    for(let j = 0; j < rows; j++){
      grid[i][j] = {
        i: i,
        j: j,
        wall: false,
        visited: false,
        distance: Infinity,
        previous: null
      };
    }
  }
  
  let counterWall = 10;
  for(let i = 0; i < counterWall; i++){
    let random_wall_col = Math.floor(Math.random() * (columns - 2)) + 1;
    let random_wall_row = Math.floor(Math.random() * rows);
    grid[random_wall_col][random_wall_row].wall = true;
  }
  
  grid[0][start_j_random].distance = 0;
}

function draw() {
  background(0);
  noVisited = [];
  
  for(let i = 0; i < columns; i++){
    for(let j = 0; j < rows; j++){
      if(!grid[i][j].wall && !grid[i][j].visited){
        noVisited.push(grid[i][j]);
      }
    }
  }
  
  let minDistance = Infinity;
  let current = null;
  
  noVisited.forEach((cell) =>{
    if(cell.distance < minDistance){
      minDistance = cell.distance;
      current = cell;
    }
  });
  
  if(current !== null){
    current.visited = true;
    let i = current.i;
    let j = current.j;
    let neighbors = [];
    
    if(i > 0) neighbors.push(grid[i - 1][j]);
    if(i < columns - 1) neighbors.push(grid[i + 1][j]);
    if(j > 0) neighbors.push(grid[i][j - 1]);
    if(j < rows - 1) neighbors.push(grid[i][j + 1]);
    
    neighbors.forEach((n) =>{
      if(!n.visited && !n.wall){
        let newDist = current.distance + 1;
        if(newDist < n.distance){
          n.distance = newDist;
          n.previous = current;
        }
      }
    });
  }
  
  let pathCells = [];
  let temp = grid[columns - 1][end_j_random];
  while(temp.previous){
    pathCells.push(temp);
    temp = temp.previous;
  }
  
  for(let i = 0; i < columns; i++){
    for(let j = 0; j < rows; j++){
      let cell = grid[i][j];
      if(pathCells.includes(cell)){
        fill(pathColor);
      } else if(cell.wall){
        fill(wallColor);
      } else if(cell.visited){
        fill(visitedColor);
      } else{
        fill(0);
      }
      stroke(255);
      rect(i * size, j * size, size, size);
    }
  }
  
  fill(startColor);
  rect(0, start_j_random * size, size, size);
  
  fill(endColor);
  rect((columns - 1) * size, end_j_random * size, size, size);
}
