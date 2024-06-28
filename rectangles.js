// @ https://github.com/myanv/solar-placement
// Adapted from my cellular automata project: @ https://github.com/myanv/cellular-minimata

// Get the start button and define the canvas
const startButton = document.getElementById("start-btn");
const gridButton = document.getElementById("get-grid");
const newButton = document.getElementById("get-blank");

class SolarPlacer {
    constructor(areaWidth, areaHeight, rectWidth, rectHeight, obstacles) {
      this.areaWidth = areaWidth;
      this.areaHeight = areaHeight;
      this.rectWidth = rectWidth;
      this.rectHeight = rectHeight;
      this.obstacles = obstacles;
      
      this.cols = Math.floor(areaWidth / rectWidth);
      this.rows = Math.floor(areaHeight / rectHeight);
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
        const startRow = Math.floor(obstacle.y / this.rectHeight);
        const endRow = Math.ceil((obstacle.y + obstacle.height) / this.rectHeight);
        const startCol = Math.floor(obstacle.x / this.rectWidth);
        const endCol = Math.ceil((obstacle.x + obstacle.width) / this.rectWidth);
  
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
              x: col * this.rectWidth,
              y: row * this.rectHeight,
              width: this.rectWidth,
              height: this.rectHeight
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

// p5.js setup function, defining the default canvas and grid
async function setup() {    
    createCanvas(areaWidth, areaHeight);
    const canvas = document.getElementById("defaultCanvas0");
    background(235);
    draw();
}

// Function to create a new blank grid when the new grid button is clicked
newButton.addEventListener("click", async () => {
    background(235);
    rows = document.getElementById("rows").valueAsNumber;
    columns = document.getElementById("columns").valueAsNumber;
    resolution = document.getElementById("resolution").valueAsNumber;
    const width = columns * resolution;
    const height = rows * resolution;

    resizeCanvas(width, height);
    draw();
})

function draw() {
    background(235);
    for (let i = 0; i < placer.rows; i++) {
        for (let j = 0; j < placer.cols; j++) {
            if (placer.grid[i][j] == 2) {
                let y = i * placer.rectHeight;
                let x = j * placer.rectWidth;
                fill(0);
                stroke(255);
                rect(x, y, placer.rectWidth, placer.rectHeight);
            }
        }
    }
}
