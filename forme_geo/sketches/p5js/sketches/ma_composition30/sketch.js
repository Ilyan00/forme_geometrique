// GENUARY JAN. 30: It's not a bug, it's a feature
// Ce n'est pas un bug, c'est une fonctionnalité - Glitch art

let NP = 800;
let img;
let glitchIntensity = 0.5;
let time = 0;

function setup() {
  createCanvas(NP, NP);
  pixelDensity(1);
  
  // Créer une image de base à glitcher
  img = createGraphics(NP, NP);
  generateBaseImage();
}

function generateBaseImage() {
  img.background(20, 30, 50);
  
  // Dessiner une composition de base
  img.noStroke();
  
  // Cercles concentriques
  for (let r = 300; r > 0; r -= 30) {
    let c = map(r, 0, 300, 50, 200);
    img.fill(c, c + 50, c + 100);
    img.ellipse(NP/2, NP/2, r * 2, r * 2);
  }
  
  // Rectangles
  for (let i = 0; i < 10; i++) {
    img.fill(random(100, 255), random(100, 255), random(100, 255));
    img.rect(random(NP), random(NP), random(50, 150), random(50, 150));
  }
  
  // Texte
  img.fill(255);
  img.textSize(60);
  img.textAlign(CENTER, CENTER);
  img.text("NOT A BUG", NP/2, NP/2 - 50);
  img.textSize(40);
  img.text("IT'S A FEATURE", NP/2, NP/2 + 30);
}

function draw() {
  time += 0.02;
  
  // Copier l'image de base
  image(img, 0, 0);
  
  // Appliquer les glitches
  loadPixels();
  
  // Glitch 1: Décalage RGB
  applyRGBShift();
  
  // Glitch 2: Lignes de scan corrompues
  applyScanlineCorruption();
  
  // Glitch 3: Blocs déplacés
  applyBlockDisplacement();
  
  // Glitch 4: Bruit numérique
  applyDigitalNoise();
  
  updatePixels();
  
  // Effet de scanlines CRT
  drawScanlines();
  
  // Glitch visuel supplémentaire
  drawGlitchOverlay();
  
  // Texte d'erreur stylisé
  drawErrorMessages();
}

function applyRGBShift() {
  let shiftAmount = floor(sin(time * 3) * 15 * glitchIntensity);
  
  if (abs(shiftAmount) > 2) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let index = (x + y * width) * 4;
        let shiftedIndex = ((x + shiftAmount + width) % width + y * width) * 4;
        
        // Décaler seulement le canal rouge
        if (shiftedIndex >= 0 && shiftedIndex < pixels.length - 4) {
          pixels[index] = pixels[shiftedIndex];
        }
      }
    }
  }
}

function applyScanlineCorruption() {
  let corruptionY = floor(noise(time * 2) * height);
  let corruptionHeight = floor(random(5, 30) * glitchIntensity);
  
  if (random() < 0.3 * glitchIntensity) {
    for (let y = corruptionY; y < min(corruptionY + corruptionHeight, height); y++) {
      let shift = floor(random(-50, 50));
      for (let x = 0; x < width; x++) {
        let index = (x + y * width) * 4;
        let sourceIndex = (((x + shift) + width) % width + y * width) * 4;
        
        pixels[index] = pixels[sourceIndex];
        pixels[index + 1] = pixels[sourceIndex + 1];
        pixels[index + 2] = pixels[sourceIndex + 2];
      }
    }
  }
}

function applyBlockDisplacement() {
  if (random() < 0.2 * glitchIntensity) {
    let blockX = floor(random(width));
    let blockY = floor(random(height));
    let blockW = floor(random(20, 100));
    let blockH = floor(random(20, 100));
    let offsetX = floor(random(-100, 100));
    let offsetY = floor(random(-50, 50));
    
    for (let y = blockY; y < min(blockY + blockH, height); y++) {
      for (let x = blockX; x < min(blockX + blockW, width); x++) {
        let destX = (x + offsetX + width) % width;
        let destY = (y + offsetY + height) % height;
        
        let srcIndex = (x + y * width) * 4;
        let destIndex = (destX + destY * width) * 4;
        
        // Échanger les pixels
        let tempR = pixels[srcIndex];
        let tempG = pixels[srcIndex + 1];
        let tempB = pixels[srcIndex + 2];
        
        pixels[srcIndex] = pixels[destIndex];
        pixels[srcIndex + 1] = pixels[destIndex + 1];
        pixels[srcIndex + 2] = pixels[destIndex + 2];
        
        pixels[destIndex] = tempR;
        pixels[destIndex + 1] = tempG;
        pixels[destIndex + 2] = tempB;
      }
    }
  }
}

function applyDigitalNoise() {
  for (let i = 0; i < pixels.length; i += 4) {
    if (random() < 0.01 * glitchIntensity) {
      pixels[i] = random(255);
      pixels[i + 1] = random(255);
      pixels[i + 2] = random(255);
    }
  }
}

function drawScanlines() {
  stroke(0, 50);
  for (let y = 0; y < height; y += 2) {
    line(0, y, width, y);
  }
}

function drawGlitchOverlay() {
  // Barres de glitch horizontales
  if (random() < 0.3 * glitchIntensity) {
    noStroke();
    fill(random(255), random(255), random(255), 100);
    let y = random(height);
    let h = random(2, 20);
    rect(0, y, width, h);
  }
  
  // Carrés de corruption
  if (random() < 0.2 * glitchIntensity) {
    noStroke();
    fill(random(255), random(255), random(255), 150);
    rect(random(width), random(height), random(10, 50), random(10, 50));
  }
}

function drawErrorMessages() {
  fill(255, 0, 0);
  noStroke();
  textSize(12);
  textAlign(LEFT);
  textFont('monospace');
  
  // Messages d'erreur aléatoires
  let errors = [
    "ERROR 0x7A3F: Memory corruption detected",
    "WARNING: Buffer overflow at 0xFFFF",
    "FATAL: Segmentation fault",
    "GLITCH_ENABLED = true;",
    "// TODO: Fix this later",
    "undefined is not a function",
    "NaN NaN NaN NaN NaN",
    "¯\\_(ツ)_/¯"
  ];
  
  if (random() < 0.1) {
    let msg = random(errors);
    let x = random(50, width - 200);
    let y = random(50, height - 50);
    
    fill(0, 200);
    rect(x - 5, y - 15, textWidth(msg) + 10, 20);
    fill(255, 0, 0);
    text(msg, x, y);
  }
  
  // Compteur de frames "corrompu"
  fill(0, 150);
  rect(10, height - 30, 200, 25);
  fill(0, 255, 0);
  textSize(14);
  text("FRAME: " + frameCount + " | GLITCH: " + floor(glitchIntensity * 100) + "%", 15, height - 12);
}

function mouseMoved() {
  // L'intensité du glitch suit la souris
  glitchIntensity = map(mouseX, 0, width, 0.1, 1);
}

function mousePressed() {
  // Régénérer l'image de base
  generateBaseImage();
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    generateBaseImage();
  } else if (key == 'f' || key == 'F') {
    save("Genuary30_NotABug.png");
  }
}
