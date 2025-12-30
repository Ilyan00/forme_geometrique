// GENUARY JAN. 20: One line
// Une seule ligne continue - Courbe de Hilbert + spirale

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Génération de la courbe de Hilbert
let hilbertPoints = [];

function hilbert(x, y, ax, ay, bx, by, depth) {
  let w = abs(ax + ay);
  let h = abs(bx + by);
  
  let dax = ax > 0 ? 1 : ax < 0 ? -1 : 0;
  let day = ay > 0 ? 1 : ay < 0 ? -1 : 0;
  let dbx = bx > 0 ? 1 : bx < 0 ? -1 : 0;
  let dby = by > 0 ? 1 : by < 0 ? -1 : 0;
  
  if (depth <= 0) {
    hilbertPoints.push({
      x: x + (ax + bx) / 2,
      y: y + (ay + by) / 2
    });
    return;
  }
  
  let ax2 = floor(ax / 2);
  let ay2 = floor(ay / 2);
  let bx2 = floor(bx / 2);
  let by2 = floor(by / 2);
  
  let w2 = abs(ax2 + ay2);
  let h2 = abs(bx2 + by2);
  
  if (2 * w > 3 * h) {
    if ((ax > 0) != (ay > 0)) {
      hilbert(x, y, ax2, ay2, bx, by, depth - 1);
      hilbert(x + ax2, y + ay2, ax - ax2, ay - ay2, bx, by, depth - 1);
    } else {
      hilbert(x + ax2, y + ay2, ax - ax2, ay - ay2, bx, by, depth - 1);
      hilbert(x, y, ax2, ay2, bx, by, depth - 1);
    }
  } else {
    if ((bx > 0) != (by > 0)) {
      hilbert(x, y, bx2, by2, ax2, ay2, depth - 1);
      hilbert(x + bx2, y + by2, ax, ay, bx - bx2, by - by2, depth - 1);
      hilbert(x + (ax - dax) + (bx2 - dbx), y + (ay - day) + (by2 - dby), -bx2, -by2, -(ax - ax2), -(ay - ay2), depth - 1);
    } else {
      hilbert(x + (ax - dax) + (bx2 - dbx), y + (ay - day) + (by2 - dby), -bx2, -by2, -(ax - ax2), -(ay - ay2), depth - 1);
      hilbert(x + bx2, y + by2, ax, ay, bx - bx2, by - by2, depth - 1);
      hilbert(x, y, bx2, by2, ax2, ay2, depth - 1);
    }
  }
}

function dessiner() {
  PALETTE("NEW_BLUE");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  // Générer une ligne continue complexe
  // Combinaison de plusieurs motifs reliés
  
  let allPoints = [];
  
  // 1. Commencer par une spirale au centre
  let spiralePoints = 200;
  let spiraleTours = 4;
  let maxR = NP * 0.15;
  
  for (let i = 0; i < spiralePoints; i++) {
    let t = i / spiralePoints;
    let angle = spiraleTours * 2 * PI * t;
    let r = maxR * t;
    allPoints.push({
      x: DX + r * cos(angle),
      y: DY + r * sin(angle)
    });
  }
  
  // 2. Transition vers un cercle
  let lastPoint = allPoints[allPoints.length - 1];
  let circlePoints = 100;
  let circleR = maxR;
  let startAngle = atan2(lastPoint.y - DY, lastPoint.x - DX);
  
  for (let i = 0; i <= circlePoints; i++) {
    let t = i / circlePoints;
    let angle = startAngle + 2 * PI * t;
    allPoints.push({
      x: DX + circleR * cos(angle),
      y: DY + circleR * sin(angle)
    });
  }
  
  // 3. Serpenter vers l'extérieur avec des vagues
  lastPoint = allPoints[allPoints.length - 1];
  let wavePoints = 300;
  
  for (let i = 0; i < wavePoints; i++) {
    let t = i / wavePoints;
    let baseR = maxR + NP * 0.25 * t;
    let waveR = baseR + sin(t * 20) * 15;
    let angle = startAngle + 2 * PI * t * 3;
    allPoints.push({
      x: DX + waveR * cos(angle),
      y: DY + waveR * sin(angle)
    });
  }
  
  // 4. Former un carré arrondi
  lastPoint = allPoints[allPoints.length - 1];
  let squareSize = NP * 0.35;
  let squarePoints = 200;
  
  for (let i = 0; i < squarePoints; i++) {
    let t = i / squarePoints;
    let angle = t * 2 * PI;
    
    // Superellipse (squircle)
    let n = 4;
    let r = squareSize / pow(pow(abs(cos(angle)), n) + pow(abs(sin(angle)), n), 1/n);
    
    allPoints.push({
      x: DX + r * cos(angle),
      y: DY + r * sin(angle)
    });
  }
  
  // 5. Zigzag vers les coins
  lastPoint = allPoints[allPoints.length - 1];
  let zigzagPoints = 150;
  
  for (let i = 0; i < zigzagPoints; i++) {
    let t = i / zigzagPoints;
    let angle = t * 2 * PI * 2;
    let r = NP * 0.35 + NP * 0.08 * sin(t * 30);
    allPoints.push({
      x: DX + r * cos(angle),
      y: DY + r * sin(angle)
    });
  }
  
  // 6. Boucles décoratives
  lastPoint = allPoints[allPoints.length - 1];
  let loopCount = 8;
  let loopPoints = 50;
  
  for (let loop = 0; loop < loopCount; loop++) {
    let loopAngle = (loop / loopCount) * 2 * PI;
    let loopCX = DX + NP * 0.38 * cos(loopAngle);
    let loopCY = DY + NP * 0.38 * sin(loopAngle);
    let loopR = 30;
    
    for (let i = 0; i <= loopPoints; i++) {
      let t = i / loopPoints;
      let a = t * 2 * PI;
      allPoints.push({
        x: loopCX + loopR * cos(a),
        y: loopCY + loopR * sin(a)
      });
    }
  }
  
  // 7. Retour au centre en spirale inversée
  lastPoint = allPoints[allPoints.length - 1];
  let returnPoints = 150;
  startAngle = atan2(lastPoint.y - DY, lastPoint.x - DX);
  let startR = dist(lastPoint.x, lastPoint.y, DX, DY);
  
  for (let i = 0; i < returnPoints; i++) {
    let t = i / returnPoints;
    let angle = startAngle + 3 * PI * t;
    let r = startR * (1 - t * 0.9);
    allPoints.push({
      x: DX + r * cos(angle),
      y: DY + r * sin(angle)
    });
  }
  
  // Dessiner tous les points comme une seule ligne continue
  for (let i = 0; i < allPoints.length; i++) {
    let p = allPoints[i];
    let px = int(constrainCoord(p.x));
    let py = int(constrainCoord(p.y));
    
    if (i == 0) {
      LPRINT(`M${px},${py}`);
    } else {
      LPRINT(`D${px},${py}`);
    }
  }
  
  TRACE();
  
  // Marquer le début et la fin
  OUTPUT = "";
  STROKE_COLOR = "#FF4500";
  stroke_(STROKE_COLOR);
  
  // Point de départ
  let start = allPoints[0];
  for (let i = 0; i <= 12; i++) {
    let angle = (2 * PI * i) / 12;
    let x = start.x + 8 * cos(angle);
    let y = start.y + 8 * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
  
  // Point d'arrivée
  let end = allPoints[allPoints.length - 1];
  for (let i = 0; i <= 12; i++) {
    let angle = (2 * PI * i) / 12;
    let x = end.x + 8 * cos(angle);
    let y = end.y + 8 * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
  
  TRACE();
  
  // Cadre
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  let m = 25;
  LPRINT(`M${m},${m}`);
  LPRINT(`D${NP-m},${m}`);
  LPRINT(`D${NP-m},${NP-m}`);
  LPRINT(`D${m},${NP-m}`);
  LPRINT(`D${m},${m}`);
  
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

    let filename = "Genuary20_OneLine.svg";
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
    save("Genuary20_OneLine.png");
  }
}
