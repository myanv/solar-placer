// @ https://github.com/myanv/solar-placement
// Adapted from my cellular automata project: @ https://github.com/myanv/cellular-minimata

// Get the start button and define the canvas
const placementButton = document.getElementById("get-placement");

class SolarPlacer {
    constructor(containerWidth, containerHeight, panelWidth, panelHeight, obstacles) {
      this.containerWidth = containerWidth;
      this.containerHeight = containerHeight;
      this.panelWidth = panelWidth;
      this.panelHeight = panelHeight;
      this.obstacles = obstacles;
      
      this.cols = Math.floor(containerWidth / panelWidth);
      this.rows = Math.floor(containerHeight / panelHeight);
      this.grid = this.createGrid();
    }

    /*
     * Create a grid with the desired dimensions and fill it with zeros.
     * 0 - blank slot, 1 - obstacle slot, 2 - filled solar panel slot
    */
    createGrid() {
      let grid = new Array(this.rows);
      for (let i = 0; i < this.rows; i++) {
        grid[i] = new Array(this.cols);
        for (let j = 0; j < this.cols; j++) {
          grid[i][j] = 0;
        }
      }
      return grid;

    }
  
    markObstacles() {
      this.obstacles.forEach(obstacle => {
        const startRow = Math.floor(obstacle.y / this.panelHeight);
        const endRow = Math.ceil((obstacle.y + obstacle.height) / this.panelHeight);
        const startCol = Math.floor(obstacle.x / this.panelWidth);
        const endCol = Math.ceil((obstacle.x + obstacle.width) / this.panelWidth);
  
        for (let row = startRow; row < endRow; row++) {
          for (let col = startCol; col < endCol; col++) {
            if (row < this.rows && col < this.cols) {
              this.grid[row][col] = 1;
            }
          }
        }
      });
    }
  
    markSolarPanels() {
      const solarPanels = [];
  
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.grid[row][col] == 0) {
            solarPanels.push({
              x: col * this.panelWidth,
              y: row * this.panelHeight,
              width: this.panelWidth,
              height: this.panelHeight
            });
            this.grid[row][col] = 2;
          }
        }
      }
  
      return solarPanels;
    }
  
    run() {
      this.markObstacles();
      return this.markSolarPanels();
    }
}

/* Default parameter values */
let containerWidth = 800;
let containerHeight = 600;
let panelWidth = 150;
let panelHeight = 50;
let obstacles = [
  { x: 100, y: 100, width: 20, height: 150 },
  { x: 500, y: 300, width: 150, height: 20 }
];

let placer = new SolarPlacer(containerWidth, containerHeight, panelWidth, panelHeight, obstacles);
let solarPanels = placer.run();

// p5.js setup function, defining the default canvas and grid
async function setup() {    
    createCanvas(containerWidth, containerHeight);
    const canvas = document.getElementById("defaultCanvas0");
    background(235);
    draw();
}


// Function to create a new blank grid when the new grid button is clicked
placementButton.addEventListener("click", async () => {
    background(235);
    containerHeight = document.getElementById("container-height").valueAsNumber;
    containerWidth = document.getElementById("container-width").valueAsNumber;
    panelWidth = document.getElementById("panel-width").valueAsNumber;
    panelHeight = document.getElementById("panel-height").valueAsNumber;

    resizeCanvas(containerHeight, containerWidth);
    placer = new SolarPlacer(containerWidth, containerHeight, panelWidth, panelHeight, obstacles);
    solarPanels = placer.run();
    draw();
})

function draw() {
    background(235);
    for (let i = 0; i < placer.rows; i++) {
        for (let j = 0; j < placer.cols; j++) {
            if (placer.grid[i][j] == 2) {
                let y = i * placer.panelHeight;
                let x = j * placer.panelWidth;
                fill(0);
                stroke(255);
                rect(x, y, placer.panelWidth, placer.panelHeight);
            }
        }
    }
}
