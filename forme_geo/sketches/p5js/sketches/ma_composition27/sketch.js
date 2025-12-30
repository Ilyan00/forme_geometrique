// GENUARY JAN. 27: Lifeform
// Forme de vie - créature organique qui semble vivante

let NP = 800;
let creature;
let time = 0;

class Tentacle {
  constructor(baseX, baseY, length, segments, angleOffset) {
    this.baseX = baseX;
    this.baseY = baseY;
    this.length = length;
    this.segments = segments;
    this.angleOffset = angleOffset;
    this.points = [];
    this.targetAngle = 0;
  }
  
  update(t) {
    this.points = [];
    let x = this.baseX;
    let y = this.baseY;
    let segLength = this.length / this.segments;
    
    for (let i = 0; i < this.segments; i++) {
      let waveOffset = sin(t * 2 + i * 0.5 + this.angleOffset) * 0.3;
      let angle = this.targetAngle + this.angleOffset + waveOffset;
      angle += sin(t * 3 + i * 0.3) * 0.2 * (i / this.segments);
      
      x += cos(angle) * segLength;
      y += sin(angle) * segLength;
      this.points.push({x, y, thickness: map(i, 0, this.segments, 8, 1)});
    }
  }
  
  draw() {
    if (this.points.length < 2) return;
    
    stroke(100, 180, 100);
    strokeWeight(2);
    noFill();
    
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    
    // Épaisseur variable
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      strokeWeight(p1.thickness);
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}

class Lifeform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseRadius = 80;
    this.tentacles = [];
    this.pulsePhase = 0;
    this.eyeAngle = 0;
    
    // Créer des tentacules
    let numTentacles = 8;
    for (let i = 0; i < numTentacles; i++) {
      let angle = (TWO_PI * i) / numTentacles;
      let length = random(100, 180);
      this.tentacles.push(new Tentacle(x, y, length, 15, angle));
    }
  }
  
  update(t) {
    this.pulsePhase = sin(t * 2) * 0.15;
    
    // Suivre la souris avec les yeux
    this.eyeAngle = atan2(mouseY - this.y, mouseX - this.x);
    
    // Mettre à jour les bases des tentacules
    for (let i = 0; i < this.tentacles.length; i++) {
      let angle = (TWO_PI * i) / this.tentacles.length;
      let r = this.baseRadius * (1 + this.pulsePhase);
      this.tentacles[i].baseX = this.x + cos(angle) * r * 0.8;
      this.tentacles[i].baseY = this.y + sin(angle) * r * 0.8;
      
      // Les tentacules suivent vaguement la souris
      let toMouse = atan2(mouseY - this.tentacles[i].baseY, mouseX - this.tentacles[i].baseX);
      this.tentacles[i].targetAngle = lerp(this.tentacles[i].targetAngle, toMouse, 0.02);
      
      this.tentacles[i].update(t);
    }
  }
  
  draw() {
    // Dessiner les tentacules
    for (let tent of this.tentacles) {
      tent.draw();
    }
    
    // Corps principal avec pulsation
    let r = this.baseRadius * (1 + this.pulsePhase);
    
    // Lueur externe
    noFill();
    for (let i = 5; i > 0; i--) {
      stroke(100, 200, 100, 30);
      strokeWeight(i * 3);
      ellipse(this.x, this.y, r * 2 + i * 10, r * 2 + i * 10);
    }
    
    // Corps
    fill(60, 120, 80);
    stroke(40, 100, 60);
    strokeWeight(3);
    
    // Forme organique (pas un cercle parfait)
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let wobble = noise(cos(a) + time, sin(a) + time) * 20;
      let rr = r + wobble;
      vertex(this.x + cos(a) * rr, this.y + sin(a) * rr);
    }
    endShape(CLOSE);
    
    // Motifs sur le corps
    stroke(80, 150, 100);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < 5; i++) {
      let rr = r * (0.3 + i * 0.12);
      let offsetX = sin(time + i) * 5;
      let offsetY = cos(time + i) * 5;
      ellipse(this.x + offsetX, this.y + offsetY, rr * 2, rr * 2);
    }
    
    // Yeux
    let eyeOffset = 30;
    let eyeRadius = 20;
    
    // Oeil gauche
    fill(200, 220, 200);
    stroke(40, 80, 40);
    strokeWeight(2);
    ellipse(this.x - eyeOffset, this.y - 10, eyeRadius * 2, eyeRadius * 2);
    
    // Pupille gauche (suit la souris)
    fill(20, 40, 20);
    let pupilOffset = 8;
    ellipse(
      this.x - eyeOffset + cos(this.eyeAngle) * pupilOffset,
      this.y - 10 + sin(this.eyeAngle) * pupilOffset,
      eyeRadius * 0.8,
      eyeRadius * 0.8
    );
    
    // Reflet
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(this.x - eyeOffset - 5, this.y - 15, 6, 6);
    
    // Oeil droit
    fill(200, 220, 200);
    stroke(40, 80, 40);
    strokeWeight(2);
    ellipse(this.x + eyeOffset, this.y - 10, eyeRadius * 2, eyeRadius * 2);
    
    // Pupille droite
    fill(20, 40, 20);
    ellipse(
      this.x + eyeOffset + cos(this.eyeAngle) * pupilOffset,
      this.y - 10 + sin(this.eyeAngle) * pupilOffset,
      eyeRadius * 0.8,
      eyeRadius * 0.8
    );
    
    // Reflet
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(this.x + eyeOffset - 5, this.y - 15, 6, 6);
    
    // Bouche qui "respire"
    let mouthOpen = abs(sin(time * 2)) * 10;
    fill(30, 60, 40);
    stroke(20, 40, 30);
    strokeWeight(2);
    ellipse(this.x, this.y + 35, 30, 10 + mouthOpen);
  }
}

function setup() {
  createCanvas(NP, NP);
  creature = new Lifeform(NP/2, NP/2);
}

function draw() {
  // Fond avec gradient sous-marin
  for (let y = 0; y < NP; y++) {
    let inter = map(y, 0, NP, 0, 1);
    let c = lerpColor(color(20, 50, 60), color(10, 30, 40), inter);
    stroke(c);
    line(0, y, NP, y);
  }
  
  // Particules flottantes
  noStroke();
  for (let i = 0; i < 50; i++) {
    let px = (i * 100 + time * 20) % NP;
    let py = (i * 80 + sin(time + i) * 50) % NP;
    let size = 2 + sin(time * 2 + i) * 1;
    fill(100, 200, 150, 100);
    ellipse(px, py, size, size);
  }
  
  time += 0.02;
  
  creature.update(time);
  creature.draw();
  
  // Texte
  fill(100, 200, 150);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text("Move mouse to interact with the lifeform", NP/2, NP - 30);
}

function keyPressed() {
  if (key == 'f' || key == 'F') {
    save("Genuary27_Lifeform.png");
  }
}
