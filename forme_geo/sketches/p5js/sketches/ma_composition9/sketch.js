// GENUARY JAN. 9: Crazy automaton
// Automate cellulaire avec des règles folles

let NP = 800;
let cellSize = 8;
let cols, rows;
let grid, nextGrid;
let generation = 0;
let paused = false;
let ruleSet = 0;

// Couleurs pour différents états
let stateColors;

function setup() {
  createCanvas(NP, NP);
  cols = floor(NP / cellSize);
  rows = floor(NP / cellSize);
  
  stateColors = [
    color(1, 58, 187),      // 0 - bleu foncé
    color(247, 235, 35),    // 1 - jaune
    color(255, 100, 100),   // 2 - rouge
    color(100, 255, 100),   // 3 - vert
    color(200, 100, 255),   // 4 - violet
    color(255, 180, 50)     // 5 - orange
  ];
  
  initGrid();
  frameRate(15);
}

function initGrid() {
  grid = [];
  nextGrid = [];
  
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    nextGrid[i] = [];
    for (let j = 0; j < rows; j++) {
      // Initialisation aléatoire avec plusieurs états
      if (random() < 0.3) {
        grid[i][j] = floor(random(1, 6));
      } else {
        grid[i][j] = 0;
      }
      nextGrid[i][j] = 0;
    }
  }
  generation = 0;
}

function draw() {
  background(10, 15, 40);
  
  // Dessiner la grille
  noStroke();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        fill(stateColors[state]);
        rect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }
  
  // Mettre à jour si pas en pause
  if (!paused) {
    updateGrid();
    generation++;
  }
  
  // Afficher les infos
  fill(255);
  noStroke();
  textSize(14);
  text(`Generation: ${generation}`, 10, 20);
  text(`Rule Set: ${ruleSet + 1}/5`, 10, 40);
  text(`Press 1-5 to change rules`, 10, 60);
  text(`Press R to reset, SPACE to pause`, 10, 80);
}

function updateGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(i, j);
      
      // Appliquer les règles folles selon le rule set
      nextGrid[i][j] = applyRules(state, neighbors, i, j);
    }
  }
  
  // Swap grids
  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

function countNeighbors(x, y) {
  // Compter les voisins par état
  let counts = [0, 0, 0, 0, 0, 0];
  
  // Voisinage étendu selon le rule set
  let range = ruleSet < 2 ? 1 : 2;
  
  for (let i = -range; i <= range; i++) {
    for (let j = -range; j <= range; j++) {
      if (i == 0 && j == 0) continue;
      
      // Voisinage en forme spéciale pour certaines règles
      if (ruleSet == 2 && abs(i) + abs(j) > 2) continue; // Diamant
      if (ruleSet == 3 && i != 0 && j != 0 && abs(i) != abs(j)) continue; // Croix + diagonales
      
      let ni = (x + i + cols) % cols;
      let nj = (y + j + rows) % rows;
      counts[grid[ni][nj]]++;
    }
  }
  
  return counts;
}

function applyRules(state, neighbors, x, y) {
  let total = neighbors[1] + neighbors[2] + neighbors[3] + neighbors[4] + neighbors[5];
  
  switch (ruleSet) {
    case 0: // Règle "Multicolore Chaos"
      if (state == 0) {
        // Naissance basée sur la somme colorée
        if (total == 3) return floor(random(1, 6));
        if (neighbors[1] >= 2 && neighbors[2] >= 1) return 3;
      } else {
        // Survie et transformation
        if (total < 2 || total > 4) return 0;
        if (neighbors[state] == 0) return (state % 5) + 1; // Change de couleur
        return state;
      }
      break;
      
    case 1: // Règle "Prédateur-Proie"
      // 1 mange 5, 2 mange 1, 3 mange 2, 4 mange 3, 5 mange 4
      let prey = state == 0 ? 0 : ((state - 2 + 5) % 5) + 1;
      let predator = (state % 5) + 1;
      
      if (state == 0) {
        // Reproduction si assez de la même espèce
        for (let s = 1; s <= 5; s++) {
          if (neighbors[s] >= 3) return s;
        }
      } else {
        if (neighbors[predator] >= 2) return 0; // Mangé
        if (neighbors[prey] >= 1 && total < 5) return state; // Survie avec proie
        if (neighbors[state] < 1 || neighbors[state] > 4) return 0;
        return state;
      }
      break;
      
    case 2: // Règle "Vagues de couleur"
      if (state == 0) {
        // Propagation par vagues
        for (let s = 1; s <= 5; s++) {
          if (neighbors[s] == 2 || neighbors[s] == 3) return s;
        }
      } else {
        // Évolution cyclique
        if (generation % 10 == 0) return (state % 5) + 1;
        if (total > 6) return 0;
        return state;
      }
      break;
      
    case 3: // Règle "Cristallisation"
      if (state == 0) {
        // Croissance cristalline
        let dominant = 0;
        let maxCount = 0;
        for (let s = 1; s <= 5; s++) {
          if (neighbors[s] > maxCount) {
            maxCount = neighbors[s];
            dominant = s;
          }
        }
        if (maxCount >= 2 && maxCount <= 4) return dominant;
      } else {
        // Stabilité ou dissolution
        if (neighbors[state] < 1) return 0;
        if (neighbors[state] > 5) return 0;
        // Interaction avec les voisins
        let interaction = (x + y + generation) % 5 + 1;
        if (neighbors[interaction] >= 3) return interaction;
        return state;
      }
      break;
      
    case 4: // Règle "Spirale chaotique"
      let angle = atan2(y - rows/2, x - cols/2);
      let dist = sqrt(pow(x - cols/2, 2) + pow(y - rows/2, 2));
      let spiral = floor((angle + PI + generation * 0.1 + dist * 0.1) / (TWO_PI / 5)) % 5 + 1;
      
      if (state == 0) {
        if (neighbors[spiral] >= 1 && total <= 4) return spiral;
        if (total == 3) return floor(random(1, 6));
      } else {
        if (state != spiral && neighbors[spiral] >= 2) return spiral;
        if (total < 2 || total > 5) return 0;
        return state;
      }
      break;
  }
  
  return 0;
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    initGrid();
  } else if (key == ' ') {
    paused = !paused;
  } else if (key >= '1' && key <= '5') {
    ruleSet = int(key) - 1;
    initGrid();
  } else if (key == 'f' || key == 'F') {
    save("Genuary09_CrazyAutomaton.png");
  }
}

function mousePressed() {
  // Dessiner avec la souris
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    grid[i][j] = floor(random(1, 6));
  }
}

function mouseDragged() {
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    grid[i][j] = floor(random(1, 6));
  }
}
