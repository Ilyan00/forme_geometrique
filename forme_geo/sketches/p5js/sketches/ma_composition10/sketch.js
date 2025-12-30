// GENUARY JAN. 10: Polar coordinates
// Motifs en coordonnées polaires - Roses, spirales et patterns

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Convertir polaire en cartésien
function polarToCart(r, theta) {
  return {
    x: DX + r * cos(theta),
    y: DY + r * sin(theta)
  };
}

function dessiner() {
  PALETTE("RED");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // ========== Rose mathématique (r = cos(k*theta)) ==========
  OUTPUT = "";
  STROKE_COLOR = "#8F080E";
  stroke_(STROKE_COLOR);
  
  let k = 5; // nombre de pétales (si k est impair, k pétales; si pair, 2k pétales)
  let maxR = NP * 0.35;
  
  for (let theta = 0; theta <= 2 * PI; theta += 0.02) {
    let r = maxR * cos(k * theta);
    let pos = polarToCart(abs(r), theta + (r < 0 ? PI : 0));
    let px = int(constrainCoord(pos.x));
    let py = int(constrainCoord(pos.y));
    
    if (theta == 0) LPRINT(`M${px},${py}`);
    else LPRINT(`D${px},${py}`);
  }
  
  TRACE();
  
  // ========== Spirale d'Archimède ==========
  OUTPUT = "";
  STROKE_COLOR = "#B02020";
  stroke_(STROKE_COLOR);
  
  let a = 0;
  let b = 8; // espacement entre les spires
  
  for (let theta = 0; theta <= 6 * PI; theta += 0.05) {
    let r = a + b * theta;
    if (r > NP * 0.45) break;
    let pos = polarToCart(r, theta);
    let px = int(constrainCoord(pos.x));
    let py = int(constrainCoord(pos.y));
    
    if (theta == 0) LPRINT(`M${px},${py}`);
    else LPRINT(`D${px},${py}`);
  }
  
  TRACE();
  
  // ========== Cardioïde (r = a(1 + cos(theta))) ==========
  OUTPUT = "";
  STROKE_COLOR = "#D04040";
  stroke_(STROKE_COLOR);
  
  let cardioideA = NP * 0.12;
  
  for (let theta = 0; theta <= 2 * PI; theta += 0.03) {
    let r = cardioideA * (1 + cos(theta));
    let pos = polarToCart(r, theta);
    let px = int(constrainCoord(pos.x));
    let py = int(constrainCoord(pos.y));
    
    if (theta == 0) LPRINT(`M${px},${py}`);
    else LPRINT(`D${px},${py}`);
  }
  
  TRACE();
  
  // ========== Limaçon de Pascal ==========
  OUTPUT = "";
  STROKE_COLOR = "#600808";
  stroke_(STROKE_COLOR);
  
  let limaconA = NP * 0.15;
  let limaconB = NP * 0.08;
  
  for (let theta = 0; theta <= 2 * PI; theta += 0.03) {
    let r = limaconA + limaconB * cos(theta);
    let pos = polarToCart(r, theta);
    let px = int(constrainCoord(pos.x));
    let py = int(constrainCoord(pos.y));
    
    if (theta == 0) LPRINT(`M${px},${py}`);
    else LPRINT(`D${px},${py}`);
  }
  
  TRACE();
  
  // ========== Lemniscate de Bernoulli ==========
  OUTPUT = "";
  STROKE_COLOR = "#AA3030";
  stroke_(STROKE_COLOR);
  
  let lemnA = NP * 0.2;
  
  for (let theta = -PI/4; theta <= PI/4; theta += 0.02) {
    let r2 = lemnA * lemnA * cos(2 * theta);
    if (r2 > 0) {
      let r = sqrt(r2);
      let pos = polarToCart(r, theta);
      let px = int(constrainCoord(pos.x));
      let py = int(constrainCoord(pos.y));
      
      if (theta == -PI/4) LPRINT(`M${px},${py}`);
      else LPRINT(`D${px},${py}`);
    }
  }
  
  // Deuxième boucle
  for (let theta = 3*PI/4; theta <= 5*PI/4; theta += 0.02) {
    let r2 = lemnA * lemnA * cos(2 * theta);
    if (r2 > 0) {
      let r = sqrt(r2);
      let pos = polarToCart(r, theta);
      let px = int(constrainCoord(pos.x));
      let py = int(constrainCoord(pos.y));
      
      if (theta == 3*PI/4) LPRINT(`M${px},${py}`);
      else LPRINT(`D${px},${py}`);
    }
  }
  
  TRACE();
  
  // ========== Courbe de papillon ==========
  OUTPUT = "";
  STROKE_COLOR = "#FF6B6B";
  stroke_(STROKE_COLOR);
  
  for (let theta = 0; theta <= 12 * PI; theta += 0.02) {
    let r = exp(sin(theta)) - 2 * cos(4 * theta) + pow(sin((2 * theta - PI) / 24), 5);
    r *= NP * 0.06;
    let pos = polarToCart(r, theta);
    let px = int(constrainCoord(pos.x));
    let py = int(constrainCoord(pos.y));
    
    if (theta == 0) LPRINT(`M${px},${py}`);
    else LPRINT(`D${px},${py}`);
  }
  
  TRACE();
  
  // ========== Cercles concentriques avec modulation ==========
  OUTPUT = "";
  STROKE_COLOR = "#8F080E";
  stroke_(STROKE_COLOR);
  
  for (let rBase = 50; rBase <= NP * 0.48; rBase += 30) {
    let modFreq = floor(rBase / 50) + 3;
    let modAmp = 5 + rBase * 0.02;
    
    for (let theta = 0; theta <= 2 * PI; theta += 0.02) {
      let r = rBase + modAmp * sin(modFreq * theta);
      let pos = polarToCart(r, theta);
      let px = int(constrainCoord(pos.x));
      let py = int(constrainCoord(pos.y));
      
      if (theta == 0) LPRINT(`M${px},${py}`);
      else LPRINT(`D${px},${py}`);
    }
  }
  
  TRACE();
  
  // ========== Rayons du centre ==========
  OUTPUT = "";
  STROKE_COLOR = "#600808";
  stroke_(STROKE_COLOR);
  
  let rayCount = 36;
  for (let i = 0; i < rayCount; i++) {
    let theta = (2 * PI * i) / rayCount;
    let r1 = NP * 0.05;
    let r2 = NP * 0.48;
    
    let pos1 = polarToCart(r1, theta);
    let pos2 = polarToCart(r2, theta);
    
    LPRINT(`M${int(constrainCoord(pos1.x))},${int(constrainCoord(pos1.y))}`);
    LPRINT(`D${int(constrainCoord(pos2.x))},${int(constrainCoord(pos2.y))}`);
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

    let filename = "Genuary10_PolarCoordinates.svg";
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
    save("Genuary10_PolarCoordinates.png");
  }
}
