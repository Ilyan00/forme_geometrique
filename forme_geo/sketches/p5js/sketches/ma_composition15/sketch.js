// GENUARY JAN. 15: Invisible object with shadows
// Objet invisible - seules les ombres sont visibles

let NP = 800;
let time = 0;
let spheres = [];

function setup() {
  createCanvas(NP, NP);
  
  // Créer des sphères invisibles
  for (let i = 0; i < 5; i++) {
    spheres.push({
      x: random(200, 600),
      y: random(150, 400),
      z: random(50, 200),
      radius: random(40, 80),
      vx: random(-1, 1),
      vy: random(-0.5, 0.5)
    });
  }
}

function draw() {
  // Fond avec gradient
  for (let y = 0; y < NP; y++) {
    let inter = map(y, 0, NP, 0, 1);
    let c = lerpColor(color(240, 235, 220), color(200, 190, 170), inter);
    stroke(c);
    line(0, y, NP, y);
  }
  
  time += 0.02;
  
  // Position de la lumière (dynamique)
  let lightX = NP / 2 + sin(time) * 200;
  let lightY = -200;
  let lightZ = 300 + cos(time * 0.5) * 100;
  
  // Dessiner l'indicateur de lumière
  noStroke();
  fill(255, 220, 100, 150);
  ellipse(lightX, 50, 30, 30);
  
  // Rayons de lumière subtils
  stroke(255, 220, 100, 30);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let angle = (TWO_PI * i) / 8 + time;
    line(lightX, 50, lightX + cos(angle) * 40, 50 + sin(angle) * 40);
  }
  
  // Sol
  let groundY = 550;
  noStroke();
  fill(180, 170, 150);
  rect(0, groundY, NP, NP - groundY);
  
  // Ligne d'horizon
  stroke(150, 140, 120);
  strokeWeight(2);
  line(0, groundY, NP, groundY);
  
  // Mettre à jour et dessiner les ombres des sphères
  for (let sphere of spheres) {
    // Mouvement léger
    sphere.x += sphere.vx;
    sphere.y += sphere.vy;
    
    // Rebondir sur les bords
    if (sphere.x < 100 || sphere.x > NP - 100) sphere.vx *= -1;
    if (sphere.y < 100 || sphere.y > 400) sphere.vy *= -1;
    
    // Calculer l'ombre projetée
    let shadowX = sphere.x + (sphere.x - lightX) * (groundY - sphere.y) / (sphere.y - lightY);
    let shadowY = groundY;
    
    // Taille de l'ombre basée sur la distance à la lumière
    let distToLight = dist(sphere.x, sphere.y, lightX, lightY);
    let shadowScale = 1 + (groundY - sphere.y) / (lightZ + sphere.z);
    let shadowWidth = sphere.radius * 2 * shadowScale;
    let shadowHeight = sphere.radius * shadowScale * 0.4;
    
    // Dessiner l'ombre avec dégradé
    noStroke();
    for (let i = 10; i >= 0; i--) {
      let alpha = map(i, 0, 10, 80, 10);
      let scale = 1 + i * 0.1;
      fill(50, 45, 40, alpha);
      ellipse(shadowX, shadowY + 5, shadowWidth * scale, shadowHeight * scale);
    }
    
    // Ombre secondaire plus douce
    fill(30, 25, 20, 40);
    ellipse(shadowX, shadowY + 5, shadowWidth * 1.5, shadowHeight * 1.5);
  }
  
  // Ajouter des objets géométriques invisibles avec ombres
  
  // Cube invisible
  let cubeX = 200;
  let cubeY = 250;
  let cubeSize = 80;
  
  // Ombre du cube (forme déformée)
  let cubeShadowX = cubeX + (cubeX - lightX) * (groundY - cubeY) / (cubeY - lightY);
  let cubeShadowScale = 1 + (groundY - cubeY) / lightZ;
  
  fill(40, 35, 30, 60);
  noStroke();
  beginShape();
  vertex(cubeShadowX - cubeSize * cubeShadowScale, groundY + 5);
  vertex(cubeShadowX + cubeSize * cubeShadowScale, groundY + 5);
  vertex(cubeShadowX + cubeSize * cubeShadowScale * 1.3, groundY + cubeSize * 0.3);
  vertex(cubeShadowX - cubeSize * cubeShadowScale * 0.7, groundY + cubeSize * 0.3);
  endShape(CLOSE);
  
  // Pyramide invisible
  let pyrX = 600;
  let pyrY = 280;
  let pyrSize = 70;
  
  let pyrShadowX = pyrX + (pyrX - lightX) * (groundY - pyrY) / (pyrY - lightY);
  let pyrShadowScale = 1 + (groundY - pyrY) / lightZ;
  
  fill(40, 35, 30, 55);
  beginShape();
  vertex(pyrShadowX, groundY - pyrSize * pyrShadowScale * 0.3);
  vertex(pyrShadowX + pyrSize * pyrShadowScale, groundY + 5);
  vertex(pyrShadowX - pyrSize * pyrShadowScale, groundY + 5);
  endShape(CLOSE);
  
  // Tore invisible (représenté par une ombre en forme d'anneau)
  let torusX = 400;
  let torusY = 200;
  let torusOuter = 60;
  let torusInner = 30;
  
  let torusShadowX = torusX + (torusX - lightX) * (groundY - torusY) / (torusY - lightY);
  let torusShadowScale = 1 + (groundY - torusY) / lightZ;
  
  // Ombre extérieure du tore
  fill(45, 40, 35, 50);
  ellipse(torusShadowX, groundY + 5, torusOuter * 2 * torusShadowScale, torusOuter * 0.6 * torusShadowScale);
  
  // Trou intérieur (plus clair)
  fill(180, 170, 150);
  ellipse(torusShadowX, groundY + 5, torusInner * 2 * torusShadowScale, torusInner * 0.4 * torusShadowScale);
  
  // Texte indicatif
  fill(100, 90, 80);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("Les objets sont invisibles - seules leurs ombres révèlent leur présence", NP/2, 30);
  
  // Légende
  textSize(12);
  fill(120, 110, 100);
  text("☀ Source de lumière mobile", lightX, 80);
}

function mousePressed() {
  // Ajouter une nouvelle sphère invisible
  if (spheres.length < 10) {
    spheres.push({
      x: mouseX,
      y: min(mouseY, 400),
      z: random(50, 200),
      radius: random(30, 60),
      vx: random(-1, 1),
      vy: random(-0.5, 0.5)
    });
  }
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    // Réinitialiser
    spheres = [];
    for (let i = 0; i < 5; i++) {
      spheres.push({
        x: random(200, 600),
        y: random(150, 400),
        z: random(50, 200),
        radius: random(40, 80),
        vx: random(-1, 1),
        vy: random(-0.5, 0.5)
      });
    }
  } else if (key == 'f' || key == 'F') {
    save("Genuary15_InvisibleShadows.png");
  }
}
