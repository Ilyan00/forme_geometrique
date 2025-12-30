// GENUARY JAN. 24: Perfectionist's nightmare
// Cauchemar du perfectionniste - tout est intentionnellement imparfait

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function dessinerLigneImparfaite(x1, y1, x2, y2, wobble) {
  let steps = 20;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(x1, x2, t) + random(-wobble, wobble);
    let y = lerp(y1, y2, t) + random(-wobble, wobble);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
}

function dessinerCercleImparfait(cx, cy, r, wobble) {
  let segments = 40;
  for (let i = 0; i <= segments; i++) {
    let angle = (2 * PI * i) / segments;
    let rr = r + random(-wobble, wobble);
    let x = cx + rr * cos(angle) + random(-wobble/2, wobble/2);
    let y = cy + rr * sin(angle) + random(-wobble/2, wobble/2);
    if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
}

function dessinerRectImparfait(x, y, w, h, wobble) {
  // Les coins ne se rejoignent pas parfaitement
  dessinerLigneImparfaite(x + random(-5, 5), y + random(-5, 5), 
                          x + w + random(-5, 5), y + random(-5, 5), wobble);
  dessinerLigneImparfaite(x + w + random(-5, 5), y + random(-5, 5), 
                          x + w + random(-5, 5), y + h + random(-5, 5), wobble);
  dessinerLigneImparfaite(x + w + random(-5, 5), y + h + random(-5, 5), 
                          x + random(-5, 5), y + h + random(-5, 5), wobble);
  dessinerLigneImparfaite(x + random(-5, 5), y + h + random(-5, 5), 
                          x + random(-5, 5), y + random(-5, 5), wobble);
}

function dessiner() {
  // Fond pas tout à fait uniforme
  BG_COLOR = "#F5F2EA";
  
  if (!_SVG_) {
    background(245, 242, 234);
    // Taches sur le fond
    noStroke();
    for (let i = 0; i < 50; i++) {
      fill(random(230, 250), random(225, 245), random(220, 240));
      ellipse(random(NP), random(NP), random(20, 100), random(20, 100));
    }
  }

  randomSeed(42); // Pour la reproductibilité du chaos
  
  // Grille imparfaite
  OUTPUT = "";
  STROKE_COLOR = "#444444";
  stroke_(STROKE_COLOR);
  
  // Lignes verticales (pas droites, pas espacées régulièrement)
  for (let i = 0; i < 10; i++) {
    let x = 80 + i * 75 + random(-15, 15);
    dessinerLigneImparfaite(x, 50 + random(-20, 20), x + random(-30, 30), NP - 50 + random(-20, 20), 8);
  }
  
  // Lignes horizontales (encore pire)
  for (let i = 0; i < 10; i++) {
    let y = 80 + i * 75 + random(-20, 20);
    dessinerLigneImparfaite(50 + random(-20, 20), y, NP - 50 + random(-20, 20), y + random(-25, 25), 10);
  }
  
  TRACE();
  
  // Cercles qui ne sont pas vraiment des cercles
  OUTPUT = "";
  STROKE_COLOR = "#8B0000";
  stroke_(STROKE_COLOR);
  
  let circlePositions = [
    [200, 200], [400, 180], [600, 220],
    [150, 450], [420, 400], [650, 480],
    [250, 650], [500, 620], [700, 700]
  ];
  
  for (let pos of circlePositions) {
    let wobble = random(5, 20);
    let r = random(30, 80);
    dessinerCercleImparfait(pos[0] + random(-30, 30), pos[1] + random(-30, 30), r, wobble);
  }
  
  TRACE();
  
  // Rectangles qui ne ferment pas
  OUTPUT = "";
  STROKE_COLOR = "#006400";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 6; i++) {
    let x = random(100, 600);
    let y = random(100, 600);
    let w = random(50, 150);
    let h = random(50, 150);
    dessinerRectImparfait(x, y, w, h, 6);
  }
  
  TRACE();
  
  // Triangles bancals
  OUTPUT = "";
  STROKE_COLOR = "#4B0082";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 5; i++) {
    let cx = random(150, 650);
    let cy = random(150, 650);
    let size = random(40, 100);
    
    let p1x = cx + random(-20, 20);
    let p1y = cy - size + random(-15, 15);
    let p2x = cx - size * 0.6 + random(-20, 20);
    let p2y = cy + size * 0.5 + random(-15, 15);
    let p3x = cx + size * 0.6 + random(-20, 20);
    let p3y = cy + size * 0.5 + random(-15, 15);
    
    dessinerLigneImparfaite(p1x, p1y, p2x, p2y, 5);
    dessinerLigneImparfaite(p2x, p2y, p3x, p3y, 5);
    dessinerLigneImparfaite(p3x, p3y, p1x + random(-10, 10), p1y + random(-10, 10), 5); // Ne ferme pas!
  }
  
  TRACE();
  
  // Spirale déformée
  OUTPUT = "";
  STROKE_COLOR = "#8B4513";
  stroke_(STROKE_COLOR);
  
  let spiraleCX = 400 + random(-50, 50);
  let spiraleCY = 400 + random(-50, 50);
  
  for (let theta = 0; theta <= 6 * PI; theta += 0.1) {
    let r = theta * 8 + random(-10, 10);
    let x = spiraleCX + r * cos(theta + random(-0.2, 0.2));
    let y = spiraleCY + r * sin(theta + random(-0.2, 0.2));
    if (theta == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
  }
  
  TRACE();
  
  // Points dispersés de manière non uniforme
  OUTPUT = "";
  STROKE_COLOR = "#2F4F4F";
  stroke_(STROKE_COLOR);
  
  for (let i = 0; i < 100; i++) {
    let x = random(NP);
    let y = random(NP);
    let r = random(2, 8);
    dessinerCercleImparfait(x, y, r, 2);
  }
  
  TRACE();
  
  // Cadre intentionnellement mal aligné
  OUTPUT = "";
  STROKE_COLOR = "#000000";
  stroke_(STROKE_COLOR);
  
  dessinerLigneImparfaite(25 + random(-5, 5), 25 + random(-5, 5), NP - 25 + random(-5, 5), 28 + random(-5, 5), 3);
  dessinerLigneImparfaite(NP - 22 + random(-5, 5), 25 + random(-5, 5), NP - 25 + random(-5, 5), NP - 22 + random(-5, 5), 3);
  dessinerLigneImparfaite(NP - 25 + random(-5, 5), NP - 28 + random(-5, 5), 28 + random(-5, 5), NP - 25 + random(-5, 5), 3);
  dessinerLigneImparfaite(22 + random(-5, 5), NP - 25 + random(-5, 5), 25 + random(-5, 5), 28 + random(-5, 5), 3);
  
  TRACE();
}

function setup() {
  INIT();
  dessiner();
}

function mousePressed() {
  randomSeed(millis());
  if (!_SVG_) {
    background(245, 242, 234);
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
    svgElmt.style.backgroundColor = "#F5F2EA";
    svgVertices = [];
    svgStrokeColor = STROKE_COLOR;

    randomSeed(42);
    dessiner();

    let filename = "Genuary24_PerfectionistNightmare.svg";
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
    save("Genuary24_PerfectionistNightmare.png");
  }
}
