// GENUARY JAN. 18: Unexpected path
// Chemin inattendu basé sur une règle simple : Langton's Ant

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function dessinerLigne(x1, y1, x2, y2) {
  LPRINT(`M${int(constrainCoord(x1))},${int(constrainCoord(y1))}`);
  LPRINT(`D${int(constrainCoord(x2))},${int(constrainCoord(y2))}`);
}

function dessiner() {
  PALETTE("GREEN");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Langton's Ant - Fourmi de Langton
  // Règle simple : sur blanc, tourner à droite et colorier
  //                sur noir, tourner à gauche et décolorier
  
  let cellSize = 6;
  let cols = floor(NP / cellSize);
  let rows = floor(NP / cellSize);
  
  // Grille
  let grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  
  // Position et direction de la fourmi
  let antX = floor(cols / 2);
  let antY = floor(rows / 2);
  let antDir = 0; // 0=haut, 1=droite, 2=bas, 3=gauche
  
  // Directions
  let dx = [0, 1, 0, -1];
  let dy = [-1, 0, 1, 0];
  
  // Chemin parcouru
  let path = [{x: antX, y: antY}];
  
  // Simuler plusieurs milliers d'étapes
  let steps = 15000;
  
  for (let step = 0; step < steps; step++) {
    if (antX < 0 || antX >= cols || antY < 0 || antY >= rows) break;
    
    // Appliquer la règle
    if (grid[antX][antY] == 0) {
      // Sur blanc : tourner à droite
      antDir = (antDir + 1) % 4;
      grid[antX][antY] = 1;
    } else {
      // Sur noir : tourner à gauche
      antDir = (antDir + 3) % 4;
      grid[antX][antY] = 0;
    }
    
    // Avancer
    antX += dx[antDir];
    antY += dy[antDir];
    
    // Enregistrer le chemin (tous les N pas pour ne pas surcharger)
    if (step % 10 == 0) {
      path.push({x: antX, y: antY});
    }
  }
  
  // Dessiner les cellules colorées
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        let x = i * cellSize;
        let y = j * cellSize;
        // Dessiner un petit carré
        dessinerLigne(x, y, x + cellSize, y);
        dessinerLigne(x + cellSize, y, x + cellSize, y + cellSize);
        dessinerLigne(x + cellSize, y + cellSize, x, y + cellSize);
        dessinerLigne(x, y + cellSize, x, y);
      }
    }
  }
  
  TRACE();
  
  // Dessiner le chemin parcouru
  OUTPUT = "";
  STROKE_COLOR = "#007B61";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < path.length - 1; i++) {
    let p1 = path[i];
    let p2 = path[i + 1];
    let x1 = p1.x * cellSize + cellSize / 2;
    let y1 = p1.y * cellSize + cellSize / 2;
    let x2 = p2.x * cellSize + cellSize / 2;
    let y2 = p2.y * cellSize + cellSize / 2;
    
    if (abs(x2 - x1) < cellSize * 3 && abs(y2 - y1) < cellSize * 3) {
      dessinerLigne(x1, y1, x2, y2);
    }
  }
  
  TRACE();
  
  // Deuxième chemin avec une variante de la règle (RLR)
  OUTPUT = "";
  STROKE_COLOR = "#228B22";
  stroke_(STROKE_COLOR);
  
  // Réinitialiser pour un deuxième pattern
  let grid2 = [];
  for (let i = 0; i < cols; i++) {
    grid2[i] = [];
    for (let j = 0; j < rows; j++) {
      grid2[i][j] = 0;
    }
  }
  
  let ant2X = floor(cols * 0.25);
  let ant2Y = floor(rows * 0.25);
  let ant2Dir = 0;
  
  // Règle RLR (3 états)
  let rules = ['R', 'L', 'R'];
  
  for (let step = 0; step < 8000; step++) {
    if (ant2X < 0 || ant2X >= cols || ant2Y < 0 || ant2Y >= rows) break;
    
    let state = grid2[ant2X][ant2Y];
    
    // Tourner selon la règle
    if (rules[state] == 'R') {
      ant2Dir = (ant2Dir + 1) % 4;
    } else {
      ant2Dir = (ant2Dir + 3) % 4;
    }
    
    // Changer l'état
    grid2[ant2X][ant2Y] = (state + 1) % 3;
    
    // Avancer
    ant2X += dx[ant2Dir];
    ant2Y += dy[ant2Dir];
  }
  
  // Dessiner le deuxième pattern
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid2[i][j] > 0) {
        let x = i * cellSize;
        let y = j * cellSize;
        if (grid2[i][j] == 1) {
          // Cercle pour état 1
          let cx = x + cellSize / 2;
          let cy = y + cellSize / 2;
          let r = cellSize / 3;
          for (let k = 0; k <= 8; k++) {
            let angle = (2 * PI * k) / 8;
            let px = cx + r * cos(angle);
            let py = cy + r * sin(angle);
            if (k == 0) LPRINT(`M${int(constrainCoord(px))},${int(constrainCoord(py))}`);
            else LPRINT(`D${int(constrainCoord(px))},${int(constrainCoord(py))}`);
          }
        } else {
          // X pour état 2
          dessinerLigne(x + 1, y + 1, x + cellSize - 1, y + cellSize - 1);
          dessinerLigne(x + cellSize - 1, y + 1, x + 1, y + cellSize - 1);
        }
      }
    }
  }
  
  TRACE();
  
  // Position de départ et d'arrivée
  OUTPUT = "";
  STROKE_COLOR = "#FF4500";
  stroke_(STROKE_COLOR);
  
  // Cercle de départ
  let startX = floor(cols / 2) * cellSize + cellSize / 2;
  let startY = floor(rows / 2) * cellSize + cellSize / 2;
  
  for (let i = 0; i <= 20; i++) {
    let angle = (2 * PI * i) / 20;
    let x = startX + 10 * cos(angle);
    let y = startY + 10 * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
  
  // Cercle final
  let endX = antX * cellSize + cellSize / 2;
  let endY = antY * cellSize + cellSize / 2;
  
  for (let i = 0; i <= 20; i++) {
    let angle = (2 * PI * i) / 20;
    let x = endX + 10 * cos(angle);
    let y = endY + 10 * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
  
  TRACE();
}

function setup() {
  INIT();
  dessiner();
}

function keyPressed() {
  if (key == " ") {
    let originalSvg = _SVG_;
    let originalSvgElmt = svgElmt;
    let originalSvgTranslate = svgTranslate;
    let originalSvgVertices = svgVertices;
    let originalSvgStrokeColor = svgStrokeColor;

    _SVG_ = true;
    width = NP;
    height = NP;
    svgTranslate = { x: 0, y: 0, add: function (x, y) { this.x += x; this.y += y; } };
    svgElmt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElmt.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElmt.setAttribute("version", "1.1");
    svgElmt.setAttribute("viewBox", `0 0 ${NP} ${NP}`);
    svgElmt.setAttribute("width", NP);
    svgElmt.setAttribute("height", NP);
    svgElmt.style.backgroundColor = BG_COLOR;
    svgVertices = [];
    svgStrokeColor = STROKE_COLOR;

    dessiner();

    let filename = "Genuary18_UnexpectedPath.svg";
    let svgData = svgElmt.outerHTML;
    let preface = '<?xml version="1.0" standalone="no"?>\r\n';
    let svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    let svgUrl = window.URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    _SVG_ = originalSvg;
    svgElmt = originalSvgElmt;
    svgTranslate = originalSvgTranslate;
    svgVertices = originalSvgVertices;
    svgStrokeColor = originalSvgStrokeColor;
  } else if (key == "f" || key == "F") {
    save("Genuary18_UnexpectedPath.png");
  }
}
