// GENUARY JAN. 25: Organic Geometry
// Géométrie organique - formes naturelles avec des éléments géométriques

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Dessiner une fleur géométrique
function dessinerFleur(cx, cy, petales, rayonInt, rayonExt) {
  for (let p = 0; p < petales; p++) {
    let angle = (2 * PI * p) / petales;
    let nextAngle = (2 * PI * (p + 1)) / petales;
    
    // Chaque pétale est une forme géométrique
    let innerX = cx + rayonInt * cos(angle);
    let innerY = cy + rayonInt * sin(angle);
    let outerX = cx + rayonExt * cos(angle + PI / petales);
    let outerY = cy + rayonExt * sin(angle + PI / petales);
    let nextInnerX = cx + rayonInt * cos(nextAngle);
    let nextInnerY = cy + rayonInt * sin(nextAngle);
    
    LPRINT(`M${int(constrainCoord(innerX))},${int(constrainCoord(innerY))}`);
    LPRINT(`D${int(constrainCoord(outerX))},${int(constrainCoord(outerY))}`);
    LPRINT(`D${int(constrainCoord(nextInnerX))},${int(constrainCoord(nextInnerY))}`);
  }
  
  // Centre de la fleur
  for (let i = 0; i <= 20; i++) {
    let a = (2 * PI * i) / 20;
    let x = cx + rayonInt * 0.5 * cos(a);
    let y = cy + rayonInt * 0.5 * sin(a);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
}

// Dessiner une feuille géométrique
function dessinerFeuille(x, y, longueur, angle, largeur) {
  let tipX = x + longueur * cos(angle);
  let tipY = y + longueur * sin(angle);
  
  let perpAngle = angle + PI/2;
  let side1X = x + largeur * cos(perpAngle);
  let side1Y = y + largeur * sin(perpAngle);
  let side2X = x - largeur * cos(perpAngle);
  let side2Y = y - largeur * sin(perpAngle);
  
  // Forme de losange pour la feuille
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(side1X + longueur * 0.3 * cos(angle)))},${int(constrainCoord(side1Y + longueur * 0.3 * sin(angle)))}`);
  LPRINT(`D${int(constrainCoord(tipX))},${int(constrainCoord(tipY))}`);
  LPRINT(`D${int(constrainCoord(side2X + longueur * 0.3 * cos(angle)))},${int(constrainCoord(side2Y + longueur * 0.3 * sin(angle)))}`);
  LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  
  // Nervure centrale
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(tipX))},${int(constrainCoord(tipY))}`);
}

// Dessiner une branche avec motif récursif
function dessinerBranche(x, y, longueur, angle, profondeur) {
  if (profondeur <= 0 || longueur < 10) return;
  
  let endX = x + longueur * cos(angle);
  let endY = y + longueur * sin(angle);
  
  LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  LPRINT(`D${int(constrainCoord(endX))},${int(constrainCoord(endY))}`);
  
  // Branches secondaires
  dessinerBranche(endX, endY, longueur * 0.7, angle - PI/6, profondeur - 1);
  dessinerBranche(endX, endY, longueur * 0.7, angle + PI/6, profondeur - 1);
}

function dessiner() {
  PALETTE("GREEN");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Arbre central avec branches géométriques
  OUTPUT = "";
  STROKE_COLOR = "#3D2817";
  stroke_(STROKE_COLOR);
  
  // Tronc principal
  let trunkX = DX;
  let trunkY = NP - 100;
  
  LPRINT(`M${int(trunkX - 20)},${int(trunkY)}`);
  LPRINT(`D${int(trunkX - 10)},${int(trunkY - 200)}`);
  LPRINT(`D${int(trunkX + 10)},${int(trunkY - 200)}`);
  LPRINT(`D${int(trunkX + 20)},${int(trunkY)}`);
  
  TRACE();
  
  // Branches
  OUTPUT = "";
  STROKE_COLOR = "#5D4037";
  stroke_(STROKE_COLOR);
  
  dessinerBranche(DX, trunkY - 200, 100, -PI/2, 5);
  dessinerBranche(DX - 30, trunkY - 150, 80, -PI/2 - PI/6, 4);
  dessinerBranche(DX + 30, trunkY - 150, 80, -PI/2 + PI/6, 4);
  
  TRACE();
  
  // Feuilles géométriques
  OUTPUT = "";
  STROKE_COLOR = "#228B22";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 40; i++) {
    let angle = random(TWO_PI);
    let dist = random(50, 200);
    let lx = DX + dist * cos(angle) * 0.8;
    let ly = trunkY - 250 + dist * sin(angle) * 0.5;
    let leafAngle = angle + random(-0.5, 0.5);
    dessinerFeuille(lx, ly, random(15, 35), leafAngle, random(5, 12));
  }
  
  TRACE();
  
  // Fleurs géométriques dispersées
  OUTPUT = "";
  STROKE_COLOR = "#FF69B4";
  stroke_(STROKE_COLOR);
  
  let flowerPositions = [
    [150, 600], [250, 650], [350, 620],
    [550, 640], [650, 600], [720, 660],
    [100, 500], [700, 520]
  ];
  
  for (let pos of flowerPositions) {
    let petales = floor(random(5, 9));
    dessinerFleur(pos[0], pos[1], petales, 10, 30);
  }
  
  TRACE();
  
  // Herbes géométriques (triangles)
  OUTPUT = "";
  STROKE_COLOR = "#006400";
  stroke_(STROKE_COLOR);
  
  for (let x = 50; x < NP - 50; x += 15) {
    let h = random(20, 50);
    let baseY = NP - 50 + random(-10, 10);
    
    LPRINT(`M${int(x)},${int(baseY)}`);
    LPRINT(`D${int(x + random(-5, 5))},${int(baseY - h)}`);
    LPRINT(`D${int(x + 8)},${int(baseY)}`);
  }
  
  TRACE();
  
  // Papillons géométriques
  OUTPUT = "";
  STROKE_COLOR = "#9932CC";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 5; i++) {
    let bx = random(100, 700);
    let by = random(200, 500);
    let wingSize = random(15, 30);
    
    // Ailes triangulaires
    // Aile gauche
    LPRINT(`M${int(bx)},${int(by)}`);
    LPRINT(`D${int(bx - wingSize)},${int(by - wingSize * 0.5)}`);
    LPRINT(`D${int(bx - wingSize * 0.8)},${int(by + wingSize * 0.3)}`);
    LPRINT(`D${int(bx)},${int(by)}`);
    
    // Aile droite
    LPRINT(`M${int(bx)},${int(by)}`);
    LPRINT(`D${int(bx + wingSize)},${int(by - wingSize * 0.5)}`);
    LPRINT(`D${int(bx + wingSize * 0.8)},${int(by + wingSize * 0.3)}`);
    LPRINT(`D${int(bx)},${int(by)}`);
    
    // Corps
    LPRINT(`M${int(bx)},${int(by - 10)}`);
    LPRINT(`D${int(bx)},${int(by + 15)}`);
  }
  
  TRACE();
  
  // Soleil géométrique
  OUTPUT = "";
  STROKE_COLOR = "#FFD700";
  stroke_(STROKE_COLOR);
  
  let sunX = 100;
  let sunY = 100;
  let sunR = 40;
  
  // Cercle central
  for (let i = 0; i <= 30; i++) {
    let a = (2 * PI * i) / 30;
    let x = sunX + sunR * cos(a);
    let y = sunY + sunR * sin(a);
    if (i == 0) LPRINT(`M${int(x)},${int(y)}`);
    else LPRINT(`D${int(x)},${int(y)}`);
  }
  
  // Rayons triangulaires
  for (let i = 0; i < 12; i++) {
    let a = (2 * PI * i) / 12;
    let r1 = sunR + 10;
    let r2 = sunR + 40;
    
    let x1 = sunX + r1 * cos(a - 0.15);
    let y1 = sunY + r1 * sin(a - 0.15);
    let x2 = sunX + r2 * cos(a);
    let y2 = sunY + r2 * sin(a);
    let x3 = sunX + r1 * cos(a + 0.15);
    let y3 = sunY + r1 * sin(a + 0.15);
    
    LPRINT(`M${int(x1)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
    LPRINT(`D${int(x3)},${int(y3)}`);
  }
  
  TRACE();
  
  // Sol avec motif géométrique
  OUTPUT = "";
  STROKE_COLOR = "#8B4513";
  stroke_(STROKE_COLOR);
  
  LPRINT(`M${int(0)},${int(NP - 50)}`);
  LPRINT(`D${int(NP)},${int(NP - 50)}`);
  
  // Motif de sol
  for (let x = 0; x < NP; x += 40) {
    LPRINT(`M${int(x)},${int(NP - 50)}`);
    LPRINT(`D${int(x + 20)},${int(NP - 30)}`);
    LPRINT(`D${int(x + 40)},${int(NP - 50)}`);
  }
  
  TRACE();
}

function setup() {
  randomSeed(123);
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

    randomSeed(123);
    dessiner();

    let filename = "Genuary25_OrganicGeometry.svg";
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
    save("Genuary25_OrganicGeometry.png");
  }
}
