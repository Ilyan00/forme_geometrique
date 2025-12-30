// GENUARY JAN. 1: One color, one shape
// Une seule couleur, une seule forme - Cercles concentriques

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Dessiner un cercle avec des segments
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
  // Une seule couleur : rouge profond
  PALETTE("RED");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  OUTPUT = "";
  STROKE_COLOR = "#8F080E";
  stroke_(STROKE_COLOR);

  // Une seule forme : le cercle
  // Cercles concentriques avec variation de taille
  let nbCercles = 40;
  let rayonMax = NP * 0.45;
  
  for (let i = 1; i <= nbCercles; i++) {
    let rayon = (rayonMax * i) / nbCercles;
    let segments = 60 + i * 2; // Plus de segments pour les grands cercles
    dessinerCercle(DX, DY, rayon, segments);
  }

  // Cercles décalés créant un motif
  let nbGroupes = 6;
  for (let g = 0; g < nbGroupes; g++) {
    let angleGroupe = (2 * PI * g) / nbGroupes;
    let decalage = NP * 0.15;
    let cx = DX + decalage * cos(angleGroupe);
    let cy = DY + decalage * sin(angleGroupe);
    
    for (let i = 1; i <= 15; i++) {
      let rayon = (NP * 0.12 * i) / 15;
      dessinerCercle(cx, cy, rayon, 40);
    }
  }

  // Petits cercles formant un motif en spirale
  let spiraleTours = 5;
  let spiralePoints = 80;
  for (let i = 0; i < spiralePoints; i++) {
    let t = i / spiralePoints;
    let angle = spiraleTours * 2 * PI * t;
    let rayon = NP * 0.05 + NP * 0.35 * t;
    let cx = DX + rayon * cos(angle);
    let cy = DY + rayon * sin(angle);
    dessinerCercle(cx, cy, NP * 0.02 + NP * 0.01 * t, 20);
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

    let filename = "Genuary01_OneColorOneShape.svg";
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
    save("Genuary01_OneColorOneShape.png");
  }
}
