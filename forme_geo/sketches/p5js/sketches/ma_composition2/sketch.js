// GENUARY JAN. 2: Twelve principles of animation
// Démonstration des 12 principes de l'animation avec une balle rebondissante

let NP = 800,
  PI = Math.PI;
let DX = NP / 2,
  DY = NP / 2;

let balle = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 0,
  rayon: 40,
  squashX: 1,
  squashY: 1,
  rotation: 0,
  trail: []
};

let gravity = 0.5;
let bounce = 0.85;
let friction = 0.99;
let time = 0;

function setup() {
  createCanvas(NP, NP);
  frameRate(60);
}

function draw() {
  // Fond avec dégradé simulé
  background(232, 186, 168);
  
  time++;
  
  // Mise à jour de la physique (Timing, Slow in/out)
  balle.vy += gravity;
  balle.x += balle.vx;
  balle.y += balle.vy;
  balle.vx *= friction;
  
  // Arc de mouvement naturel (Arcs)
  balle.rotation += balle.vx * 0.02;
  
  // Rebond au sol avec Squash and Stretch
  let sol = NP - 100;
  if (balle.y + balle.rayon > sol) {
    balle.y = sol - balle.rayon;
    balle.vy *= -bounce;
    
    // Squash au contact
    balle.squashX = 1.4;
    balle.squashY = 0.6;
  }
  
  // Rebond sur les murs
  if (balle.x - balle.rayon < 0 || balle.x + balle.rayon > NP) {
    balle.vx *= -1;
    balle.x = constrain(balle.x, balle.rayon, NP - balle.rayon);
  }
  
  // Stretch pendant le mouvement rapide
  let vitesse = sqrt(balle.vx * balle.vx + balle.vy * balle.vy);
  if (vitesse > 5) {
    let stretchFactor = map(vitesse, 5, 20, 1, 1.3);
    if (abs(balle.vy) > abs(balle.vx)) {
      balle.squashY = lerp(balle.squashY, stretchFactor, 0.3);
      balle.squashX = lerp(balle.squashX, 1 / stretchFactor, 0.3);
    }
  }
  
  // Retour à la forme normale (Follow through)
  balle.squashX = lerp(balle.squashX, 1, 0.15);
  balle.squashY = lerp(balle.squashY, 1, 0.15);
  
  // Enregistrer la traînée (Secondary action)
  balle.trail.push({x: balle.x, y: balle.y, r: balle.rayon * 0.3});
  if (balle.trail.length > 15) balle.trail.shift();
  
  // Dessiner la traînée fantôme (Overlapping action)
  noFill();
  stroke(143, 8, 14, 50);
  strokeWeight(2);
  for (let i = 0; i < balle.trail.length; i++) {
    let t = balle.trail[i];
    let alpha = map(i, 0, balle.trail.length, 20, 100);
    stroke(143, 8, 14, alpha);
    ellipse(t.x, t.y, t.r * 2 * (i / balle.trail.length));
  }
  
  // Ombre au sol (Staging)
  fill(0, 0, 0, 30);
  noStroke();
  let shadowY = sol + 10;
  let shadowScale = map(balle.y, 0, sol, 0.3, 1);
  ellipse(balle.x, shadowY, balle.rayon * 2 * shadowScale * balle.squashX, balle.rayon * 0.3 * shadowScale);
  
  // Dessiner la balle principale (Solid drawing, Appeal)
  push();
  translate(balle.x, balle.y);
  rotate(balle.rotation);
  scale(balle.squashX, balle.squashY);
  
  // Corps de la balle
  fill(143, 8, 14);
  stroke(100, 5, 10);
  strokeWeight(3);
  ellipse(0, 0, balle.rayon * 2, balle.rayon * 2);
  
  // Reflet (Appeal)
  fill(255, 255, 255, 100);
  noStroke();
  ellipse(-balle.rayon * 0.3, -balle.rayon * 0.3, balle.rayon * 0.6, balle.rayon * 0.4);
  
  // Motif sur la balle
  stroke(200, 50, 50);
  strokeWeight(2);
  noFill();
  arc(0, 0, balle.rayon * 1.2, balle.rayon * 1.2, -PI/4, PI/4);
  arc(0, 0, balle.rayon * 1.2, balle.rayon * 1.2, PI*3/4, PI*5/4);
  
  pop();
  
  // Lignes de mouvement (Exaggeration)
  if (vitesse > 8) {
    stroke(143, 8, 14, 100);
    strokeWeight(2);
    let angle = atan2(balle.vy, balle.vx);
    for (let i = 0; i < 5; i++) {
      let offset = random(-20, 20);
      let startX = balle.x - cos(angle) * (balle.rayon + 10 + i * 15);
      let startY = balle.y - sin(angle) * (balle.rayon + 10 + i * 15) + offset;
      let endX = startX - cos(angle) * 20;
      let endY = startY - sin(angle) * 20;
      line(startX, startY, endX, endY);
    }
  }
  
  // Sol
  stroke(100, 5, 10);
  strokeWeight(4);
  line(0, sol, NP, sol);
  
  // Texte des principes
  fill(143, 8, 14);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  text("12 Principles of Animation", 20, 30);
  textSize(11);
  let principles = [
    "1. Squash & Stretch", "2. Anticipation", "3. Staging",
    "4. Straight Ahead/Pose to Pose", "5. Follow Through", "6. Slow In/Out",
    "7. Arcs", "8. Secondary Action", "9. Timing",
    "10. Exaggeration", "11. Solid Drawing", "12. Appeal"
  ];
  for (let i = 0; i < principles.length; i++) {
    text(principles[i], 20, 50 + i * 15);
  }
  
  // Relancer la balle si elle s'arrête
  if (abs(balle.vy) < 0.5 && balle.y > sol - balle.rayon - 5) {
    if (time % 120 == 0) {
      balle.vy = -15;
      balle.vx = random(-8, 8);
    }
  }
}

function mousePressed() {
  // Anticipation : cliquer pour lancer la balle vers le clic
  let angle = atan2(mouseY - balle.y, mouseX - balle.x);
  let force = 15;
  balle.vx = cos(angle) * force;
  balle.vy = sin(angle) * force;
}

function keyPressed() {
  if (key == "f" || key == "F") {
    save("Genuary02_TwelvePrinciples.png");
  }
}
