// COMPOSITION ARTISTIQUE - TABLEAU GÉOMÉTRIQUE MULTIFORME CRÉATIF

// ----------------------------------------------------
let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

// Fonction pour contraindre les coordonnées dans les limites du canvas
function constrainCoord(value) {
  return max(0, min(NP - 1, value));
}

// Fonction pour créer des motifs fractals récursifs
function dessinerFractal(X, Y, taille, profondeur, angle) {
  if (profondeur <= 0 || taille < 5) return;

  // Dessiner un polygone à cette profondeur
  let sides = 6;
  for (let i = 0; i < sides; i++) {
    let a = (2 * PI * i) / sides + angle;
    let x1 = constrainCoord(X + taille * cos(a));
    let y1 = constrainCoord(Y + taille * sin(a));
    let x2 = constrainCoord(X + taille * 0.5 * cos(a + PI / sides));
    let y2 = constrainCoord(Y + taille * 0.5 * sin(a + PI / sides));

    if (i == 0) LPRINT(`M${int(x1)},${int(y1)}`);
    else LPRINT(`D${int(x1)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
  }
  LPRINT(`D${int(X + taille * cos(angle))},${int(Y + taille * sin(angle))}`);

  // Récursion pour créer des sous-motifs
  if (profondeur > 1) {
    for (let i = 0; i < sides; i++) {
      let a = (2 * PI * i) / sides + angle;
      let newX = X + taille * 0.6 * cos(a);
      let newY = Y + taille * 0.6 * sin(a);
      dessinerFractal(newX, newY, taille * 0.4, profondeur - 1, angle + PI / 6);
    }
  }
}

// Fonction pour créer des spirales logarithmiques complexes
function spiraleLogarithmique(CX, CY, a, b, tours, points) {
  for (let i = 0; i <= points; i++) {
    let t = (i / points) * tours * 2 * PI;
    let r = a * Math.exp(b * t);
    if (r > NP / 2) break;
    let X = int(constrainCoord(CX + r * cos(t)));
    let Y = int(constrainCoord(CY + r * sin(t)));
    if (i == 0) LPRINT(`M${X},${Y}`);
    else LPRINT(`D${X},${Y}`);
  }
}

// Fonction pour créer des motifs en étoile complexe avec branches
function etoileComplexe(
  CX,
  CY,
  branches,
  rayonExterne,
  rayonInterne,
  iterations
) {
  for (let iter = 0; iter < iterations; iter++) {
    let scale = 1 - iter * 0.2;
    let rExt = rayonExterne * scale;
    let rInt = rayonInterne * scale;

    for (let b = 0; b < branches; b++) {
      let angle1 = (2 * PI * b) / branches;
      let angle2 = (2 * PI * (b + 0.5)) / branches;

      let x1 = constrainCoord(CX + rExt * cos(angle1));
      let y1 = constrainCoord(CY + rExt * sin(angle1));
      let x2 = constrainCoord(CX + rInt * cos(angle2));
      let y2 = constrainCoord(CY + rInt * sin(angle2));

      if (b == 0 && iter == 0) LPRINT(`M${int(x1)},${int(y1)}`);
      else LPRINT(`M${int(x1)},${int(y1)}`);
      LPRINT(`D${int(x2)},${int(y2)}`);
      LPRINT(
        `D${int(CX + rExt * cos(angle1 + (2 * PI) / branches))},${int(
          CY + rExt * sin(angle1 + (2 * PI) / branches)
        )}`
      );
    }
  }
}

// ----------------------------------------------------
function dessiner() {
  // Fond avec palette rouge
  PALETTE("RED");
  if (!_SVG_) {
    background_(BG_COLOR);
  }

  // ========== COUCHE 1 : SPIRALES LOGARITHMIQUES COMPLEXES ==========
  OUTPUT = "";
  STROKE_COLOR = "#8F080E";
  stroke_(STROKE_COLOR);
  for (let s = 0; s < 7; s++) {
    let angleOffset = (s * 2 * PI) / 7;
    let offsetX = NP * 0.15 * cos(angleOffset);
    let offsetY = NP * 0.15 * sin(angleOffset);
    spiraleLogarithmique(DX + offsetX, DY + offsetY, NP * 0.05, 0.08, 3, 150);
  }
  TRACE();

  // ========== COUCHE 1.5 : SPIRALES ARCHIMÉDIENNES ENTOURANTES ==========
  OUTPUT = "";
  STROKE_COLOR = "#A02020";
  stroke_(STROKE_COLOR);
  for (let s = 0; s < 5; s++) {
    let angleOffset = (s * 2 * PI) / 5;
    let spiralRadius = NP * 0.32;
    let turns = 2.8;
    let points = 120;
    let startOffset = NP * 0.08;
    for (let i = 0; i <= points; i++) {
      let t = i / points;
      let r = startOffset + spiralRadius * t * (1 + 0.3 * sin(t * 4 * PI));
      let angle = turns * 2 * PI * t + angleOffset;
      let X = int(constrainCoord(DX + r * cos(angle)));
      let Y = int(constrainCoord(DY + r * sin(angle)));
      if (i == 0) LPRINT(`M${X},${Y}`);
      else LPRINT(`D${X},${Y}`);
    }
  }
  TRACE();

  // ========== COUCHE 2 : ÉTOILES COMPLEXES MULTI-NIVEAUX ==========
  OUTPUT = "";
  STROKE_COLOR = "#E6DB76";
  stroke_(STROKE_COLOR);
  let starCount = 8;
  let starRadius = NP * 0.22;
  for (let f = 0; f < starCount; f++) {
    let angle = (2 * PI * f) / starCount;
    let CX = constrainCoord(DX + starRadius * cos(angle));
    let CY = constrainCoord(DY + starRadius * sin(angle));
    etoileComplexe(CX, CY, 8, NP * 0.08, NP * 0.03, 3);
  }
  TRACE();

  // ========== COUCHE 2.5 : FLEURS FRACTALES RÉCURSIVES ==========
  OUTPUT = "";
  STROKE_COLOR = "#D4C55A";
  stroke_(STROKE_COLOR);
  let fractalCount = 6;
  let fractalRadius = NP * 0.28;
  for (let f = 0; f < fractalCount; f++) {
    let angle = (2 * PI * f) / fractalCount + PI / 6;
    let CX = constrainCoord(DX + fractalRadius * cos(angle));
    let CY = constrainCoord(DY + fractalRadius * sin(angle));
    dessinerFractal(CX, CY, NP * 0.06, 3, angle);
  }
  TRACE();

  // ========== COUCHE 3 : LIGNES RADIALES AVEC MOTIFS EN ZIGZAG ==========
  OUTPUT = "";
  STROKE_COLOR = "#013ABB";
  stroke_(STROKE_COLOR);
  let rayCount = 48;
  let startRadius = NP * 0.1;
  for (let r = 0; r < rayCount; r++) {
    let angle = (2 * PI * r) / rayCount;
    let maxLength = min(NP * 0.38, NP / 2 - startRadius);
    let variation = 0.25 + 0.75 * abs(sin(angle * 4));
    let length = startRadius + maxLength * variation;

    // Créer un motif en zigzag le long de la ligne
    let segments = 8;
    let prevX = int(constrainCoord(DX + startRadius * cos(angle)));
    let prevY = int(constrainCoord(DY + startRadius * sin(angle)));
    LPRINT(`M${prevX},${prevY}`);

    for (let seg = 1; seg <= segments; seg++) {
      let t = seg / segments;
      let rCurrent = startRadius + (length - startRadius) * t;
      let zigzag = NP * 0.015 * sin(t * 12 * PI + angle * 3);
      let X = int(
        constrainCoord(
          DX + rCurrent * cos(angle) + zigzag * cos(angle + PI / 2)
        )
      );
      let Y = int(
        constrainCoord(
          DY + rCurrent * sin(angle) + zigzag * sin(angle + PI / 2)
        )
      );
      LPRINT(`D${X},${Y}`);
    }
  }
  TRACE();

  // ========== COUCHE 3.5 : RAYONS SECONDAIRES AVEC POINTS ==========
  OUTPUT = "";
  STROKE_COLOR = "#1E4A8C";
  stroke_(STROKE_COLOR);
  let secondaryRayCount = 72;
  for (let r = 0; r < secondaryRayCount; r++) {
    let angle = (2 * PI * r) / secondaryRayCount;
    let radius1 = NP * 0.15 + NP * 0.05 * sin(angle * 6);
    let radius2 = NP * 0.25 + NP * 0.08 * cos(angle * 5);
    let X1 = int(constrainCoord(DX + radius1 * cos(angle)));
    let Y1 = int(constrainCoord(DY + radius1 * sin(angle)));
    let X2 = int(constrainCoord(DX + radius2 * cos(angle)));
    let Y2 = int(constrainCoord(DY + radius2 * sin(angle)));
    LPRINT(`M${X1},${Y1}`);
    LPRINT(`D${X2},${Y2}`);
  }
  TRACE();

  // ========== COUCHE 4 : CERCLES CONCENTRIQUES AVEC DÉFORMATIONS SINUSOÏDALES ==========
  OUTPUT = "";
  STROKE_COLOR = "#F7EB23";
  stroke_(STROKE_COLOR);
  let circleCount = 10;
  let minRadius = NP * 0.18;
  for (let c = 1; c <= circleCount; c++) {
    let maxRadius = NP / 2 - NP * 0.04;
    let radius = min(minRadius + (NP * 0.22 * c) / circleCount, maxRadius);
    let offsetX = NP * 0.02 * sin(c * 0.7);
    let offsetY = NP * 0.02 * cos(c * 0.7);
    let segments = 80;
    for (let i = 0; i <= segments; i++) {
      let angle = (2 * PI * i) / segments;
      // Ajouter une déformation sinusoïdale pour créer des ondulations
      let deformation = NP * 0.01 * sin(angle * c * 2);
      let r = radius + deformation;
      let X = int(constrainCoord(DX + offsetX + r * cos(angle)));
      let Y = int(constrainCoord(DY + offsetY + r * sin(angle)));
      if (i == 0) LPRINT(`M${X},${Y}`);
      else LPRINT(`D${X},${Y}`);
    }
  }
  TRACE();

  // ========== COUCHE 4.5 : POLYGONES CONCENTRIQUES ROTATIFS ==========
  OUTPUT = "";
  STROKE_COLOR = "#FFD700";
  stroke_(STROKE_COLOR);
  let polyCount = 6;
  for (let p = 0; p < polyCount; p++) {
    let sides = 6 + p;
    let radius = NP * 0.15 + (NP * 0.2 * p) / polyCount;
    let rotation = (PI * p) / (polyCount * 2);
    for (let i = 0; i <= sides; i++) {
      let angle = (2 * PI * i) / sides + rotation;
      let X = int(constrainCoord(DX + radius * cos(angle)));
      let Y = int(constrainCoord(DY + radius * sin(angle)));
      if (i == 0) LPRINT(`M${X},${Y}`);
      else LPRINT(`D${X},${Y}`);
    }
  }
  TRACE();

  // ========== COUCHE 5 : VAGUES MULTI-FRÉQUENCES COMPLEXES ==========
  OUTPUT = "";
  STROKE_COLOR = "#8F080E";
  stroke_(STROKE_COLOR);
  let waveCount = 8;
  let startWaveRadius = NP * 0.18;
  let maxWaveRadius = NP / 2 - NP * 0.04;
  for (let w = 0; w < waveCount; w++) {
    let baseRadius = min(startWaveRadius + w * NP * 0.04, maxWaveRadius);
    let wavePoints = 120;
    for (let i = 0; i <= wavePoints; i++) {
      let angle = (2 * PI * i) / wavePoints;
      // Combinaison de plusieurs fréquences pour créer des motifs complexes
      let wave1 = NP * 0.015 * sin(angle * 6 + w);
      let wave2 = NP * 0.01 * sin(angle * 11 + w * 1.5);
      let wave3 = NP * 0.008 * sin(angle * 17 + w * 2);
      let radius = min(baseRadius + wave1 + wave2 + wave3, maxWaveRadius);
      let X = int(constrainCoord(DX + radius * cos(angle)));
      let Y = int(constrainCoord(DY + radius * sin(angle)));
      if (i == 0) LPRINT(`M${X},${Y}`);
      else LPRINT(`D${X},${Y}`);
    }
  }
  TRACE();

  // ========== COUCHE 6 : MOTIFS CENTRAUX EN MANDALA ==========
  OUTPUT = "";
  STROKE_COLOR = "#C71585";
  stroke_(STROKE_COLOR);
  let mandalaLayers = 5;
  for (let layer = 0; layer < mandalaLayers; layer++) {
    let layerRadius = NP * 0.05 + layer * NP * 0.03;
    let elements = 12 + layer * 4;
    for (let e = 0; e < elements; e++) {
      let angle = (2 * PI * e) / elements;
      let x1 = constrainCoord(DX + layerRadius * cos(angle));
      let y1 = constrainCoord(DY + layerRadius * sin(angle));
      let x2 = constrainCoord(
        DX + (layerRadius + NP * 0.02) * cos(angle + PI / elements)
      );
      let y2 = constrainCoord(
        DY + (layerRadius + NP * 0.02) * sin(angle + PI / elements)
      );
      if (e == 0 && layer == 0) LPRINT(`M${int(x1)},${int(y1)}`);
      else LPRINT(`M${int(x1)},${int(y1)}`);
      LPRINT(`D${int(x2)},${int(y2)}`);
    }
  }
  TRACE();

  // ========== COUCHE 7 : ÉTOILES PÉRIPHÉRIQUES AVEC TRAITS ==========
  OUTPUT = "";
  STROKE_COLOR = "#FF6347";
  stroke_(STROKE_COLOR);
  let outerStarCount = 16;
  let outerRadius = NP * 0.35;
  for (let s = 0; s < outerStarCount; s++) {
    let angle = (2 * PI * s) / outerStarCount;
    let CX = constrainCoord(DX + outerRadius * cos(angle));
    let CY = constrainCoord(DY + outerRadius * sin(angle));
    GOSUB_ETOILES_REGULIERES(CX, CY, 6, 2, NP * 0.04, angle);

    // Ajouter des traits connecteurs
    if (s % 2 == 0) {
      let nextAngle = (2 * PI * (s + 2)) / outerStarCount;
      let nextCX = constrainCoord(DX + outerRadius * cos(nextAngle));
      let nextCY = constrainCoord(DY + outerRadius * sin(nextAngle));
      LPRINT(`M${int(CX)},${int(CY)}`);
      LPRINT(`D${int(nextCX)},${int(nextCY)}`);
    }
  }
  TRACE();
}

// ----------------------------------------------------
function setup() {
  INIT();
  dessiner();
}

// ----------------------------------------------------
function GOSUB_ETOILES_REGULIERES(CX, CY, K, H, R, AD) {
  for (let I = 0; I < K; I++) {
    let X = int(constrainCoord(CX + R * cos((2 * I * H * PI) / K + AD)));
    let Y = int(constrainCoord(CY + R * sin((2 * I * H * PI) / K + AD)));
    if (I == 0) LPRINT(`M${X},${Y}`);
    if (I > 0) LPRINT(`D${X},${Y}`);
  }
}

// ----------------------------------------------------
function keyPressed() {
  if (key == " ") {
    // Sauvegarder les états originaux
    let originalSvg = _SVG_;
    let originalSvgElmt = svgElmt;
    let originalSvgTranslate = svgTranslate;
    let originalSvgVertices = svgVertices;
    let originalSvgStrokeColor = svgStrokeColor;

    // Créer un élément SVG temporaire sans toucher au canvas
    _SVG_ = true;
    width = NP;
    height = NP;
    svgTranslate = {
      x: 0,
      y: 0,
      add: function (x, y) {
        this.x += x;
        this.y += y;
      },
    };
    svgElmt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElmt.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElmt.setAttribute("version", "1.1");
    svgElmt.setAttribute("viewBox", `0 0 ${NP} ${NP}`);
    svgElmt.setAttribute("width", NP);
    svgElmt.setAttribute("height", NP);
    svgElmt.style.backgroundColor = BG_COLOR;
    svgVertices = [];
    svgStrokeColor = STROKE_COLOR;

    // Redessiner en mode SVG
    dessiner();

    // Générer le fichier SVG
    let filename = "IIyanJude_BainTrimbach_dessin.svg";

    let svgData = svgElmt.outerHTML;
    let preface = '<?xml version="1.0" standalone="no"?>\r\n';
    let svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    let svgUrl = window.URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Restaurer l'état original
    _SVG_ = originalSvg;
    svgElmt = originalSvgElmt;
    svgTranslate = originalSvgTranslate;
    svgVertices = originalSvgVertices;
    svgStrokeColor = originalSvgStrokeColor;
  } else if (key == "f" || key == "F") {
    // Sauvegarder en PNG
    let filename = "IIyanJude_BainTrimbach_dessin.png";
    save(filename);
  }
}
