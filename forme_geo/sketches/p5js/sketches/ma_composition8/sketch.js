// GENUARY JAN. 8: A City
// Ville générative - Skyline urbaine

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;
let buildings = [];

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function generateCity() {
  buildings = [];
  
  // Générer les bâtiments
  let x = 20;
  while (x < NP - 20) {
    let w = random(30, 80);
    let h = random(100, 450);
    let floors = floor(h / 25);
    let style = floor(random(4)); // 0: moderne, 1: art deco, 2: classique, 3: gratte-ciel
    
    buildings.push({
      x: x,
      width: w,
      height: h,
      floors: floors,
      style: style,
      windows: floor(w / 15),
      hasAntenna: random() > 0.7,
      hasSpire: random() > 0.8 && style == 3
    });
    
    x += w + random(5, 15);
  }
}

function dessiner() {
  PALETTE("NEW_YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Ciel avec gradient de lignes
  OUTPUT = "";
  STROKE_COLOR = "#6BA3D6";
  stroke_(STROKE_COLOR);
  
  for (let y = 0; y < NP * 0.4; y += 8) {
    let alpha = map(y, 0, NP * 0.4, 0.2, 0.8);
    if (random() < alpha) {
      LPRINT(`M${int(0)},${int(y)}`);
      LPRINT(`D${int(NP)},${int(y)}`);
    }
  }
  
  TRACE();
  
  // Soleil/Lune
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  let sunX = NP * 0.8;
  let sunY = NP * 0.15;
  let sunR = 40;
  
  for (let r = sunR; r > 0; r -= 5) {
    for (let i = 0; i <= 40; i++) {
      let angle = (2 * PI * i) / 40;
      let px = sunX + r * cos(angle);
      let py = sunY + r * sin(angle);
      if (i == 0) LPRINT(`M${int(px)},${int(py)}`);
      else LPRINT(`D${int(px)},${int(py)}`);
    }
  }
  
  TRACE();
  
  // Dessiner les bâtiments du fond vers l'avant
  let layers = [
    { yOffset: 150, scale: 0.5, color: "#8AADC8" },
    { yOffset: 80, scale: 0.7, color: "#5A8AB5" },
    { yOffset: 0, scale: 1, color: "#013ABB" }
  ];
  
  for (let layer of layers) {
    OUTPUT = "";
    STROKE_COLOR = layer.color;
    stroke_(STROKE_COLOR);
    
    for (let b of buildings) {
      let bx = b.x;
      let bw = b.width * layer.scale;
      let bh = b.height * layer.scale;
      let by = NP - 50 - layer.yOffset;
      
      // Corps du bâtiment
      let left = int(constrainCoord(bx));
      let right = int(constrainCoord(bx + bw));
      let top = int(constrainCoord(by - bh));
      let bottom = int(constrainCoord(by));
      
      // Contour
      LPRINT(`M${left},${bottom}`);
      LPRINT(`D${left},${top}`);
      
      // Toit selon le style
      if (b.style == 0) {
        // Moderne - toit plat
        LPRINT(`D${right},${top}`);
      } else if (b.style == 1) {
        // Art Deco - toit en escalier
        let steps = 3;
        let stepW = bw / (steps * 2);
        let stepH = bh * 0.05;
        for (let s = 0; s < steps; s++) {
          LPRINT(`D${int(constrainCoord(bx + stepW * s))},${int(constrainCoord(top - stepH * (steps - s)))}`);
          LPRINT(`D${int(constrainCoord(bx + bw - stepW * s))},${int(constrainCoord(top - stepH * (steps - s)))}`);
        }
        LPRINT(`D${right},${top}`);
      } else if (b.style == 2) {
        // Classique - toit triangulaire
        LPRINT(`D${int(constrainCoord(bx + bw/2))},${int(constrainCoord(top - bh * 0.1))}`);
        LPRINT(`D${right},${top}`);
      } else {
        // Gratte-ciel - pointe
        if (b.hasSpire) {
          LPRINT(`D${int(constrainCoord(bx + bw * 0.4))},${int(constrainCoord(top))}`);
          LPRINT(`D${int(constrainCoord(bx + bw/2))},${int(constrainCoord(top - bh * 0.15))}`);
          LPRINT(`D${int(constrainCoord(bx + bw * 0.6))},${int(constrainCoord(top))}`);
        }
        LPRINT(`D${right},${top}`);
      }
      
      LPRINT(`D${right},${bottom}`);
      LPRINT(`D${left},${bottom}`);
      
      // Fenêtres (seulement pour le layer principal)
      if (layer.scale == 1) {
        let windowW = bw / (b.windows * 2 + 1);
        let windowH = bh / (b.floors * 2);
        
        for (let floor = 0; floor < b.floors; floor++) {
          for (let win = 0; win < b.windows; win++) {
            let wx = bx + windowW * (win * 2 + 1);
            let wy = by - windowH * (floor * 2 + 1.5);
            
            // Certaines fenêtres sont allumées
            if (random() > 0.4) {
              let wLeft = int(constrainCoord(wx));
              let wRight = int(constrainCoord(wx + windowW * 0.8));
              let wTop = int(constrainCoord(wy - windowH * 0.6));
              let wBottom = int(constrainCoord(wy));
              
              LPRINT(`M${wLeft},${wTop}`);
              LPRINT(`D${wRight},${wTop}`);
              LPRINT(`D${wRight},${wBottom}`);
              LPRINT(`D${wLeft},${wBottom}`);
              LPRINT(`D${wLeft},${wTop}`);
            }
          }
        }
        
        // Antenne
        if (b.hasAntenna) {
          let antennaX = bx + bw / 2;
          let antennaTop = top - bh * 0.08;
          LPRINT(`M${int(constrainCoord(antennaX))},${int(constrainCoord(top))}`);
          LPRINT(`D${int(constrainCoord(antennaX))},${int(constrainCoord(antennaTop))}`);
          // Petites barres
          LPRINT(`M${int(constrainCoord(antennaX - 8))},${int(constrainCoord(antennaTop + 10))}`);
          LPRINT(`D${int(constrainCoord(antennaX + 8))},${int(constrainCoord(antennaTop + 10))}`);
        }
      }
    }
    
    TRACE();
  }
  
  // Sol / Route
  OUTPUT = "";
  STROKE_COLOR = "#333333";
  stroke_(STROKE_COLOR);
  
  let groundY = NP - 50;
  LPRINT(`M${int(0)},${int(groundY)}`);
  LPRINT(`D${int(NP)},${int(groundY)}`);
  
  // Marquages de route
  for (let x = 0; x < NP; x += 40) {
    LPRINT(`M${int(x)},${int(groundY + 20)}`);
    LPRINT(`D${int(x + 20)},${int(groundY + 20)}`);
  }
  
  TRACE();
  
  // Nuages stylisés
  OUTPUT = "";
  STROKE_COLOR = "#FFFFFF";
  stroke_(STROKE_COLOR);
  
  let cloudPositions = [[100, 80], [300, 120], [550, 70], [700, 100]];
  for (let cloud of cloudPositions) {
    let cx = cloud[0];
    let cy = cloud[1];
    for (let i = 0; i < 3; i++) {
      let r = 20 + i * 5;
      let ox = i * 25 - 25;
      for (let j = 0; j <= 20; j++) {
        let angle = (PI * j) / 20;
        let px = cx + ox + r * cos(angle + PI);
        let py = cy + r * sin(angle + PI) * 0.5;
        if (j == 0) LPRINT(`M${int(constrainCoord(px))},${int(constrainCoord(py))}`);
        else LPRINT(`D${int(constrainCoord(px))},${int(constrainCoord(py))}`);
      }
    }
  }
  
  TRACE();
}

function setup() {
  generateCity();
  INIT();
  dessiner();
}

function mousePressed() {
  generateCity();
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

    let filename = "Genuary08_ACity.svg";
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
    save("Genuary08_ACity.png");
  } else if (key == "r" || key == "R") {
    generateCity();
    if (!_SVG_) {
      background_(BG_COLOR);
    }
    dessiner();
  }
}
