// GENUARY JAN. 22: Pen plotter ready
// Art prêt pour traceur - lignes vectorielles optimisées

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function dessiner() {
  PALETTE("NEW_YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Pour un plotter, on veut des lignes continues, pas de remplissage
  // Optimisé pour minimiser les levées de stylo
  
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  // ========== Motif principal : Rose géométrique ==========
  // Une seule ligne continue qui forme une rose
  
  let rosePoints = [];
  let k = 7; // Paramètre de la rose
  let n = 4;
  let maxR = NP * 0.35;
  
  // Générer les points de la rose
  for (let theta = 0; theta <= 2 * PI * n; theta += 0.01) {
    let r = maxR * cos(k * theta / n);
    rosePoints.push({
      x: DX + r * cos(theta),
      y: DY + r * sin(theta)
    });
  }
  
  // Dessiner la rose comme une ligne continue
  for (let i = 0; i < rosePoints.length; i++) {
    let p = rosePoints[i];
    if (i == 0) LPRINT(`M${int(constrainCoord(p.x))},${int(constrainCoord(p.y))}`);
    else LPRINT(`D${int(constrainCoord(p.x))},${int(constrainCoord(p.y))}`);
  }
  
  TRACE();
  
  // ========== Cercles concentriques (lignes continues) ==========
  OUTPUT = "";
  STROKE_COLOR = "#4169E1";
  stroke_(STROKE_COLOR);
  
  for (let r = 50; r <= maxR + 100; r += 25) {
    for (let i = 0; i <= 80; i++) {
      let angle = (2 * PI * i) / 80;
      let x = DX + r * cos(angle);
      let y = DY + r * sin(angle);
      if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
      else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    }
  }
  
  TRACE();
  
  // ========== Hachures dans les coins (style gravure) ==========
  OUTPUT = "";
  STROKE_COLOR = "#1a1a3a";
  stroke_(STROKE_COLOR);
  
  // Coin supérieur gauche
  let hatchSpacing = 8;
  let hatchLength = 80;
  
  for (let i = 0; i < 10; i++) {
    let x1 = 40 + i * hatchSpacing;
    let y1 = 40;
    let x2 = 40;
    let y2 = 40 + i * hatchSpacing;
    LPRINT(`M${int(x1)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
  }
  
  // Coin supérieur droit
  for (let i = 0; i < 10; i++) {
    let x1 = NP - 40 - i * hatchSpacing;
    let y1 = 40;
    let x2 = NP - 40;
    let y2 = 40 + i * hatchSpacing;
    LPRINT(`M${int(x1)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
  }
  
  // Coin inférieur gauche
  for (let i = 0; i < 10; i++) {
    let x1 = 40;
    let y1 = NP - 40 - i * hatchSpacing;
    let x2 = 40 + i * hatchSpacing;
    let y2 = NP - 40;
    LPRINT(`M${int(x1)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
  }
  
  // Coin inférieur droit
  for (let i = 0; i < 10; i++) {
    let x1 = NP - 40;
    let y1 = NP - 40 - i * hatchSpacing;
    let x2 = NP - 40 - i * hatchSpacing;
    let y2 = NP - 40;
    LPRINT(`M${int(x1)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
  }
  
  TRACE();
  
  // ========== Spirographe ==========
  OUTPUT = "";
  STROKE_COLOR = "#8B0000";
  stroke_(STROKE_COLOR);
  
  let R = 100; // Grand cercle
  let r = 35;  // Petit cercle
  let d = 50;  // Distance du point
  
  let spiroPoints = [];
  for (let t = 0; t <= 2 * PI * 7; t += 0.02) {
    let x = DX + (R - r) * cos(t) + d * cos((R - r) / r * t);
    let y = DY + (R - r) * sin(t) - d * sin((R - r) / r * t);
    spiroPoints.push({x, y});
  }
  
  for (let i = 0; i < spiroPoints.length; i++) {
    let p = spiroPoints[i];
    if (i == 0) LPRINT(`M${int(constrainCoord(p.x))},${int(constrainCoord(p.y))}`);
    else LPRINT(`D${int(constrainCoord(p.x))},${int(constrainCoord(p.y))}`);
  }
  
  TRACE();
  
  // ========== Lignes radiales ==========
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  let rayCount = 36;
  for (let i = 0; i < rayCount; i++) {
    let angle = (2 * PI * i) / rayCount;
    let x1 = DX + (maxR + 120) * cos(angle);
    let y1 = DY + (maxR + 120) * sin(angle);
    let x2 = DX + (maxR + 150) * cos(angle);
    let y2 = DY + (maxR + 150) * sin(angle);
    LPRINT(`M${int(constrainCoord(x1))},${int(constrainCoord(y1))}`);
    LPRINT(`D${int(constrainCoord(x2))},${int(constrainCoord(y2))}`);
  }
  
  TRACE();
  
  // ========== Cadre simple (optimisé - une seule ligne continue) ==========
  OUTPUT = "";
  STROKE_COLOR = "#000000";
  stroke_(STROKE_COLOR);
  
  let m = 25;
  LPRINT(`M${m},${m}`);
  LPRINT(`D${NP - m},${m}`);
  LPRINT(`D${NP - m},${NP - m}`);
  LPRINT(`D${m},${NP - m}`);
  LPRINT(`D${m},${m}`);
  
  m = 30;
  LPRINT(`M${m},${m}`);
  LPRINT(`D${NP - m},${m}`);
  LPRINT(`D${NP - m},${NP - m}`);
  LPRINT(`D${m},${NP - m}`);
  LPRINT(`D${m},${m}`);
  
  TRACE();
  
  // ========== Texte "PLOTTER READY" en lignes ==========
  OUTPUT = "";
  STROKE_COLOR = "#333333";
  stroke_(STROKE_COLOR);
  
  // Ligne décorative sous le texte
  LPRINT(`M${int(DX - 100)},${int(NP - 50)}`);
  LPRINT(`D${int(DX + 100)},${int(NP - 50)}`);
  
  LPRINT(`M${int(DX - 80)},${int(NP - 45)}`);
  LPRINT(`D${int(DX + 80)},${int(NP - 45)}`);
  
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

    let filename = "Genuary22_PlotterReady.svg";
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
    save("Genuary22_PlotterReady.png");
  }
}
