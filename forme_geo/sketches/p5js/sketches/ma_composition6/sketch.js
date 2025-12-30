// GENUARY JAN. 6: Lights on/off
// Scène qui change quand on allume/éteint les lumières

let NP = 800,
  PI = Math.PI;
let lightsOn = true;
let stars = [];
let fireflies = [];
let time = 0;

function setup() {
  createCanvas(NP, NP);
  
  // Générer des étoiles
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(NP),
      y: random(NP * 0.6),
      size: random(1, 3),
      twinkle: random(1000)
    });
  }
  
  // Générer des lucioles
  for (let i = 0; i < 30; i++) {
    fireflies.push({
      x: random(NP),
      y: random(NP * 0.4, NP * 0.9),
      vx: random(-1, 1),
      vy: random(-0.5, 0.5),
      phase: random(TWO_PI),
      size: random(3, 6)
    });
  }
}

function draw() {
  time++;
  
  if (lightsOn) {
    // Mode jour
    drawDayScene();
  } else {
    // Mode nuit
    drawNightScene();
  }
  
  // Interrupteur
  drawSwitch();
}

function drawDayScene() {
  // Ciel de jour
  for (let y = 0; y < NP * 0.6; y++) {
    let inter = map(y, 0, NP * 0.6, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(176, 224, 230), inter);
    stroke(c);
    line(0, y, NP, y);
  }
  
  // Soleil
  noStroke();
  fill(255, 220, 100);
  ellipse(NP * 0.8, NP * 0.15, 80, 80);
  
  // Rayons du soleil
  stroke(255, 220, 100, 150);
  strokeWeight(3);
  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI * i) / 12 + time * 0.01;
    let x1 = NP * 0.8 + cos(angle) * 50;
    let y1 = NP * 0.15 + sin(angle) * 50;
    let x2 = NP * 0.8 + cos(angle) * 80;
    let y2 = NP * 0.15 + sin(angle) * 80;
    line(x1, y1, x2, y2);
  }
  
  // Nuages
  noStroke();
  fill(255, 255, 255, 200);
  drawCloud(150, 100, 60);
  drawCloud(400, 150, 80);
  drawCloud(650, 80, 50);
  
  // Collines vertes
  fill(100, 180, 100);
  noStroke();
  beginShape();
  vertex(0, NP * 0.6);
  for (let x = 0; x <= NP; x += 20) {
    let y = NP * 0.6 - 50 * sin(x * 0.01) - 30 * sin(x * 0.02);
    vertex(x, y);
  }
  vertex(NP, NP);
  vertex(0, NP);
  endShape(CLOSE);
  
  // Herbe détaillée
  stroke(60, 140, 60);
  strokeWeight(2);
  for (let x = 0; x < NP; x += 15) {
    let baseY = NP * 0.6 - 50 * sin(x * 0.01) - 30 * sin(x * 0.02);
    for (let i = 0; i < 3; i++) {
      let grassX = x + random(-5, 5);
      let grassHeight = random(10, 25);
      let sway = sin(time * 0.05 + x * 0.1) * 3;
      line(grassX, baseY, grassX + sway, baseY - grassHeight);
    }
  }
  
  // Maison
  drawHouse(NP * 0.3, NP * 0.55, true);
  
  // Arbre
  drawTree(NP * 0.7, NP * 0.5, true);
  
  // Papillons
  fill(255, 150, 200);
  noStroke();
  for (let i = 0; i < 5; i++) {
    let bx = (NP * 0.2 + i * 100 + time * 2) % NP;
    let by = NP * 0.4 + sin(time * 0.1 + i) * 30;
    let wingSize = 8 + sin(time * 0.3 + i) * 4;
    ellipse(bx - wingSize/2, by, wingSize, wingSize * 0.7);
    ellipse(bx + wingSize/2, by, wingSize, wingSize * 0.7);
  }
}

function drawNightScene() {
  // Ciel de nuit
  background(10, 15, 30);
  
  // Étoiles
  noStroke();
  for (let star of stars) {
    let brightness = 150 + 105 * sin(time * 0.05 + star.twinkle);
    fill(255, 255, 200, brightness);
    ellipse(star.x, star.y, star.size);
  }
  
  // Lune
  fill(240, 240, 200);
  ellipse(NP * 0.8, NP * 0.15, 70, 70);
  fill(10, 15, 30);
  ellipse(NP * 0.8 + 15, NP * 0.15 - 5, 50, 50);
  
  // Lueur de la lune
  noFill();
  for (let i = 0; i < 5; i++) {
    stroke(240, 240, 200, 30 - i * 5);
    strokeWeight(2);
    ellipse(NP * 0.8, NP * 0.15, 80 + i * 20, 80 + i * 20);
  }
  
  // Collines sombres
  fill(20, 40, 30);
  noStroke();
  beginShape();
  vertex(0, NP * 0.6);
  for (let x = 0; x <= NP; x += 20) {
    let y = NP * 0.6 - 50 * sin(x * 0.01) - 30 * sin(x * 0.02);
    vertex(x, y);
  }
  vertex(NP, NP);
  vertex(0, NP);
  endShape(CLOSE);
  
  // Maison avec lumière aux fenêtres
  drawHouse(NP * 0.3, NP * 0.55, false);
  
  // Arbre sombre
  drawTree(NP * 0.7, NP * 0.5, false);
  
  // Lucioles animées
  for (let ff of fireflies) {
    ff.x += ff.vx;
    ff.y += ff.vy + sin(time * 0.02 + ff.phase) * 0.3;
    
    if (ff.x < 0 || ff.x > NP) ff.vx *= -1;
    if (ff.y < NP * 0.4 || ff.y > NP * 0.9) ff.vy *= -1;
    
    let glow = (sin(time * 0.1 + ff.phase) + 1) / 2;
    fill(200, 255, 100, glow * 200);
    noStroke();
    ellipse(ff.x, ff.y, ff.size * glow);
    
    // Halo
    fill(200, 255, 100, glow * 50);
    ellipse(ff.x, ff.y, ff.size * 3 * glow);
  }
}

function drawCloud(x, y, size) {
  ellipse(x, y, size, size * 0.6);
  ellipse(x - size * 0.4, y + size * 0.1, size * 0.7, size * 0.5);
  ellipse(x + size * 0.4, y + size * 0.1, size * 0.8, size * 0.5);
}

function drawHouse(x, y, isDay) {
  // Mur
  fill(isDay ? color(180, 140, 100) : color(60, 50, 40));
  stroke(isDay ? color(120, 80, 50) : color(30, 25, 20));
  strokeWeight(2);
  rect(x - 60, y, 120, 100);
  
  // Toit
  fill(isDay ? color(150, 60, 60) : color(50, 20, 20));
  triangle(x - 70, y, x, y - 60, x + 70, y);
  
  // Porte
  fill(isDay ? color(100, 60, 30) : color(40, 25, 15));
  rect(x - 15, y + 40, 30, 60);
  
  // Fenêtres
  if (isDay) {
    fill(180, 220, 255);
  } else {
    fill(255, 200, 100); // Lumière chaude
  }
  rect(x - 50, y + 20, 25, 25);
  rect(x + 25, y + 20, 25, 25);
  
  // Cheminée
  fill(isDay ? color(120, 80, 60) : color(50, 35, 25));
  rect(x + 30, y - 50, 20, 40);
  
  if (!isDay) {
    // Fumée la nuit
    noFill();
    stroke(100, 100, 100, 100);
    strokeWeight(3);
    let smokeX = x + 40;
    for (let i = 0; i < 3; i++) {
      let smokeY = y - 55 - i * 20 - (time * 0.5) % 30;
      let wobble = sin(time * 0.05 + i) * 10;
      ellipse(smokeX + wobble, smokeY, 15 + i * 5, 10 + i * 3);
    }
  }
}

function drawTree(x, y, isDay) {
  // Tronc
  fill(isDay ? color(100, 70, 40) : color(40, 30, 20));
  stroke(isDay ? color(70, 50, 30) : color(25, 20, 15));
  strokeWeight(2);
  rect(x - 15, y, 30, 80);
  
  // Feuillage
  fill(isDay ? color(60, 140, 60) : color(20, 50, 20));
  noStroke();
  ellipse(x, y - 20, 100, 80);
  ellipse(x - 30, y + 10, 60, 50);
  ellipse(x + 30, y + 10, 60, 50);
  ellipse(x, y - 50, 70, 60);
}

function drawSwitch() {
  // Cadre de l'interrupteur
  fill(50);
  stroke(30);
  strokeWeight(2);
  rect(NP - 80, 20, 60, 80, 5);
  
  // Bouton
  fill(lightsOn ? color(100, 200, 100) : color(80, 80, 80));
  rect(NP - 70, lightsOn ? 30 : 60, 40, 30, 3);
  
  // Texte
  fill(255);
  noStroke();
  textSize(10);
  textAlign(CENTER);
  text(lightsOn ? "ON" : "OFF", NP - 50, lightsOn ? 50 : 80);
}

function mousePressed() {
  // Vérifier si on clique sur l'interrupteur
  if (mouseX > NP - 80 && mouseX < NP - 20 && mouseY > 20 && mouseY < 100) {
    lightsOn = !lightsOn;
  }
}

function keyPressed() {
  if (key == 'l' || key == 'L') {
    lightsOn = !lightsOn;
  } else if (key == "f" || key == "F") {
    save("Genuary06_LightsOnOff.png");
  }
}
