// GENUARY JAN. 14: Everything fits perfectly
// Tout s'emboîte parfaitement - Tessellation

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

function dessinerPolygone(points) {
  for (let i = 0; i < points.length; i++) {
    let x = int(constrainCoord(points[i].x));
    let y = int(constrainCoord(points[i].y));
    if (i == 0) LPRINT(`M${x},${y}`);
    else LPRINT(`D${x},${y}`);
  }
  // Fermer le polygone
  let x = int(constrainCoord(points[0].x));
  let y = int(constrainCoord(points[0].y));
  LPRINT(`D${x},${y}`);
}

function dessiner() {
  PALETTE("NEW_YELLOW");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // Tessellation hexagonale parfaite
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  let hexRadius = 50;
  let hexWidth = hexRadius * 2;
  let hexHeight = hexRadius * sqrt(3);
  
  for (let row = -1; row < NP / hexHeight + 1; row++) {
    for (let col = -1; col < NP / (hexWidth * 0.75) + 1; col++) {
      let x = col * hexWidth * 0.75;
      let y = row * hexHeight + (col % 2 == 0 ? 0 : hexHeight / 2);
      
      // Points de l'hexagone
      let points = [];
      for (let i = 0; i < 6; i++) {
        let angle = PI / 6 + (i * PI / 3);
        points.push({
          x: x + hexRadius * cos(angle),
          y: y + hexRadius * sin(angle)
        });
      }
      
      dessinerPolygone(points);
      
      // Petit hexagone intérieur
      let innerPoints = [];
      for (let i = 0; i < 6; i++) {
        let angle = PI / 6 + (i * PI / 3);
        innerPoints.push({
          x: x + hexRadius * 0.5 * cos(angle),
          y: y + hexRadius * 0.5 * sin(angle)
        });
      }
      dessinerPolygone(innerPoints);
    }
  }
  
  TRACE();
  
  // Grille de carrés tournés qui s'emboîtent
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  
  let squareSize = 80;
  let diagonal = squareSize * sqrt(2) / 2;
  
  for (let y = 100; y < NP - 100; y += squareSize) {
    for (let x = 100; x < NP - 100; x += squareSize) {
      // Carré droit
      let points1 = [
        {x: x, y: y},
        {x: x + squareSize, y: y},
        {x: x + squareSize, y: y + squareSize},
        {x: x, y: y + squareSize}
      ];
      dessinerPolygone(points1);
    }
  }
  
  // Carrés diagonaux dans les espaces
  for (let y = 100 + squareSize/2; y < NP - 100; y += squareSize) {
    for (let x = 100 + squareSize/2; x < NP - 100; x += squareSize) {
      let halfDiag = squareSize / 2 * 0.7;
      let points2 = [
        {x: x, y: y - halfDiag},
        {x: x + halfDiag, y: y},
        {x: x, y: y + halfDiag},
        {x: x - halfDiag, y: y}
      ];
      dessinerPolygone(points2);
    }
  }
  
  TRACE();
  
  // Triangles qui remplissent l'espace
  OUTPUT = "";
  STROKE_COLOR = "#4169E1";
  stroke_(STROKE_COLOR);
  
  let triSize = 60;
  let triHeight = triSize * sqrt(3) / 2;
  
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
      let baseX = 50 + col * triSize;
      let baseY = 620 + row * triHeight * 2;
      
      // Triangle pointant vers le haut
      let tri1 = [
        {x: baseX, y: baseY + triHeight},
        {x: baseX + triSize / 2, y: baseY},
        {x: baseX + triSize, y: baseY + triHeight}
      ];
      dessinerPolygone(tri1);
      
      // Triangle pointant vers le bas
      let tri2 = [
        {x: baseX + triSize / 2, y: baseY + triHeight * 2},
        {x: baseX, y: baseY + triHeight},
        {x: baseX + triSize, y: baseY + triHeight}
      ];
      dessinerPolygone(tri2);
    }
  }
  
  TRACE();
  
  // Motif de pentagones et losanges (Penrose-like)
  OUTPUT = "";
  STROKE_COLOR = "#8B4513";
  stroke_(STROKE_COLOR);
  
  let cx = 200;
  let cy = 200;
  let penRadius = 40;
  
  // Pentagone central
  let pentPoints = [];
  for (let i = 0; i < 5; i++) {
    let angle = -PI/2 + (i * 2 * PI / 5);
    pentPoints.push({
      x: cx + penRadius * cos(angle),
      y: cy + penRadius * sin(angle)
    });
  }
  dessinerPolygone(pentPoints);
  
  // Pentagones autour
  for (let i = 0; i < 5; i++) {
    let angle = -PI/2 + (i * 2 * PI / 5);
    let ncx = cx + penRadius * 1.9 * cos(angle);
    let ncy = cy + penRadius * 1.9 * sin(angle);
    
    let outerPent = [];
    for (let j = 0; j < 5; j++) {
      let a = -PI/2 + (j * 2 * PI / 5) + PI;
      outerPent.push({
        x: ncx + penRadius * cos(a),
        y: ncy + penRadius * sin(a)
      });
    }
    dessinerPolygone(outerPent);
  }
  
  TRACE();
  
  // Cadre parfait
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  
  // Bordure extérieure
  let margin = 20;
  let points = [
    {x: margin, y: margin},
    {x: NP - margin, y: margin},
    {x: NP - margin, y: NP - margin},
    {x: margin, y: NP - margin}
  ];
  dessinerPolygone(points);
  
  // Bordure intérieure
  margin = 30;
  points = [
    {x: margin, y: margin},
    {x: NP - margin, y: margin},
    {x: NP - margin, y: NP - margin},
    {x: margin, y: NP - margin}
  ];
  dessinerPolygone(points);
  
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

    let filename = "Genuary14_EverythingFits.svg";
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
    save("Genuary14_EverythingFits.png");
  }
}
