// GENUARY JAN. 4: Lowres
// Image pixelisée - Paysage en basse résolution

let NP = 800,
  PI = Math.PI;
let pixelSize = 20; // Taille des "pixels"
let grid = [];
let cols, rows;

function setup() {
  createCanvas(NP, NP);
  cols = floor(NP / pixelSize);
  rows = floor(NP / pixelSize);
  
  // Générer un paysage pixelisé
  generateLandscape();
  noLoop();
}

function generateLandscape() {
  grid = [];
  
  // Palette de couleurs rétro
  let skyColors = ['#87CEEB', '#5DA5D3', '#4A90C2'];
  let sunColor = '#FFD700';
  let mountainColors = ['#2D4A3E', '#3D5A4E', '#4D6A5E'];
  let groundColors = ['#8B7355', '#7A6449', '#695A3D'];
  let treeColor = '#1A3320';
  
  // Générer la grille
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      let normalizedY = y / rows;
      let normalizedX = x / cols;
      
      // Ciel (gradient)
      if (normalizedY < 0.4) {
        let skyIndex = floor(normalizedY / 0.4 * 3);
        grid[y][x] = skyColors[min(skyIndex, 2)];
        
        // Soleil
        let sunX = cols * 0.7;
        let sunY = rows * 0.15;
        let distToSun = dist(x, y, sunX, sunY);
        if (distToSun < 3) {
          grid[y][x] = sunColor;
        }
      }
      // Montagnes
      else if (normalizedY < 0.6) {
        let mountainHeight = 0.4 + 0.15 * sin(x * 0.3) + 0.1 * sin(x * 0.7);
        if (normalizedY < mountainHeight) {
          grid[y][x] = skyColors[2];
        } else {
          let shade = floor((normalizedY - 0.4) / 0.2 * 3);
          grid[y][x] = mountainColors[min(shade, 2)];
        }
      }
      // Sol et arbres
      else {
        let groundShade = floor((normalizedY - 0.6) / 0.4 * 3);
        grid[y][x] = groundColors[min(groundShade, 2)];
        
        // Arbres pixelisés (triangles)
        let treePositions = [0.1, 0.25, 0.4, 0.55, 0.75, 0.9];
        for (let treeX of treePositions) {
          let tx = floor(treeX * cols);
          let baseY = 0.6 + 0.1 * sin(treeX * 10);
          let treeHeight = 8 + floor(sin(treeX * 20) * 3);
          let treeBaseY = floor(baseY * rows);
          
          // Triangle de l'arbre
          for (let ty = 0; ty < treeHeight; ty++) {
            let width = floor((treeHeight - ty) / 2);
            if (y == treeBaseY - ty && x >= tx - width && x <= tx + width) {
              grid[y][x] = treeColor;
            }
          }
          // Tronc
          if (y >= treeBaseY && y < treeBaseY + 2 && x >= tx - 1 && x <= tx + 1) {
            grid[y][x] = '#4A3728';
          }
        }
      }
      
      // Nuages pixelisés
      let cloudPositions = [[0.2, 0.1], [0.5, 0.08], [0.8, 0.12]];
      for (let cloud of cloudPositions) {
        let cx = floor(cloud[0] * cols);
        let cy = floor(cloud[1] * rows);
        if (abs(x - cx) < 4 && abs(y - cy) < 2) {
          if (random() > 0.3) {
            grid[y][x] = '#FFFFFF';
          }
        }
      }
    }
  }
}

function draw() {
  background(0);
  
  // Dessiner la grille de pixels
  noStroke();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(grid[y][x]);
      rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
  
  // Ajouter un effet de grille CRT
  stroke(0, 20);
  strokeWeight(1);
  for (let x = 0; x <= NP; x += pixelSize) {
    line(x, 0, x, NP);
  }
  for (let y = 0; y <= NP; y += pixelSize) {
    line(0, y, NP, y);
  }
  
  // Scanlines effet rétro
  stroke(0, 30);
  for (let y = 0; y < NP; y += 4) {
    line(0, y, NP, y);
  }
  
  // Texte pixelisé "LOWRES" en bas
  fill(255);
  noStroke();
  let text = [
    [1,1,0,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1,1,1,0,1,1,1],
    [1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0],
    [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1,0,0,1,1,0],
    [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,0,1,1,1,0,0,1,0,1,0,0,1,0,1,0,1,1,1,0,1,1,1]
  ];
  
  let textStartX = (cols - 25) / 2;
  let textStartY = rows - 7;
  
  for (let ty = 0; ty < text.length; ty++) {
    for (let tx = 0; tx < text[ty].length; tx++) {
      if (text[ty][tx] == 1) {
        fill(255, 220, 100);
        rect((textStartX + tx) * pixelSize, (textStartY + ty) * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}

function mousePressed() {
  // Régénérer le paysage avec des variations
  pixelSize = random([10, 16, 20, 25, 32]);
  cols = floor(NP / pixelSize);
  rows = floor(NP / pixelSize);
  generateLandscape();
  redraw();
}

function keyPressed() {
  if (key == "f" || key == "F") {
    save("Genuary04_Lowres.png");
  }
}
