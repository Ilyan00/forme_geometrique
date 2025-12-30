// GENUARY JAN. 16: Order and disorder
// Transition de l'ordre au chaos

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

function dessinerCercle(cx, cy, r, segments) {
  for (let i = 0; i <= segments; i++) {
    let angle = (2 * PI * i) / segments;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
}

function dessiner() {
  PALETTE("NEW_BLUE");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // La quantité de désordre augmente de gauche à droite
  
  // Grille de lignes verticales
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  let gridSpacing = 30;
  
  for (let x = 50; x < NP - 50; x += gridSpacing) {
    // Calculer le facteur de désordre basé sur la position x
    let disorder = map(x, 50, NP - 50, 0, 1);
    disorder = pow(disorder, 1.5); // Courbe exponentielle
    
    for (let y = 50; y < NP - 50; y += gridSpacing) {
      // Position de base ordonnée
      let baseX = x;
      let baseY = y;
      
      // Ajouter du chaos proportionnel
      let offsetX = (random(-1, 1) * gridSpacing * 0.8) * disorder;
      let offsetY = (random(-1, 1) * gridSpacing * 0.8) * disorder;
      
      let finalX = baseX + offsetX;
      let finalY = baseY + offsetY;
      
      // Dessiner un point/petit cercle
      let size = 3 + disorder * random(0, 8);
      dessinerCercle(finalX, finalY, size, 12);
    }
  }
  
  TRACE();
  
  // Lignes de connexion
  OUTPUT = "";
  STROKE_COLOR = "#4169E1";
  stroke_(STROKE_COLOR);
  
  for (let x = 50; x < NP - 50; x += gridSpacing) {
    let disorder = pow(map(x, 50, NP - 50, 0, 1), 1.5);
    
    for (let y = 50; y < NP - 80; y += gridSpacing) {
      let x1 = x + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      let y1 = y + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      let x2 = x + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      let y2 = y + gridSpacing + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      
      // Ligne droite ou courbe selon le désordre
      if (disorder < 0.3) {
        dessinerLigne(x1, y1, x2, y2);
      } else {
        // Ligne brisée
        let midX = (x1 + x2) / 2 + random(-20, 20) * disorder;
        let midY = (y1 + y2) / 2 + random(-20, 20) * disorder;
        dessinerLigne(x1, y1, midX, midY);
        dessinerLigne(midX, midY, x2, y2);
      }
    }
  }
  
  // Lignes horizontales
  for (let y = 50; y < NP - 50; y += gridSpacing) {
    for (let x = 50; x < NP - 80; x += gridSpacing) {
      let disorder = pow(map(x, 50, NP - 50, 0, 1), 1.5);
      
      let x1 = x + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      let y1 = y + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      let x2 = x + gridSpacing + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      let y2 = y + (random(-1, 1) * gridSpacing * 0.5) * disorder;
      
      if (random() > disorder * 0.3) {
        dessinerLigne(x1, y1, x2, y2);
      }
    }
  }
  
  TRACE();
  
  // Éléments supplémentaires : carrés qui se déforment
  OUTPUT = "";
  STROKE_COLOR = "#FF6B6B";
  stroke_(STROKE_COLOR);
  
  for (let x = 80; x < NP - 80; x += gridSpacing * 2) {
    let disorder = pow(map(x, 80, NP - 80, 0, 1), 1.5);
    
    for (let y = 80; y < NP - 80; y += gridSpacing * 2) {
      let size = 20;
      
      // Les 4 coins du carré avec déformation
      let corners = [
        {x: x - size + random(-size, size) * disorder, y: y - size + random(-size, size) * disorder},
        {x: x + size + random(-size, size) * disorder, y: y - size + random(-size, size) * disorder},
        {x: x + size + random(-size, size) * disorder, y: y + size + random(-size, size) * disorder},
        {x: x - size + random(-size, size) * disorder, y: y + size + random(-size, size) * disorder}
      ];
      
      // Dessiner le quadrilatère déformé
      LPRINT(`M${int(constrainCoord(corners[0].x))},${int(constrainCoord(corners[0].y))}`);
      for (let i = 1; i < 4; i++) {
        LPRINT(`D${int(constrainCoord(corners[i].x))},${int(constrainCoord(corners[i].y))}`);
      }
      LPRINT(`D${int(constrainCoord(corners[0].x))},${int(constrainCoord(corners[0].y))}`);
    }
  }
  
  TRACE();
  
  // Texte visuel ORDER -> DISORDER
  OUTPUT = "";
  STROKE_COLOR = "#FFFFFF";
  stroke_(STROKE_COLOR);
  
  // Flèche de transition
  dessinerLigne(50, NP - 30, NP - 50, NP - 30);
  dessinerLigne(NP - 70, NP - 40, NP - 50, NP - 30);
  dessinerLigne(NP - 70, NP - 20, NP - 50, NP - 30);
  
  // "O" stylisé à gauche (ordonné)
  dessinerCercle(80, NP - 30, 15, 20);
  
  // "X" stylisé à droite (chaos)
  dessinerLigne(NP - 95, NP - 45, NP - 65, NP - 15);
  dessinerLigne(NP - 65, NP - 45, NP - 95, NP - 15);
  
  TRACE();
  
  // Gradient de fond avec des lignes
  OUTPUT = "";
  STROKE_COLOR = "#1a1a3a";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 5; i++) {
    let y = 25 + i * 3;
    dessinerLigne(50, y, NP - 50, y);
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

    randomSeed(42);
    dessiner();

    let filename = "Genuary16_OrderDisorder.svg";
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
    save("Genuary16_OrderDisorder.png");
  }
}
