// GENUARY JAN. 5: Write "Genuary"
// Écrire "GENUARY" sans utiliser de police - avec des formes géométriques

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Dessiner une ligne
function drawLine(x1, y1, x2, y2) {
  LPRINT(`M${int(constrainCoord(x1))},${int(constrainCoord(y1))}`);
  LPRINT(`D${int(constrainCoord(x2))},${int(constrainCoord(y2))}`);
}

// Dessiner un arc
function drawArc(cx, cy, r, startAngle, endAngle, segments) {
  for (let i = 0; i <= segments; i++) {
    let angle = startAngle + (endAngle - startAngle) * (i / segments);
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
}

// Lettres définies par segments
function dessinerG(x, y, w, h) {
  // Arc du C
  drawArc(x + w/2, y + h/2, w/2, -PI*0.7, PI*0.7, 20);
  // Barre horizontale du G
  drawLine(x + w/2, y + h/2, x + w, y + h/2);
  // Barre verticale courte
  drawLine(x + w, y + h/2, x + w, y + h*0.65);
}

function dessinerE(x, y, w, h) {
  drawLine(x, y, x, y + h);
  drawLine(x, y, x + w, y);
  drawLine(x, y + h/2, x + w*0.8, y + h/2);
  drawLine(x, y + h, x + w, y + h);
}

function dessinerN(x, y, w, h) {
  drawLine(x, y + h, x, y);
  drawLine(x, y, x + w, y + h);
  drawLine(x + w, y + h, x + w, y);
}

function dessinerU(x, y, w, h) {
  drawLine(x, y, x, y + h*0.7);
  drawArc(x + w/2, y + h*0.7, w/2, PI, 0, 15);
  drawLine(x + w, y + h*0.7, x + w, y);
}

function dessinerA(x, y, w, h) {
  drawLine(x, y + h, x + w/2, y);
  drawLine(x + w/2, y, x + w, y + h);
  drawLine(x + w*0.2, y + h*0.6, x + w*0.8, y + h*0.6);
}

function dessinerR(x, y, w, h) {
  drawLine(x, y + h, x, y);
  drawLine(x, y, x + w*0.7, y);
  drawArc(x + w*0.7, y + h*0.25, h*0.25, -PI/2, PI/2, 12);
  drawLine(x + w*0.7, y + h*0.5, x, y + h*0.5);
  drawLine(x + w*0.3, y + h*0.5, x + w, y + h);
}

function dessinerY(x, y, w, h) {
  drawLine(x, y, x + w/2, y + h*0.5);
  drawLine(x + w, y, x + w/2, y + h*0.5);
  drawLine(x + w/2, y + h*0.5, x + w/2, y + h);
}

function dessiner() {
  PALETTE("GREEN");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Dessiner "GENUARY" en grand au centre
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  let letterWidth = 80;
  let letterHeight = 120;
  let spacing = 15;
  let totalWidth = 7 * letterWidth + 6 * spacing;
  let startX = (NP - totalWidth) / 2;
  let startY = DY - letterHeight/2;
  
  // G
  dessinerG(startX, startY, letterWidth, letterHeight);
  // E
  dessinerE(startX + (letterWidth + spacing), startY, letterWidth, letterHeight);
  // N
  dessinerN(startX + 2*(letterWidth + spacing), startY, letterWidth, letterHeight);
  // U
  dessinerU(startX + 3*(letterWidth + spacing), startY, letterWidth, letterHeight);
  // A
  dessinerA(startX + 4*(letterWidth + spacing), startY, letterWidth, letterHeight);
  // R
  dessinerR(startX + 5*(letterWidth + spacing), startY, letterWidth, letterHeight);
  // Y
  dessinerY(startX + 6*(letterWidth + spacing), startY, letterWidth, letterHeight);
  
  TRACE();
  
  // Décoration : cercles autour
  OUTPUT = "";
  STROKE_COLOR = "#007B61";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 20; i++) {
    let angle = (2 * PI * i) / 20;
    let radius = NP * 0.42;
    let cx = DX + radius * cos(angle);
    let cy = DY + radius * sin(angle);
    let r = 15 + 10 * sin(i * 0.5);
    
    for (let j = 0; j <= 20; j++) {
      let a = (2 * PI * j) / 20;
      let px = cx + r * cos(a);
      let py = cy + r * sin(a);
      if (j == 0) LPRINT(`M${int(constrainCoord(px))},${int(constrainCoord(py))}`);
      else LPRINT(`D${int(constrainCoord(px))},${int(constrainCoord(py))}`);
    }
  }
  
  // Lignes décoratives
  for (let i = 0; i < 12; i++) {
    let angle = (2 * PI * i) / 12;
    let r1 = NP * 0.35;
    let r2 = NP * 0.48;
    drawLine(DX + r1 * cos(angle), DY + r1 * sin(angle), 
             DX + r2 * cos(angle), DY + r2 * sin(angle));
  }
  
  TRACE();
  
  // Cadre
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  let margin = 30;
  drawLine(margin, margin, NP - margin, margin);
  drawLine(NP - margin, margin, NP - margin, NP - margin);
  drawLine(NP - margin, NP - margin, margin, NP - margin);
  drawLine(margin, NP - margin, margin, margin);
  
  // Double cadre
  margin = 50;
  drawLine(margin, margin, NP - margin, margin);
  drawLine(NP - margin, margin, NP - margin, NP - margin);
  drawLine(NP - margin, NP - margin, margin, NP - margin);
  drawLine(margin, NP - margin, margin, margin);
  
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

    let filename = "Genuary05_WriteGenuary.svg";
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
    save("Genuary05_WriteGenuary.png");
  }
}
