// GENUARY JAN. 17: Wallpaper group
// Pattern répétitif - Groupe de symétrie p6m (hexagonal avec miroirs)

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

// Dessiner le motif de base qui sera répété
function dessinerMotifBase(cx, cy, size) {
  // Triangle équilatéral avec décorations
  let h = size * sqrt(3) / 2;
  
  // Points du triangle
  let p1 = {x: cx, y: cy - h * 2/3};
  let p2 = {x: cx - size/2, y: cy + h/3};
  let p3 = {x: cx + size/2, y: cy + h/3};
  
  // Contour du triangle
  dessinerLigne(p1.x, p1.y, p2.x, p2.y);
  dessinerLigne(p2.x, p2.y, p3.x, p3.y);
  dessinerLigne(p3.x, p3.y, p1.x, p1.y);
  
  // Décoration intérieure - petit triangle
  let innerScale = 0.5;
  let ip1 = {x: cx, y: cy - h * 2/3 * innerScale};
  let ip2 = {x: cx - size/2 * innerScale, y: cy + h/3 * innerScale};
  let ip3 = {x: cx + size/2 * innerScale, y: cy + h/3 * innerScale};
  
  dessinerLigne(ip1.x, ip1.y, ip2.x, ip2.y);
  dessinerLigne(ip2.x, ip2.y, ip3.x, ip3.y);
  dessinerLigne(ip3.x, ip3.y, ip1.x, ip1.y);
  
  // Lignes vers le centre
  dessinerLigne(p1.x, p1.y, cx, cy);
  dessinerLigne(p2.x, p2.y, cx, cy);
  dessinerLigne(p3.x, p3.y, cx, cy);
}

// Dessiner un hexagone complet avec le motif répété par symétrie
function dessinerHexagoneSymetrique(cx, cy, size) {
  // 6 triangles formant l'hexagone avec rotation
  for (let i = 0; i < 6; i++) {
    let angle = i * PI / 3;
    let h = size * sqrt(3) / 2;
    
    // Centre du triangle
    let tcx = cx + h * 2/3 * cos(angle + PI/2);
    let tcy = cy + h * 2/3 * sin(angle + PI/2);
    
    // Points du triangle avec rotation
    for (let j = 0; j < 3; j++) {
      let a1 = angle + j * 2 * PI / 3;
      let a2 = angle + (j + 1) * 2 * PI / 3;
      
      let x1 = cx + size * cos(a1 + PI/6);
      let y1 = cy + size * sin(a1 + PI/6);
      let x2 = cx + size * cos(a2 + PI/6);
      let y2 = cy + size * sin(a2 + PI/6);
      
      dessinerLigne(x1, y1, x2, y2);
    }
    
    // Décoration : lignes du centre vers les sommets
    for (let j = 0; j < 6; j++) {
      let a = j * PI / 3 + PI / 6;
      let x = cx + size * cos(a);
      let y = cy + size * sin(a);
      dessinerLigne(cx, cy, x, y);
    }
  }
  
  // Cercles concentriques
  for (let r = size * 0.3; r < size; r += size * 0.35) {
    for (let i = 0; i <= 30; i++) {
      let angle = (2 * PI * i) / 30;
      let x = cx + r * cos(angle);
      let y = cy + r * sin(angle);
      if (i == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
      else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
    }
  }
  
  // Petits motifs aux sommets
  for (let i = 0; i < 6; i++) {
    let a = i * PI / 3 + PI / 6;
    let px = cx + size * 0.7 * cos(a);
    let py = cy + size * 0.7 * sin(a);
    
    // Petit losange
    let lsize = size * 0.1;
    dessinerLigne(px - lsize, py, px, py - lsize);
    dessinerLigne(px, py - lsize, px + lsize, py);
    dessinerLigne(px + lsize, py, px, py + lsize);
    dessinerLigne(px, py + lsize, px - lsize, py);
  }
}

function dessiner() {
  PALETTE("YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  OUTPUT = "";
  STROKE_COLOR = "#040A53";
  stroke_(STROKE_COLOR);
  
  // Paramètres de la grille hexagonale
  let hexSize = 80;
  let hexWidth = hexSize * 2;
  let hexHeight = hexSize * sqrt(3);
  
  // Dessiner la grille de wallpaper
  for (let row = -1; row <= NP / hexHeight + 1; row++) {
    for (let col = -1; col <= NP / (hexWidth * 0.75) + 1; col++) {
      let cx = col * hexWidth * 0.75;
      let cy = row * hexHeight + (col % 2 == 0 ? 0 : hexHeight / 2);
      
      dessinerHexagoneSymetrique(cx, cy, hexSize);
    }
  }
  
  TRACE();
  
  // Couche de décoration supplémentaire
  OUTPUT = "";
  STROKE_COLOR = "#6A5ACD";
  stroke_(STROKE_COLOR);
  
  for (let row = -1; row <= NP / hexHeight + 1; row++) {
    for (let col = -1; col <= NP / (hexWidth * 0.75) + 1; col++) {
      let cx = col * hexWidth * 0.75;
      let cy = row * hexHeight + (col % 2 == 0 ? 0 : hexHeight / 2);
      
      // Points aux intersections
      for (let i = 0; i < 6; i++) {
        let a = i * PI / 3;
        let px = cx + hexSize * cos(a);
        let py = cy + hexSize * sin(a);
        
        // Petit cercle
        for (let j = 0; j <= 12; j++) {
          let angle = (2 * PI * j) / 12;
          let x = px + 5 * cos(angle);
          let y = py + 5 * sin(angle);
          if (j == 0) LPRINT(`M${int(constrainCoord(x))},${int(constrainCoord(y))}`);
          else LPRINT(`D${int(constrainCoord(x))},${int(constrainCoord(y))}`);
        }
      }
    }
  }
  
  TRACE();
  
  // Cadre
  OUTPUT = "";
  STROKE_COLOR = "#040A53";
  stroke_(STROKE_COLOR);
  
  let margin = 20;
  dessinerLigne(margin, margin, NP - margin, margin);
  dessinerLigne(NP - margin, margin, NP - margin, NP - margin);
  dessinerLigne(NP - margin, NP - margin, margin, NP - margin);
  dessinerLigne(margin, NP - margin, margin, margin);
  
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

    let filename = "Genuary17_WallpaperGroup.svg";
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
    save("Genuary17_WallpaperGroup.png");
  }
}
