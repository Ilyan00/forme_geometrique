// GENUARY JAN. 7: Boolean algebra
// Visualisation des opérations booléennes : AND, OR, NOT, XOR

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Dessiner un cercle
function dessinerCercle(CX, CY, rayon, segments) {
  for (let i = 0; i <= segments; i++) {
    let angle = (2 * PI * i) / segments;
    let X = int(constrainCoord(CX + rayon * cos(angle)));
    let Y = int(constrainCoord(CY + rayon * sin(angle)));
    if (i == 0) LPRINT(`M${X},${Y}`);
    else LPRINT(`D${X},${Y}`);
  }
}

function dessiner() {
  PALETTE("NEW_BLUE");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  let cellSize = NP / 2;
  let circleRadius = cellSize * 0.3;
  let offset = cellSize * 0.15;
  
  // ========== AND (en haut à gauche) ==========
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  let cx1 = cellSize / 2 - offset;
  let cy1 = cellSize / 2;
  let cx2 = cellSize / 2 + offset;
  let cy2 = cellSize / 2;
  
  // Dessiner l'intersection (AND)
  // Zone d'intersection approximée par des lignes verticales
  for (let angle = -PI/3; angle <= PI/3; angle += 0.05) {
    let x1 = cx1 + circleRadius * cos(angle);
    let y1 = cy1 + circleRadius * sin(angle);
    let x2 = cx2 + circleRadius * cos(PI - angle);
    let y2 = cy2 + circleRadius * sin(PI - angle);
    
    // Lignes verticales dans l'intersection
    if (x1 < x2) {
      for (let x = x1; x <= x2; x += 8) {
        LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y1))}`);
        LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y2))}`);
      }
    }
  }
  
  // Contours des cercles
  dessinerCercle(cx1, cy1, circleRadius, 40);
  dessinerCercle(cx2, cy2, circleRadius, 40);
  
  TRACE();
  
  // ========== OR (en haut à droite) ==========
  OUTPUT = "";
  STROKE_COLOR = "#FFD700";
  stroke_(STROKE_COLOR);
  
  cx1 = cellSize + cellSize / 2 - offset;
  cy1 = cellSize / 2;
  cx2 = cellSize + cellSize / 2 + offset;
  cy2 = cellSize / 2;
  
  // Remplir les deux cercles (OR = union)
  // Hachures horizontales
  for (let y = cy1 - circleRadius; y <= cy1 + circleRadius; y += 6) {
    // Trouver les intersections avec les deux cercles
    let dy1 = y - cy1;
    let dy2 = y - cy2;
    
    if (abs(dy1) <= circleRadius) {
      let dx1 = sqrt(circleRadius * circleRadius - dy1 * dy1);
      let leftX1 = cx1 - dx1;
      let rightX1 = cx1 + dx1;
      
      if (abs(dy2) <= circleRadius) {
        let dx2 = sqrt(circleRadius * circleRadius - dy2 * dy2);
        let leftX2 = cx2 - dx2;
        let rightX2 = cx2 + dx2;
        
        let minX = min(leftX1, leftX2);
        let maxX = max(rightX1, rightX2);
        
        LPRINT(`M${int(constrainCoord(minX))},${int(constrainCoord(y))}`);
        LPRINT(`D${int(constrainCoord(maxX))},${int(constrainCoord(y))}`);
      } else {
        LPRINT(`M${int(constrainCoord(leftX1))},${int(constrainCoord(y))}`);
        LPRINT(`D${int(constrainCoord(rightX1))},${int(constrainCoord(y))}`);
      }
    } else if (abs(dy2) <= circleRadius) {
      let dx2 = sqrt(circleRadius * circleRadius - dy2 * dy2);
      LPRINT(`M${int(constrainCoord(cx2 - dx2))},${int(constrainCoord(y))}`);
      LPRINT(`D${int(constrainCoord(cx2 + dx2))},${int(constrainCoord(y))}`);
    }
  }
  
  dessinerCercle(cx1, cy1, circleRadius, 40);
  dessinerCercle(cx2, cy2, circleRadius, 40);
  
  TRACE();
  
  // ========== NOT (en bas à gauche) ==========
  OUTPUT = "";
  STROKE_COLOR = "#FF6B6B";
  stroke_(STROKE_COLOR);
  
  let notCx = cellSize / 2;
  let notCy = cellSize + cellSize / 2;
  let boxSize = circleRadius * 1.8;
  
  // Carré extérieur (univers)
  let boxLeft = notCx - boxSize;
  let boxRight = notCx + boxSize;
  let boxTop = notCy - boxSize;
  let boxBottom = notCy + boxSize;
  
  LPRINT(`M${int(boxLeft)},${int(boxTop)}`);
  LPRINT(`D${int(boxRight)},${int(boxTop)}`);
  LPRINT(`D${int(boxRight)},${int(boxBottom)}`);
  LPRINT(`D${int(boxLeft)},${int(boxBottom)}`);
  LPRINT(`D${int(boxLeft)},${int(boxTop)}`);
  
  // Hachures dans la zone NOT (extérieure au cercle)
  for (let y = boxTop; y <= boxBottom; y += 6) {
    let dy = y - notCy;
    
    if (abs(dy) <= circleRadius) {
      let dx = sqrt(circleRadius * circleRadius - dy * dy);
      // Partie gauche
      LPRINT(`M${int(boxLeft)},${int(constrainCoord(y))}`);
      LPRINT(`D${int(constrainCoord(notCx - dx))},${int(constrainCoord(y))}`);
      // Partie droite
      LPRINT(`M${int(constrainCoord(notCx + dx))},${int(constrainCoord(y))}`);
      LPRINT(`D${int(boxRight)},${int(constrainCoord(y))}`);
    } else {
      LPRINT(`M${int(boxLeft)},${int(constrainCoord(y))}`);
      LPRINT(`D${int(boxRight)},${int(constrainCoord(y))}`);
    }
  }
  
  // Cercle (ensemble A)
  dessinerCercle(notCx, notCy, circleRadius, 40);
  
  TRACE();
  
  // ========== XOR (en bas à droite) ==========
  OUTPUT = "";
  STROKE_COLOR = "#9B59B6";
  stroke_(STROKE_COLOR);
  
  cx1 = cellSize + cellSize / 2 - offset;
  cy1 = cellSize + cellSize / 2;
  cx2 = cellSize + cellSize / 2 + offset;
  cy2 = cellSize + cellSize / 2;
  
  // XOR = (A OR B) - (A AND B)
  // Hachures diagonales pour différencier
  for (let y = cy1 - circleRadius; y <= cy1 + circleRadius; y += 5) {
    let dy1 = y - cy1;
    let dy2 = y - cy2;
    
    if (abs(dy1) <= circleRadius) {
      let dx1 = sqrt(circleRadius * circleRadius - dy1 * dy1);
      let leftX1 = cx1 - dx1;
      let rightX1 = cx1 + dx1;
      
      if (abs(dy2) <= circleRadius) {
        let dx2 = sqrt(circleRadius * circleRadius - dy2 * dy2);
        let leftX2 = cx2 - dx2;
        let rightX2 = cx2 + dx2;
        
        // Partie gauche seulement de A (pas dans B)
        if (leftX1 < leftX2) {
          LPRINT(`M${int(constrainCoord(leftX1))},${int(constrainCoord(y))}`);
          LPRINT(`D${int(constrainCoord(min(rightX1, leftX2)))},${int(constrainCoord(y))}`);
        }
        
        // Partie droite seulement de B (pas dans A)
        if (rightX2 > rightX1) {
          LPRINT(`M${int(constrainCoord(max(leftX2, rightX1)))},${int(constrainCoord(y))}`);
          LPRINT(`D${int(constrainCoord(rightX2))},${int(constrainCoord(y))}`);
        }
      } else {
        LPRINT(`M${int(constrainCoord(leftX1))},${int(constrainCoord(y))}`);
        LPRINT(`D${int(constrainCoord(rightX1))},${int(constrainCoord(y))}`);
      }
    } else if (abs(dy2) <= circleRadius) {
      let dx2 = sqrt(circleRadius * circleRadius - dy2 * dy2);
      LPRINT(`M${int(constrainCoord(cx2 - dx2))},${int(constrainCoord(y))}`);
      LPRINT(`D${int(constrainCoord(cx2 + dx2))},${int(constrainCoord(y))}`);
    }
  }
  
  dessinerCercle(cx1, cy1, circleRadius, 40);
  dessinerCercle(cx2, cy2, circleRadius, 40);
  
  TRACE();
  
  // ========== Labels ==========
  OUTPUT = "";
  STROKE_COLOR = "#FFFFFF";
  stroke_(STROKE_COLOR);
  
  // Dessiner "AND" en lignes
  let textY = 50;
  let textScale = 0.6;
  // A
  LPRINT(`M${int(80)},${int(textY + 30)}`);
  LPRINT(`D${int(95)},${int(textY)}`);
  LPRINT(`D${int(110)},${int(textY + 30)}`);
  LPRINT(`M${int(85)},${int(textY + 18)}`);
  LPRINT(`D${int(105)},${int(textY + 18)}`);
  // N
  LPRINT(`M${int(120)},${int(textY + 30)}`);
  LPRINT(`D${int(120)},${int(textY)}`);
  LPRINT(`D${int(140)},${int(textY + 30)}`);
  LPRINT(`D${int(140)},${int(textY)}`);
  // D
  LPRINT(`M${int(150)},${int(textY)}`);
  LPRINT(`D${int(150)},${int(textY + 30)}`);
  LPRINT(`D${int(165)},${int(textY + 30)}`);
  LPRINT(`D${int(175)},${int(textY + 20)}`);
  LPRINT(`D${int(175)},${int(textY + 10)}`);
  LPRINT(`D${int(165)},${int(textY)}`);
  LPRINT(`D${int(150)},${int(textY)}`);
  
  // OR (en haut à droite)
  textY = 50;
  // O
  dessinerCercle(cellSize + 100, textY + 15, 15, 20);
  // R
  LPRINT(`M${int(cellSize + 125)},${int(textY + 30)}`);
  LPRINT(`D${int(cellSize + 125)},${int(textY)}`);
  LPRINT(`D${int(cellSize + 145)},${int(textY)}`);
  LPRINT(`D${int(cellSize + 150)},${int(textY + 8)}`);
  LPRINT(`D${int(cellSize + 145)},${int(textY + 15)}`);
  LPRINT(`D${int(cellSize + 125)},${int(textY + 15)}`);
  LPRINT(`M${int(cellSize + 135)},${int(textY + 15)}`);
  LPRINT(`D${int(cellSize + 155)},${int(textY + 30)}`);
  
  // NOT (en bas à gauche)
  textY = cellSize + 50;
  // N
  LPRINT(`M${int(80)},${int(textY + 30)}`);
  LPRINT(`D${int(80)},${int(textY)}`);
  LPRINT(`D${int(100)},${int(textY + 30)}`);
  LPRINT(`D${int(100)},${int(textY)}`);
  // O
  dessinerCercle(120, textY + 15, 12, 20);
  // T
  LPRINT(`M${int(140)},${int(textY)}`);
  LPRINT(`D${int(165)},${int(textY)}`);
  LPRINT(`M${int(152)},${int(textY)}`);
  LPRINT(`D${int(152)},${int(textY + 30)}`);
  
  // XOR (en bas à droite)
  textY = cellSize + 50;
  // X
  LPRINT(`M${int(cellSize + 70)},${int(textY)}`);
  LPRINT(`D${int(cellSize + 95)},${int(textY + 30)}`);
  LPRINT(`M${int(cellSize + 95)},${int(textY)}`);
  LPRINT(`D${int(cellSize + 70)},${int(textY + 30)}`);
  // O
  dessinerCercle(cellSize + 115, textY + 15, 12, 20);
  // R
  LPRINT(`M${int(cellSize + 135)},${int(textY + 30)}`);
  LPRINT(`D${int(cellSize + 135)},${int(textY)}`);
  LPRINT(`D${int(cellSize + 155)},${int(textY)}`);
  LPRINT(`D${int(cellSize + 160)},${int(textY + 8)}`);
  LPRINT(`D${int(cellSize + 155)},${int(textY + 15)}`);
  LPRINT(`D${int(cellSize + 135)},${int(textY + 15)}`);
  LPRINT(`M${int(cellSize + 145)},${int(textY + 15)}`);
  LPRINT(`D${int(cellSize + 165)},${int(textY + 30)}`);
  
  // Lignes de séparation
  LPRINT(`M${int(cellSize)},${int(20)}`);
  LPRINT(`D${int(cellSize)},${int(NP - 20)}`);
  LPRINT(`M${int(20)},${int(cellSize)}`);
  LPRINT(`D${int(NP - 20)},${int(cellSize)}`);
  
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

    let filename = "Genuary07_BooleanAlgebra.svg";
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
    save("Genuary07_BooleanAlgebra.png");
  }
}
