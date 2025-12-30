// GENUARY JAN. 26: Recursive Grids
// Grilles récursives - subdivision fractale

let NP = 800,
  PI = Math.PI;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function dessinerRect(x, y, w, h) {
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + w))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + w))},${int(constrainCoord(y + h))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y + h))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
}

function dessinerCercle(cx, cy, r) {
  for (let i = 0; i <= 25; i++) {
    let angle = (2 * PI * i) / 25;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
}

function dessinerDiagonales(x, y, w, h) {
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + w))},${int(constrainCoord(y + h))}`);
  LPRINT(`M${int(constrainCoord(x + w))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y + h))}`);
}

// Subdivision récursive avec différents motifs
function subdivide(x, y, w, h, depth, maxDepth) {
  // Toujours dessiner le rectangle de la cellule
  dessinerRect(x, y, w, h);
  
  // Condition d'arrêt
  if (depth >= maxDepth || w < 20 || h < 20) {
    // Dessiner un motif final selon la profondeur
    let pattern = depth % 4;
    if (pattern == 0) {
      // Cercle inscrit
      dessinerCercle(x + w/2, y + h/2, min(w, h) * 0.4);
    } else if (pattern == 1) {
      // Diagonales
      dessinerDiagonales(x, y, w, h);
    } else if (pattern == 2) {
      // Cercle et diagonales
      dessinerCercle(x + w/2, y + h/2, min(w, h) * 0.3);
      dessinerDiagonales(x, y, w, h);
    }
    // pattern 3 = juste le rectangle
    return;
  }
  
  // Décider du type de subdivision
  let subdivType = floor(random(4));
  
  if (subdivType == 0) {
    // Division en 4 (grille 2x2)
    let hw = w / 2;
    let hh = h / 2;
    subdivide(x, y, hw, hh, depth + 1, maxDepth);
    subdivide(x + hw, y, hw, hh, depth + 1, maxDepth);
    subdivide(x, y + hh, hw, hh, depth + 1, maxDepth);
    subdivide(x + hw, y + hh, hw, hh, depth + 1, maxDepth);
  } else if (subdivType == 1) {
    // Division horizontale
    let split = h * random(0.3, 0.7);
    subdivide(x, y, w, split, depth + 1, maxDepth);
    subdivide(x, y + split, w, h - split, depth + 1, maxDepth);
  } else if (subdivType == 2) {
    // Division verticale
    let split = w * random(0.3, 0.7);
    subdivide(x, y, split, h, depth + 1, maxDepth);
    subdivide(x + split, y, w - split, h, depth + 1, maxDepth);
  } else {
    // Division en 9 (grille 3x3) mais seulement certaines cellules
    let tw = w / 3;
    let th = h / 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (random() > 0.3) {
          subdivide(x + i * tw, y + j * th, tw, th, depth + 1, maxDepth);
        } else {
          dessinerRect(x + i * tw, y + j * th, tw, th);
        }
      }
    }
  }
}

function dessiner() {
  PALETTE("NEW_YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  // Grille principale subdivisée récursivement
  let margin = 40;
  let gridSize = 2;
  let cellW = (NP - margin * 2) / gridSize;
  let cellH = (NP - margin * 2) / gridSize;
  
  randomSeed(42);
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let maxDepth = 3 + floor(random(3));
      subdivide(x, y, cellW, cellH, 0, maxDepth);
    }
  }
  
  TRACE();
  
  // Cadre extérieur
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  dessinerRect(margin - 5, margin - 5, NP - margin * 2 + 10, NP - margin * 2 + 10);
  dessinerRect(margin - 10, margin - 10, NP - margin * 2 + 20, NP - margin * 2 + 20);
  
  TRACE();
  
  // Points aux intersections principales
  OUTPUT = "";
  STROKE_COLOR = "#FF6347";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      let px = margin + i * cellW;
      let py = margin + j * cellH;
      dessinerCercle(px, py, 5);
    }
  }
  
  TRACE();
}

function setup() {
  INIT();
  dessiner();
}

function mousePressed() {
  randomSeed(millis());
  if (!_SVG_) {
    background_(BG_COLOR);
  }
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

    randomSeed(42);
    dessiner();

    let filename = "Genuary26_RecursiveGrids.svg";
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
    save("Genuary26_RecursiveGrids.png");
  }
}
