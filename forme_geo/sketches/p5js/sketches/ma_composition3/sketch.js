// GENUARY JAN. 3: Fibonacci forever
// Spirale de Fibonacci avec carrés dorés

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Générer la suite de Fibonacci
function fibonacci(n) {
  let fib = [1, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

function dessiner() {
  PALETTE("NEW_YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  let fib = fibonacci(15);
  let scale = 2.5;
  
  // Position de départ (centre de la spirale)
  let startX = DX + 50;
  let startY = DY + 100;
  
  // Direction initiale : 0=droite, 1=haut, 2=gauche, 3=bas
  let dir = 0;
  let x = startX;
  let y = startY;
  
  // Dessiner les carrés de Fibonacci
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < fib.length; i++) {
    let size = fib[i] * scale;
    
    // Dessiner le carré
    let x1, y1, x2, y2, x3, y3, x4, y4;
    
    switch (dir) {
      case 0: // vers la droite
        x1 = x; y1 = y;
        x2 = x + size; y2 = y;
        x3 = x + size; y3 = y - size;
        x4 = x; y4 = y - size;
        x = x + size;
        y = y - size;
        break;
      case 1: // vers le haut
        x1 = x; y1 = y;
        x2 = x; y2 = y - size;
        x3 = x - size; y3 = y - size;
        x4 = x - size; y4 = y;
        x = x - size;
        break;
      case 2: // vers la gauche
        x1 = x; y1 = y;
        x2 = x - size; y2 = y;
        x3 = x - size; y3 = y + size;
        x4 = x; y4 = y + size;
        x = x - size;
        y = y + size;
        break;
      case 3: // vers le bas
        x1 = x; y1 = y;
        x2 = x; y2 = y + size;
        x3 = x + size; y3 = y + size;
        x4 = x + size; y4 = y;
        x = x + size;
        break;
    }
    
    // Contraindre les coordonnées
    x1 = int(constrainCoord(x1)); y1 = int(constrainCoord(y1));
    x2 = int(constrainCoord(x2)); y2 = int(constrainCoord(y2));
    x3 = int(constrainCoord(x3)); y3 = int(constrainCoord(y3));
    x4 = int(constrainCoord(x4)); y4 = int(constrainCoord(y4));
    
    LPRINT(`M${x1},${y1}`);
    LPRINT(`D${x2},${y2}`);
    LPRINT(`D${x3},${y3}`);
    LPRINT(`D${x4},${y4}`);
    LPRINT(`D${x1},${y1}`);
    
    dir = (dir + 1) % 4;
  }
  
  TRACE();
  
  // Dessiner la spirale dorée
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  // Réinitialiser pour la spirale
  x = startX;
  y = startY;
  dir = 0;
  
  let spiralePoints = [];
  
  for (let i = 0; i < fib.length; i++) {
    let size = fib[i] * scale;
    let centerX, centerY, startAngle;
    
    switch (dir) {
      case 0:
        centerX = x + size;
        centerY = y;
        startAngle = PI;
        x = x + size;
        y = y - size;
        break;
      case 1:
        centerX = x;
        centerY = y - size;
        startAngle = PI / 2;
        x = x - size;
        break;
      case 2:
        centerX = x - size;
        centerY = y;
        startAngle = 0;
        x = x - size;
        y = y + size;
        break;
      case 3:
        centerX = x;
        centerY = y + size;
        startAngle = -PI / 2;
        x = x + size;
        break;
    }
    
    // Arc de quart de cercle
    let segments = 20;
    for (let j = 0; j <= segments; j++) {
      let angle = startAngle + (PI / 2) * (j / segments);
      let px = centerX + size * cos(angle);
      let py = centerY + size * sin(angle);
      spiralePoints.push({ x: px, y: py });
    }
    
    dir = (dir + 1) % 4;
  }
  
  // Tracer la spirale
  for (let i = 0; i < spiralePoints.length; i++) {
    let px = int(constrainCoord(spiralePoints[i].x));
    let py = int(constrainCoord(spiralePoints[i].y));
    if (i == 0) LPRINT(`M${px},${py}`);
    else LPRINT(`D${px},${py}`);
  }
  
  TRACE();
  
  // Ajouter des cercles aux intersections basés sur Fibonacci
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  for (let i = 3; i < Math.min(fib.length, 12); i++) {
    let angle = i * 137.5 * PI / 180; // Angle d'or
    let r = fib[i] * scale * 0.3;
    let cx = DX + r * cos(angle);
    let cy = DY + r * sin(angle);
    let circleRadius = fib[i - 2] * scale * 0.15;
    
    // Dessiner un petit cercle
    let segments = 30;
    for (let j = 0; j <= segments; j++) {
      let a = (2 * PI * j) / segments;
      let px = int(constrainCoord(cx + circleRadius * cos(a)));
      let py = int(constrainCoord(cy + circleRadius * sin(a)));
      if (j == 0) LPRINT(`M${px},${py}`);
      else LPRINT(`D${px},${py}`);
    }
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

    let filename = "Genuary03_Fibonacci.svg";
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
    save("Genuary03_Fibonacci.png");
  }
}
