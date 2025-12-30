// GENUARY JAN. 12: Boxes only
// Composition avec uniquement des rectangles

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Dessiner un rectangle
function dessinerRect(x, y, w, h) {
  let x1 = int(constrainCoord(x));
  let y1 = int(constrainCoord(y));
  let x2 = int(constrainCoord(x + w));
  let y2 = int(constrainCoord(y + h));
  
  LPRINT(`M${x1},${y1}`);
  LPRINT(`D${x2},${y1}`);
  LPRINT(`D${x2},${y2}`);
  LPRINT(`D${x1},${y2}`);
  LPRINT(`D${x1},${y1}`);
}

// Subdivision récursive
function subdivide(x, y, w, h, depth) {
  if (depth <= 0 || w < 20 || h < 20) {
    dessinerRect(x, y, w, h);
    return;
  }
  
  // Décider si on divise horizontalement ou verticalement
  let horizontal = w < h ? true : (h < w ? false : random() > 0.5);
  
  // Probabilité de ne pas subdiviser
  if (random() > 0.7) {
    dessinerRect(x, y, w, h);
    return;
  }
  
  if (horizontal) {
    let split = h * random(0.3, 0.7);
    subdivide(x, y, w, split, depth - 1);
    subdivide(x, y + split, w, h - split, depth - 1);
  } else {
    let split = w * random(0.3, 0.7);
    subdivide(x, y, split, h, depth - 1);
    subdivide(x + split, y, w - split, h, depth - 1);
  }
}

function dessiner() {
  PALETTE("YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Grille principale de boîtes subdivisées
  OUTPUT = "";
  STROKE_COLOR = "#040A53";
  stroke_(STROKE_COLOR);
  
  let margin = 50;
  let gridSize = 3;
  let cellW = (NP - margin * 2) / gridSize;
  let cellH = (NP - margin * 2) / gridSize;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      subdivide(x + 5, y + 5, cellW - 10, cellH - 10, 4);
    }
  }
  
  TRACE();
  
  // Boîtes concentriques au centre
  OUTPUT = "";
  STROKE_COLOR = "#6A5ACD";
  stroke_(STROKE_COLOR);
  
  let centerX = DX;
  let centerY = DY;
  
  for (let s = 20; s < 150; s += 15) {
    dessinerRect(centerX - s, centerY - s, s * 2, s * 2);
  }
  
  TRACE();
  
  // Motif de boîtes en diagonale
  OUTPUT = "";
  STROKE_COLOR = "#8B4513";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 20; i++) {
    let size = 10 + i * 3;
    let x = margin + i * 35;
    let y = margin + i * 35;
    if (x + size < NP - margin && y + size < NP - margin) {
      dessinerRect(x, y, size, size);
    }
  }
  
  // Diagonale inverse
  for (let i = 0; i < 20; i++) {
    let size = 10 + i * 3;
    let x = NP - margin - i * 35 - size;
    let y = margin + i * 35;
    if (x > margin && y + size < NP - margin) {
      dessinerRect(x, y, size, size);
    }
  }
  
  TRACE();
  
  // Bandes horizontales de rectangles
  OUTPUT = "";
  STROKE_COLOR = "#228B22";
  stroke_(STROKE_COLOR);
  
  let bandY = [120, 350, 580];
  for (let by of bandY) {
    let x = margin;
    while (x < NP - margin - 20) {
      let w = random(15, 60);
      let h = random(10, 30);
      if (x + w > NP - margin) w = NP - margin - x;
      dessinerRect(x, by, w, h);
      x += w + random(5, 15);
    }
  }
  
  TRACE();
  
  // Petits carrés formant un pattern
  OUTPUT = "";
  STROKE_COLOR = "#DC143C";
  stroke_(STROKE_COLOR);
  
  for (let x = 100; x < NP - 100; x += 50) {
    for (let y = 100; y < NP - 100; y += 50) {
      if (random() > 0.5) {
        let size = random(5, 15);
        dessinerRect(x - size/2, y - size/2, size, size);
      }
    }
  }
  
  TRACE();
  
  // Cadre extérieur
  OUTPUT = "";
  STROKE_COLOR = "#040A53";
  stroke_(STROKE_COLOR);
  
  dessinerRect(20, 20, NP - 40, NP - 40);
  dessinerRect(30, 30, NP - 60, NP - 60);
  dessinerRect(40, 40, NP - 80, NP - 80);
  
  TRACE();
  
  // Coins décorés avec des boîtes imbriquées
  OUTPUT = "";
  STROKE_COLOR = "#FF8C00";
  stroke_(STROKE_COLOR);
  
  let corners = [[60, 60], [NP - 130, 60], [60, NP - 130], [NP - 130, NP - 130]];
  for (let corner of corners) {
    let cx = corner[0];
    let cy = corner[1];
    for (let s = 10; s <= 60; s += 10) {
      dessinerRect(cx + 30 - s/2, cy + 30 - s/2, s, s);
    }
  }
  
  TRACE();
}

function setup() {
  randomSeed(42);
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

    dessiner();

    let filename = "Genuary12_BoxesOnly.svg";
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
    save("Genuary12_BoxesOnly.png");
  }
}
