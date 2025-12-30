// GENUARY JAN. 21: Bauhaus Poster
// Affiche inspirée du Bauhaus - formes géométriques, couleurs primaires

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

function dessinerRect(x, y, w, h) {
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + w))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(x + w))},${int(constrainCoord(y + h))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y + h))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
}

function dessinerTriangle(x1, y1, x2, y2, x3, y3) {
  LPRINT(`M${int(constrainCoord(x1))},${int(constrainCoord(y1))}`);
  LPRINT(`D${int(constrainCoord(x2))},${int(constrainCoord(y2))}`);
  LPRINT(`D${int(constrainCoord(x3))},${int(constrainCoord(y3))}`);
  LPRINT(`D${int(constrainCoord(x1))},${int(constrainCoord(y1))}`);
}

function dessiner() {
  // Fond crème typique Bauhaus
  BG_COLOR = "#F5F0E6";
  STROKE_COLOR = "#000000";
  
  if (!_SVG_) {
    background(245, 240, 230);
  }

  // ========== Composition principale ==========
  
  // Grand cercle rouge (élément dominant)
  OUTPUT = "";
  STROKE_COLOR = "#E53935"; // Rouge Bauhaus
  stroke_(STROKE_COLOR);
  
  let mainCircleX = NP * 0.35;
  let mainCircleY = NP * 0.4;
  let mainCircleR = 150;
  
  // Cercles concentriques
  for (let r = mainCircleR; r > 0; r -= 15) {
    dessinerCercle(mainCircleX, mainCircleY, r, 50);
  }
  
  TRACE();
  
  // Triangle jaune
  OUTPUT = "";
  STROKE_COLOR = "#FBC02D"; // Jaune Bauhaus
  stroke_(STROKE_COLOR);
  
  let triCenterX = NP * 0.7;
  let triCenterY = NP * 0.35;
  let triSize = 180;
  
  // Triangle principal
  dessinerTriangle(
    triCenterX, triCenterY - triSize * 0.6,
    triCenterX - triSize * 0.5, triCenterY + triSize * 0.4,
    triCenterX + triSize * 0.5, triCenterY + triSize * 0.4
  );
  
  // Triangles imbriqués
  for (let s = triSize * 0.8; s > 30; s -= 30) {
    dessinerTriangle(
      triCenterX, triCenterY - s * 0.5,
      triCenterX - s * 0.4, triCenterY + s * 0.3,
      triCenterX + s * 0.4, triCenterY + s * 0.3
    );
  }
  
  TRACE();
  
  // Carré bleu
  OUTPUT = "";
  STROKE_COLOR = "#1E88E5"; // Bleu Bauhaus
  stroke_(STROKE_COLOR);
  
  let squareX = NP * 0.45;
  let squareY = NP * 0.55;
  let squareSize = 200;
  
  // Carrés concentriques avec rotation
  for (let i = 0; i < 8; i++) {
    let s = squareSize - i * 20;
    let offset = i * 5;
    dessinerRect(squareX - s/2 + offset, squareY - s/2 + offset, s, s);
  }
  
  TRACE();
  
  // Lignes diagonales (élément graphique Bauhaus)
  OUTPUT = "";
  STROKE_COLOR = "#212121";
  stroke_(STROKE_COLOR);
  
  // Diagonales dans le coin supérieur gauche
  for (let i = 0; i < 8; i++) {
    dessinerLigne(40 + i * 20, 40, 40, 40 + i * 20);
  }
  
  // Diagonales dans le coin inférieur droit
  for (let i = 0; i < 8; i++) {
    dessinerLigne(NP - 40 - i * 20, NP - 40, NP - 40, NP - 40 - i * 20);
  }
  
  TRACE();
  
  // Lignes horizontales (typographie Bauhaus)
  OUTPUT = "";
  STROKE_COLOR = "#424242";
  stroke_(STROKE_COLOR);
  
  let lineY = NP * 0.82;
  for (let i = 0; i < 5; i++) {
    let lineWidth = NP * 0.6 - i * 50;
    dessinerLigne(DX - lineWidth/2, lineY + i * 12, DX + lineWidth/2, lineY + i * 12);
  }
  
  TRACE();
  
  // Demi-cercles
  OUTPUT = "";
  STROKE_COLOR = "#E53935";
  stroke_(STROKE_COLOR);
  
  // Demi-cercle en bas à gauche
  for (let i = 0; i <= 25; i++) {
    let angle = PI + (PI * i) / 25;
    let x = 100 + 60 * cos(angle);
    let y = NP - 100 + 60 * sin(angle);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
  
  TRACE();
  
  // Points et petits cercles (accents graphiques)
  OUTPUT = "";
  STROKE_COLOR = "#212121";
  stroke_(STROKE_COLOR);
  
  let dotPositions = [
    [NP * 0.15, NP * 0.15],
    [NP * 0.85, NP * 0.12],
    [NP * 0.1, NP * 0.7],
    [NP * 0.9, NP * 0.75]
  ];
  
  for (let pos of dotPositions) {
    dessinerCercle(pos[0], pos[1], 8, 15);
    dessinerCercle(pos[0], pos[1], 4, 10);
  }
  
  TRACE();
  
  // Texte "BAUHAUS" stylisé avec des lignes
  OUTPUT = "";
  STROKE_COLOR = "#212121";
  stroke_(STROKE_COLOR);
  
  let textX = 100;
  let textY = NP * 0.92;
  let letterH = 30;
  let letterW = 20;
  let spacing = 5;
  
  // B
  dessinerLigne(textX, textY, textX, textY - letterH);
  dessinerLigne(textX, textY - letterH, textX + letterW * 0.7, textY - letterH);
  dessinerLigne(textX + letterW * 0.7, textY - letterH, textX + letterW * 0.7, textY - letterH/2);
  dessinerLigne(textX + letterW * 0.7, textY - letterH/2, textX, textY - letterH/2);
  dessinerLigne(textX, textY - letterH/2, textX + letterW * 0.8, textY - letterH/2);
  dessinerLigne(textX + letterW * 0.8, textY - letterH/2, textX + letterW * 0.8, textY);
  dessinerLigne(textX + letterW * 0.8, textY, textX, textY);
  
  textX += letterW + spacing;
  
  // A
  dessinerLigne(textX, textY, textX + letterW/2, textY - letterH);
  dessinerLigne(textX + letterW/2, textY - letterH, textX + letterW, textY);
  dessinerLigne(textX + letterW * 0.2, textY - letterH * 0.4, textX + letterW * 0.8, textY - letterH * 0.4);
  
  textX += letterW + spacing;
  
  // U
  dessinerLigne(textX, textY - letterH, textX, textY - 5);
  dessinerLigne(textX, textY - 5, textX + letterW, textY - 5);
  dessinerLigne(textX + letterW, textY - 5, textX + letterW, textY - letterH);
  
  textX += letterW + spacing;
  
  // H
  dessinerLigne(textX, textY, textX, textY - letterH);
  dessinerLigne(textX + letterW, textY, textX + letterW, textY - letterH);
  dessinerLigne(textX, textY - letterH/2, textX + letterW, textY - letterH/2);
  
  textX += letterW + spacing;
  
  // A
  dessinerLigne(textX, textY, textX + letterW/2, textY - letterH);
  dessinerLigne(textX + letterW/2, textY - letterH, textX + letterW, textY);
  dessinerLigne(textX + letterW * 0.2, textY - letterH * 0.4, textX + letterW * 0.8, textY - letterH * 0.4);
  
  textX += letterW + spacing;
  
  // U
  dessinerLigne(textX, textY - letterH, textX, textY - 5);
  dessinerLigne(textX, textY - 5, textX + letterW, textY - 5);
  dessinerLigne(textX + letterW, textY - 5, textX + letterW, textY - letterH);
  
  textX += letterW + spacing;
  
  // S
  dessinerLigne(textX + letterW, textY - letterH, textX, textY - letterH);
  dessinerLigne(textX, textY - letterH, textX, textY - letterH/2);
  dessinerLigne(textX, textY - letterH/2, textX + letterW, textY - letterH/2);
  dessinerLigne(textX + letterW, textY - letterH/2, textX + letterW, textY);
  dessinerLigne(textX + letterW, textY, textX, textY);
  
  TRACE();
  
  // Cadre du poster
  OUTPUT = "";
  STROKE_COLOR = "#212121";
  stroke_(STROKE_COLOR);
  
  dessinerRect(25, 25, NP - 50, NP - 50);
  dessinerRect(30, 30, NP - 60, NP - 60);
  
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
    svgElmt.style.backgroundColor = "#F5F0E6";
    svgVertices = [];
    svgStrokeColor = STROKE_COLOR;

    dessiner();

    let filename = "Genuary21_BauhausPoster.svg";
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
    save("Genuary21_BauhausPoster.png");
  }
}
