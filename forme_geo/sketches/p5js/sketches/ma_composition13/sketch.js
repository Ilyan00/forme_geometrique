// GENUARY JAN. 13: Self portrait
// Auto-portrait génératif avec formes géométriques

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;
let variation = 0;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Dessiner une ellipse
function dessinerEllipse(CX, CY, rayonX, rayonY, segments, rotation) {
  for (let i = 0; i <= segments; i++) {
    let angle = (2 * PI * i) / segments + rotation;
    let X = int(constrainCoord(CX + rayonX * cos(angle)));
    let Y = int(constrainCoord(CY + rayonY * sin(angle)));
    if (i == 0) LPRINT(`M${X},${Y}`);
    else LPRINT(`D${X},${Y}`);
  }
}

// Dessiner une ligne
function dessinerLigne(x1, y1, x2, y2) {
  LPRINT(`M${int(constrainCoord(x1))},${int(constrainCoord(y1))}`);
  LPRINT(`D${int(constrainCoord(x2))},${int(constrainCoord(y2))}`);
}

// Arc de cercle
function dessinerArc(CX, CY, rayon, startAngle, endAngle, segments) {
  for (let i = 0; i <= segments; i++) {
    let angle = startAngle + (endAngle - startAngle) * (i / segments);
    let X = int(constrainCoord(CX + rayon * cos(angle)));
    let Y = int(constrainCoord(CY + rayon * sin(angle)));
    if (i == 0) LPRINT(`M${X},${Y}`);
    else LPRINT(`D${X},${Y}`);
  }
}

function dessiner() {
  PALETTE("GREEN");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  let faceX = DX;
  let faceY = DY - 30;
  let faceW = 140 + variation * 10;
  let faceH = 180 + variation * 5;
  
  // Cheveux (en arrière-plan)
  OUTPUT = "";
  STROKE_COLOR = "#2C1810";
  stroke_(STROKE_COLOR);
  
  // Volume des cheveux
  dessinerEllipse(faceX, faceY - 50, faceW + 30, faceH * 0.7, 50, 0);
  
  // Mèches de cheveux
  for (let i = 0; i < 20; i++) {
    let startAngle = -PI * 0.8 + (i * PI * 0.08);
    let hairLength = 80 + random(-20, 20) + variation * 5;
    let startX = faceX + (faceW + 20) * cos(startAngle);
    let startY = faceY - 50 + (faceH * 0.6) * sin(startAngle);
    let endX = startX + hairLength * cos(startAngle + PI/4);
    let endY = startY + hairLength * sin(startAngle + PI/4) + 50;
    
    // Courbe pour les cheveux
    let midX = (startX + endX) / 2 + random(-15, 15);
    let midY = (startY + endY) / 2;
    
    LPRINT(`M${int(constrainCoord(startX))},${int(constrainCoord(startY))}`);
    LPRINT(`D${int(constrainCoord(midX))},${int(constrainCoord(midY))}`);
    LPRINT(`D${int(constrainCoord(endX))},${int(constrainCoord(endY))}`);
  }
  
  TRACE();
  
  // Forme du visage (ovale)
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  dessinerEllipse(faceX, faceY, faceW, faceH, 60, 0);
  
  // Contour intérieur pour donner de la profondeur
  dessinerEllipse(faceX, faceY, faceW - 10, faceH - 10, 50, 0);
  
  TRACE();
  
  // Oreilles
  OUTPUT = "";
  STROKE_COLOR = "#007B61";
  stroke_(STROKE_COLOR);
  
  let earY = faceY + 10;
  let earW = 25;
  let earH = 45;
  
  // Oreille gauche
  dessinerEllipse(faceX - faceW - 5, earY, earW, earH, 30, 0);
  // Détail intérieur
  dessinerEllipse(faceX - faceW - 5, earY, earW * 0.6, earH * 0.6, 20, 0);
  
  // Oreille droite
  dessinerEllipse(faceX + faceW + 5, earY, earW, earH, 30, 0);
  dessinerEllipse(faceX + faceW + 5, earY, earW * 0.6, earH * 0.6, 20, 0);
  
  TRACE();
  
  // Yeux
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  let eyeY = faceY - 20 + variation * 2;
  let eyeSpacing = 55 + variation * 3;
  let eyeW = 35;
  let eyeH = 20;
  
  // Oeil gauche
  dessinerEllipse(faceX - eyeSpacing, eyeY, eyeW, eyeH, 30, 0);
  // Iris
  dessinerEllipse(faceX - eyeSpacing, eyeY, 15, 15, 25, 0);
  // Pupille
  dessinerEllipse(faceX - eyeSpacing, eyeY, 6, 6, 15, 0);
  // Reflet
  dessinerEllipse(faceX - eyeSpacing - 5, eyeY - 5, 3, 3, 10, 0);
  
  // Oeil droit
  dessinerEllipse(faceX + eyeSpacing, eyeY, eyeW, eyeH, 30, 0);
  // Iris
  dessinerEllipse(faceX + eyeSpacing, eyeY, 15, 15, 25, 0);
  // Pupille
  dessinerEllipse(faceX + eyeSpacing, eyeY, 6, 6, 15, 0);
  // Reflet
  dessinerEllipse(faceX + eyeSpacing - 5, eyeY - 5, 3, 3, 10, 0);
  
  TRACE();
  
  // Sourcils
  OUTPUT = "";
  STROKE_COLOR = "#3D2817";
  stroke_(STROKE_COLOR);
  
  let browY = eyeY - 35;
  
  // Sourcil gauche
  dessinerArc(faceX - eyeSpacing, browY + 10, 40, -PI * 0.85, -PI * 0.15, 20);
  
  // Sourcil droit
  dessinerArc(faceX + eyeSpacing, browY + 10, 40, -PI * 0.85, -PI * 0.15, 20);
  
  TRACE();
  
  // Nez
  OUTPUT = "";
  STROKE_COLOR = "#007B61";
  stroke_(STROKE_COLOR);
  
  let noseY = faceY + 30;
  
  // Ligne du nez
  dessinerLigne(faceX, eyeY + 15, faceX - 5, noseY);
  dessinerLigne(faceX - 5, noseY, faceX, noseY + 20);
  dessinerLigne(faceX, noseY + 20, faceX + 5, noseY);
  
  // Narines
  dessinerArc(faceX - 12, noseY + 15, 8, 0, PI, 10);
  dessinerArc(faceX + 12, noseY + 15, 8, 0, PI, 10);
  
  TRACE();
  
  // Bouche
  OUTPUT = "";
  STROKE_COLOR = "#8B4513";
  stroke_(STROKE_COLOR);
  
  let mouthY = faceY + 80 + variation * 3;
  let mouthW = 50 + variation * 5;
  
  // Lèvre supérieure
  dessinerArc(faceX, mouthY, mouthW, -PI, 0, 25);
  // Petite courbe pour l'arc de cupidon
  dessinerArc(faceX, mouthY - 5, mouthW * 0.3, -PI * 0.8, -PI * 0.2, 10);
  
  // Lèvre inférieure
  dessinerArc(faceX, mouthY, mouthW, 0, PI * 0.8, 20);
  
  // Sourire léger
  dessinerArc(faceX, mouthY + 5, mouthW * 1.2, PI * 0.1, PI * 0.9, 20);
  
  TRACE();
  
  // Cou
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  let neckTop = faceY + faceH - 20;
  let neckW = 50;
  
  dessinerLigne(faceX - neckW, neckTop, faceX - neckW - 10, neckTop + 100);
  dessinerLigne(faceX + neckW, neckTop, faceX + neckW + 10, neckTop + 100);
  
  // Col de chemise
  dessinerLigne(faceX - neckW - 10, neckTop + 100, faceX - 150, neckTop + 150);
  dessinerLigne(faceX + neckW + 10, neckTop + 100, faceX + 150, neckTop + 150);
  dessinerLigne(faceX, neckTop + 80, faceX, neckTop + 130);
  
  TRACE();
  
  // Cadre décoratif
  OUTPUT = "";
  STROKE_COLOR = "#005B51";
  stroke_(STROKE_COLOR);
  
  dessinerEllipse(DX, DY, NP * 0.45, NP * 0.45, 80, 0);
  
  TRACE();
}

function setup() {
  randomSeed(42);
  INIT();
  dessiner();
}

function mousePressed() {
  variation = random(-3, 3);
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

    let filename = "Genuary13_SelfPortrait.svg";
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
    save("Genuary13_SelfPortrait.png");
  }
}
