// GENUARY JAN. 19: 16x16
// Création sur une grille 16x16 - Icônes pixel art

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;
let cellSize;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function dessinerPixel(gridX, gridY, offsetX, offsetY) {
  let x = offsetX + gridX * cellSize;
  let y = offsetY + gridY * cellSize;
  
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + cellSize))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + cellSize))},${int(constrainCoord(y + cellSize))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y + cellSize))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
}

// Définition d'icônes 16x16
function getCoeur() {
  return [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
}

function getEtoile() {
  return [
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0],
    [0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
  ];
}

function getSmiley() {
  return [
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0],
    [1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1],
    [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
    [0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
}

function getMaison() {
  return [
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0]
  ];
}

function dessinerIcone(icon, offsetX, offsetY, couleur) {
  STROKE_COLOR = couleur;
  stroke_(STROKE_COLOR);
  
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      if (icon[y][x] == 1) {
        dessinerPixel(x, y, offsetX, offsetY);
      }
    }
  }
}

function dessiner() {
  PALETTE("RED");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  cellSize = 10;
  let iconSize = 16 * cellSize;
  let spacing = 40;
  
  // Grille de 4 icônes 16x16
  OUTPUT = "";
  
  // Coeur (rouge)
  dessinerIcone(getCoeur(), spacing, spacing, "#8F080E");
  
  TRACE();
  
  OUTPUT = "";
  
  // Étoile (jaune)
  dessinerIcone(getEtoile(), spacing + iconSize + spacing, spacing, "#DAA520");
  
  TRACE();
  
  OUTPUT = "";
  
  // Smiley (vert)
  dessinerIcone(getSmiley(), spacing, spacing + iconSize + spacing, "#228B22");
  
  TRACE();
  
  OUTPUT = "";
  
  // Maison (bleu)
  dessinerIcone(getMaison(), spacing + iconSize + spacing, spacing + iconSize + spacing, "#4169E1");
  
  TRACE();
  
  // Grande grille 16x16 centrale avec motif généré
  OUTPUT = "";
  STROKE_COLOR = "#8F080E";
  stroke_(STROKE_COLOR);
  
  let bigCellSize = 20;
  let bigOffsetX = (NP - 16 * bigCellSize) / 2;
  let bigOffsetY = (NP - 16 * bigCellSize) / 2 + 50;
  
  // Pattern généré procéduralement
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      // Règle : symétrie et motif basé sur la distance
      let dist = sqrt(pow(x - 7.5, 2) + pow(y - 7.5, 2));
      let pattern = (sin(dist) + sin(x * 0.5) + sin(y * 0.5)) / 3;
      
      if (pattern > 0 || (x + y) % 3 == 0) {
        let px = bigOffsetX + x * bigCellSize;
        let py = bigOffsetY + y * bigCellSize;
        
        LPRINT(`M${int(constrainCoord(px))},${int(constrainCoord(py))}`);
        LPRINT(`D${int(constrainCoord(px + bigCellSize))},${int(constrainCoord(py))}`);
        LPRINT(`D${int(constrainCoord(px + bigCellSize))},${int(constrainCoord(py + bigCellSize))}`);
        LPRINT(`D${int(constrainCoord(px))},${int(constrainCoord(py + bigCellSize))}`);
        LPRINT(`D${int(constrainCoord(px))},${int(constrainCoord(py))}`);
      }
    }
  }
  
  // Cadre de la grille centrale
  let gx = bigOffsetX;
  let gy = bigOffsetY;
  let gw = 16 * bigCellSize;
  
  LPRINT(`M${int(gx)},${int(gy)}`);
  LPRINT(`D${int(gx + gw)},${int(gy)}`);
  LPRINT(`D${int(gx + gw)},${int(gy + gw)}`);
  LPRINT(`D${int(gx)},${int(gy + gw)}`);
  LPRINT(`D${int(gx)},${int(gy)}`);
  
  // Lignes de grille
  for (let i = 0; i <= 16; i++) {
    // Lignes verticales
    LPRINT(`M${int(gx + i * bigCellSize)},${int(gy)}`);
    LPRINT(`D${int(gx + i * bigCellSize)},${int(gy + gw)}`);
    // Lignes horizontales
    LPRINT(`M${int(gx)},${int(gy + i * bigCellSize)}`);
    LPRINT(`D${int(gx + gw)},${int(gy + i * bigCellSize)}`);
  }
  
  TRACE();
  
  // Titre "16x16"
  OUTPUT = "";
  STROKE_COLOR = "#600808";
  stroke_(STROKE_COLOR);
  
  // "16" à gauche
  let titleY = 30;
  // 1
  LPRINT(`M${int(NP/2 - 60)},${int(titleY)}`);
  LPRINT(`D${int(NP/2 - 60)},${int(titleY + 25)}`);
  // 6
  LPRINT(`M${int(NP/2 - 45)},${int(titleY)}`);
  LPRINT(`D${int(NP/2 - 25)},${int(titleY)}`);
  LPRINT(`D${int(NP/2 - 25)},${int(titleY + 12)}`);
  LPRINT(`D${int(NP/2 - 45)},${int(titleY + 12)}`);
  LPRINT(`D${int(NP/2 - 45)},${int(titleY + 25)}`);
  LPRINT(`D${int(NP/2 - 25)},${int(titleY + 25)}`);
  LPRINT(`D${int(NP/2 - 25)},${int(titleY + 12)}`);
  
  // x
  LPRINT(`M${int(NP/2 - 15)},${int(titleY + 5)}`);
  LPRINT(`D${int(NP/2 + 5)},${int(titleY + 20)}`);
  LPRINT(`M${int(NP/2 + 5)},${int(titleY + 5)}`);
  LPRINT(`D${int(NP/2 - 15)},${int(titleY + 20)}`);
  
  // "16" à droite
  // 1
  LPRINT(`M${int(NP/2 + 20)},${int(titleY)}`);
  LPRINT(`D${int(NP/2 + 20)},${int(titleY + 25)}`);
  // 6
  LPRINT(`M${int(NP/2 + 35)},${int(titleY)}`);
  LPRINT(`D${int(NP/2 + 55)},${int(titleY)}`);
  LPRINT(`D${int(NP/2 + 55)},${int(titleY + 12)}`);
  LPRINT(`D${int(NP/2 + 35)},${int(titleY + 12)}`);
  LPRINT(`D${int(NP/2 + 35)},${int(titleY + 25)}`);
  LPRINT(`D${int(NP/2 + 55)},${int(titleY + 25)}`);
  LPRINT(`D${int(NP/2 + 55)},${int(titleY + 12)}`);
  
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

    let filename = "Genuary19_16x16.svg";
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
    save("Genuary19_16x16.png");
  }
}
