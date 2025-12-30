// GENUARY JAN. 23: Transparency
// Exploration de la transparence avec des formes superposées

let NP = 800;
let time = 0;

function setup() {
  createCanvas(NP, NP);
  frameRate(30);
}

function draw() {
  // Fond avec gradient
  for (let y = 0; y < NP; y++) {
    let inter = map(y, 0, NP, 0, 1);
    let c = lerpColor(color(20, 30, 50), color(40, 50, 80), inter);
    stroke(c);
    line(0, y, NP, y);
  }
  
  time += 0.02;
  
  // Dessiner des cercles transparents qui se superposent
  noStroke();
  
  // Couche 1 : Grands cercles rouges
  for (let i = 0; i < 5; i++) {
    let x = NP * 0.3 + cos(time + i * 0.5) * 100;
    let y = NP * 0.4 + sin(time * 0.7 + i * 0.3) * 80;
    let size = 150 + sin(time + i) * 30;
    
    fill(220, 60, 60, 80);
    ellipse(x, y, size, size);
  }
  
  // Couche 2 : Cercles bleus
  for (let i = 0; i < 5; i++) {
    let x = NP * 0.6 + cos(time * 0.8 + i * 0.4) * 120;
    let y = NP * 0.5 + sin(time + i * 0.5) * 90;
    let size = 180 + cos(time * 1.2 + i) * 40;
    
    fill(60, 100, 220, 70);
    ellipse(x, y, size, size);
  }
  
  // Couche 3 : Cercles jaunes
  for (let i = 0; i < 4; i++) {
    let x = NP * 0.5 + sin(time * 0.6 + i * 0.6) * 150;
    let y = NP * 0.6 + cos(time * 0.9 + i * 0.4) * 100;
    let size = 120 + sin(time * 0.8 + i) * 25;
    
    fill(240, 200, 60, 60);
    ellipse(x, y, size, size);
  }
  
  // Couche 4 : Rectangles transparents
  for (let i = 0; i < 6; i++) {
    let x = 100 + i * 120;
    let y = NP * 0.3 + sin(time + i * 0.8) * 50;
    let w = 80 + cos(time + i) * 20;
    let h = 200 + sin(time * 0.5 + i) * 50;
    
    fill(255, 255, 255, 30);
    rect(x, y, w, h);
  }
  
  // Couche 5 : Triangles transparents
  for (let i = 0; i < 4; i++) {
    let cx = NP * 0.2 + i * NP * 0.2;
    let cy = NP * 0.7 + cos(time * 0.7 + i) * 40;
    let size = 100 + sin(time + i * 0.5) * 20;
    
    fill(100, 200, 150, 50);
    triangle(
      cx, cy - size,
      cx - size * 0.8, cy + size * 0.6,
      cx + size * 0.8, cy + size * 0.6
    );
  }
  
  // Effet de verre/cristal au centre
  push();
  translate(NP/2, NP/2);
  
  for (let layer = 0; layer < 8; layer++) {
    let rotation = time * 0.3 + layer * PI / 8;
    let scale = 1 - layer * 0.08;
    let alpha = 40 - layer * 4;
    
    rotate(rotation);
    
    // Hexagone transparent
    fill(255, 255, 255, alpha);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI * i) / 6;
      let r = 150 * scale;
      vertex(r * cos(angle), r * sin(angle));
    }
    endShape(CLOSE);
    
    rotate(-rotation);
  }
  
  pop();
  
  // Lignes de scan (effet de transparence technologique)
  stroke(255, 255, 255, 20);
  strokeWeight(1);
  for (let y = 0; y < NP; y += 4) {
    line(0, y, NP, y);
  }
  
  // Cercles concentriques au centre avec transparence
  noFill();
  for (let r = 20; r < 300; r += 15) {
    let alpha = map(r, 20, 300, 100, 20);
    stroke(255, 255, 255, alpha);
    strokeWeight(1);
    ellipse(NP/2, NP/2, r * 2 + sin(time * 2 + r * 0.1) * 10);
  }
  
  // Effet de lumière en mouvement
  noStroke();
  for (let i = 0; i < 3; i++) {
    let lightX = NP/2 + cos(time + i * TWO_PI/3) * 200;
    let lightY = NP/2 + sin(time + i * TWO_PI/3) * 200;
    
    // Halo de lumière
    for (let r = 100; r > 0; r -= 10) {
      let alpha = map(r, 0, 100, 50, 5);
      fill(255, 255, 200, alpha);
      ellipse(lightX, lightY, r, r);
    }
  }
  
  // Ombre portée en bas
  for (let i = 0; i < 20; i++) {
    let alpha = map(i, 0, 20, 50, 0);
    fill(0, 0, 0, alpha);
    rect(0, NP - 100 + i * 5, NP, 5);
  }
  
  // Texte avec effet de transparence
  fill(255, 255, 255, 150);
  textSize(24);
  textAlign(CENTER);
  text("TRANSPARENCY", NP/2, 50);
  
  fill(255, 255, 255, 80);
  textSize(14);
  text("Layered translucent shapes", NP/2, 75);
}

function keyPressed() {
  if (key == 'f' || key == 'F') {
    save("Genuary23_Transparency.png");
  }
}
