(function() {
  const gridContainer = document.getElementById("grid");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const gridSizeInput = document.getElementById("grid-size");
  const sizeDisplay = document.getElementById("size-display");
  const wallDensityInput = document.getElementById("wall-density");
  const wallDensityDisplay = document.getElementById("wall-display");
  const shortestPath = document.getElementById("shortest-path");
  let gridSize = 30;
  let wallDensity = 25;
  sizeDisplay.textContent = gridSize;
  wallDensityDisplay.textContent = wallDensity;
  let originCount = 0;
  let origin1 = null;
  let origin2 = null;

  const NO_ONE = 0;
  const BY_A = 1;
  const BY_B = 2;

  class Node {
    constructor(x, y, closed) {
      this.x = x;
      this.y = y;
      this.closed = closed;
      this.length = 0;
      this.openedBy = NO_ONE;
      this.domNode = null;
      this.parent = null;
      this.end = false;
    }
  }

  function generateGrid(size) {
    const grid = [];
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        let isWall = Math.floor(Math.random() * 100) < wallDensity;
        grid[i][j] = new Node(j, i, isWall);

        const gridItem = document.createElement("div");
        gridItem.addEventListener("click", () => selectOrigin(grid[i][j]));
        gridItem["data-node"] = grid[i][j];
        gridItem.style.backgroundColor = grid[i][j].closed ? "black" : "gray";
        grid[i][j].domNode = gridItem;
        gridContainer.appendChild(gridItem);
      }
    }
    return grid;
  }

  function selectOrigin(node) {
    if (originCount === 2) {
      alert("Press start to simulate");
    } else if (node.closed) {
      alert("Select only non-wall cells");
    } else if(node.domNode.style.backgroundColor === "green"){
      alert("Select two separate cells")
    } else if (!origin1) {
      node.domNode.style.backgroundColor = "green";
      node.parent = "origin";
      node.openedBy = BY_A;
      origin1 = [node.x, node.y];
      originCount++;
    } else if (!origin2) {
      node.domNode.style.backgroundColor = "green";
      node.end = true;
      node.openedBy = BY_B;
      origin2 = [node.x, node.y];
      originCount++;
    }
  }

  function paintShortestPath(grid, center) {
    let current = center;
    let intervalID = null;
    setInterval(() => {
      if (current.parent === "origin") {
        clearInterval(intervalID);
        return;
      }
      current = current.parent;
      current.domNode.style.backgroundColor = "orange";
    }, 100);
  }

  const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {
    let intervalId = null;
    let aQueue, bQueue, iteration;

    if (!intervalId) {
      aQueue = [maze[yA][xA]];
      bQueue = [maze[yB][xB]];
      iteration = 0;
    }
    intervalId = setInterval(() => {
      iteration++;
      const aNeighbors = aQueue.reduce(
        (acc, neighbor, i, arr) =>
          acc.concat(getNeighbors(maze, neighbor.x, neighbor.y, neighbor)),
        []
      );
      aQueue = [];
      for (let i = 0; i < aNeighbors.length; i++) {
        const neighbor = aNeighbors[i];
        if (neighbor.end) {
          neighbor.domNode.style.backgroundColor = "orange";
          clearInterval(intervalId);
          shortestPath.textContent = neighbor.length + iteration;
          return paintShortestPath(grid, neighbor);
        } else if (neighbor.openedBy === NO_ONE) {
          neighbor.length = iteration;
          neighbor.openedBy = BY_A;
          if (neighbor.domNode.style.backgroundColor !== "green") {
            neighbor.domNode.style.backgroundColor = "cornflowerblue";
          }
          aQueue.push(neighbor);
        }
      }

      if (!aNeighbors.length) {
        clearInterval(intervalId);
        alert("No path available.");
        return -1;
      }
    }, 200);
  };

  const getNeighbors = (maze, x, y, parent) => {
    const neighbors = [];
    if (y - 1 >= 0 && !maze[y - 1][x].closed) {
      // left
      if (!maze[y - 1][x].parent) {
        maze[y - 1][x].parent = parent;
      }
      neighbors.push(maze[y - 1][x]);
    }
    if (y + 1 < maze.length && !maze[y + 1][x].closed) {
      // right
      if (!maze[y + 1][x].parent) {
        maze[y + 1][x].parent = parent;
      }
      neighbors.push(maze[y + 1][x]);
    }
    if (x - 1 >= 0 && !maze[y][x - 1].closed) {
      // up
      if (!maze[y][x - 1].parent) {
        maze[y][x - 1].parent = parent;
      }
      neighbors.push(maze[y][x - 1]);
    }
    if (x + 1 < maze.length && !maze[y][x + 1].closed) {
      // down
      if (!maze[y][x + 1].parent) {
        maze[y][x + 1].parent = parent;
      }
      neighbors.push(maze[y][x + 1]);
    }
    // you could add 4 more if statements to do diagnal functionality in the Neighbors search
    return neighbors;
  };

  let grid = generateGrid(gridSize);

  startBtn.addEventListener("click", () => {
    findShortestPathLength(grid, origin1, origin2);
  });

  resetBtn.addEventListener("click", () => {
    gridContainer.innerHTML = null;
    origin1 = null;
    origin2 = null;
    originCount = 0;
    grid = generateGrid(gridSize);
  });

  gridSizeInput.addEventListener("change", function() {
    gridSize = this.value;
    origin1 = null;
    origin2 = null;
    originCount = 0;
    gridContainer.innerHTML = null;
    grid = generateGrid(gridSize);
    sizeDisplay.textContent = gridSize;
  });

  wallDensityInput.addEventListener("change", function() {
    wallDensity = this.value;
    origin1 = null;
    origin2 = null;
    originCount = 0;
    gridContainer.innerHTML = null;
    grid = generateGrid(gridSize);
    wallDensityDisplay.textContent = this.value;
  });
})();
