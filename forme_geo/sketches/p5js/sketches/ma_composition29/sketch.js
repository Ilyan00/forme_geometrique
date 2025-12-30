// GENUARY JAN. 29: Genetic evolution and mutation
// Évolution génétique - créatures qui évoluent vers un objectif

let NP = 800;
let population = [];
let target;
let generation = 0;
let maxGen = 0;
let bestFitness = 0;

class Creature {
  constructor(dna) {
    this.dna = dna || this.randomDNA();
    this.fitness = 0;
    this.x = NP / 2;
    this.y = NP / 2;
  }
  
  randomDNA() {
    return {
      bodySize: random(20, 80),
      bodyColor: [random(255), random(255), random(255)],
      numLegs: floor(random(0, 8)),
      legLength: random(10, 50),
      hasAntennae: random() > 0.5,
      antennaLength: random(10, 40),
      numEyes: floor(random(1, 5)),
      eyeSize: random(5, 20),
      tailLength: random(0, 60),
      spots: floor(random(0, 10)),
      spotSize: random(3, 15)
    };
  }
  
  calculateFitness() {
    // Fitness basée sur la similarité avec la cible
    let score = 0;
    
    // Accéder à target.dna pour les comparaisons
    score += 100 - abs(this.dna.bodySize - target.dna.bodySize);
    score += 50 - abs(this.dna.numLegs - target.dna.numLegs) * 10;
    score += 50 - abs(this.dna.numEyes - target.dna.numEyes) * 15;
    score += 30 - abs(this.dna.legLength - target.dna.legLength);
    score += 30 - abs(this.dna.eyeSize - target.dna.eyeSize);
    
    // Bonus pour les caractéristiques booléennes
    if (this.dna.hasAntennae == target.dna.hasAntennae) score += 30;
    
    // Similarité de couleur
    let colorDiff = dist(
      this.dna.bodyColor[0], this.dna.bodyColor[1], this.dna.bodyColor[2],
      target.dna.bodyColor[0], target.dna.bodyColor[1], target.dna.bodyColor[2]
    );
    score += max(0, 100 - colorDiff / 4);
    
    this.fitness = max(0, score);
    return this.fitness;
  }
  
  crossover(partner) {
    let childDNA = {};
    
    // Mélanger les gènes des deux parents
    childDNA.bodySize = random() > 0.5 ? this.dna.bodySize : partner.dna.bodySize;
    childDNA.bodyColor = random() > 0.5 ? [...this.dna.bodyColor] : [...partner.dna.bodyColor];
    childDNA.numLegs = random() > 0.5 ? this.dna.numLegs : partner.dna.numLegs;
    childDNA.legLength = random() > 0.5 ? this.dna.legLength : partner.dna.legLength;
    childDNA.hasAntennae = random() > 0.5 ? this.dna.hasAntennae : partner.dna.hasAntennae;
    childDNA.antennaLength = random() > 0.5 ? this.dna.antennaLength : partner.dna.antennaLength;
    childDNA.numEyes = random() > 0.5 ? this.dna.numEyes : partner.dna.numEyes;
    childDNA.eyeSize = random() > 0.5 ? this.dna.eyeSize : partner.dna.eyeSize;
    childDNA.tailLength = random() > 0.5 ? this.dna.tailLength : partner.dna.tailLength;
    childDNA.spots = random() > 0.5 ? this.dna.spots : partner.dna.spots;
    childDNA.spotSize = random() > 0.5 ? this.dna.spotSize : partner.dna.spotSize;
    
    return new Creature(childDNA);
  }
  
  mutate(rate) {
    if (random() < rate) this.dna.bodySize += random(-10, 10);
    if (random() < rate) {
      this.dna.bodyColor[0] += random(-30, 30);
      this.dna.bodyColor[1] += random(-30, 30);
      this.dna.bodyColor[2] += random(-30, 30);
      this.dna.bodyColor = this.dna.bodyColor.map(c => constrain(c, 0, 255));
    }
    if (random() < rate) this.dna.numLegs = constrain(this.dna.numLegs + floor(random(-1, 2)), 0, 8);
    if (random() < rate) this.dna.legLength += random(-10, 10);
    if (random() < rate) this.dna.hasAntennae = !this.dna.hasAntennae;
    if (random() < rate) this.dna.numEyes = constrain(this.dna.numEyes + floor(random(-1, 2)), 1, 5);
    if (random() < rate) this.dna.eyeSize += random(-5, 5);
    
    // Contraindre les valeurs
    this.dna.bodySize = constrain(this.dna.bodySize, 20, 80);
    this.dna.legLength = constrain(this.dna.legLength, 10, 50);
    this.dna.eyeSize = constrain(this.dna.eyeSize, 5, 20);
  }
  
  drawCreature(x, y, scaleFactor) {
    push();
    translate(x, y);
    scaleFactor = scaleFactor || 1;
    
    let s = this.dna.bodySize * scaleFactor;
    
    // Queue
    if (this.dna.tailLength > 0) {
      stroke(this.dna.bodyColor[0] * 0.7, this.dna.bodyColor[1] * 0.7, this.dna.bodyColor[2] * 0.7);
      strokeWeight(s * 0.15);
      noFill();
      bezier(0, s * 0.3, s * 0.5, s * 0.5, this.dna.tailLength * scaleFactor, s * 0.2, this.dna.tailLength * scaleFactor * 1.2, 0);
    }
    
    // Pattes
    stroke(this.dna.bodyColor[0] * 0.6, this.dna.bodyColor[1] * 0.6, this.dna.bodyColor[2] * 0.6);
    strokeWeight(3 * scaleFactor);
    for (let i = 0; i < this.dna.numLegs; i++) {
      let angle = map(i, 0, this.dna.numLegs, -PI * 0.4, PI * 0.4);
      let lx = cos(angle - PI/2) * s * 0.8;
      let ly = sin(angle - PI/2) * s * 0.8;
      let legEnd = this.dna.legLength * scaleFactor;
      line(lx, ly, lx + cos(angle) * legEnd, ly + sin(angle) * legEnd);
    }
    
    // Corps
    fill(this.dna.bodyColor[0], this.dna.bodyColor[1], this.dna.bodyColor[2]);
    stroke(this.dna.bodyColor[0] * 0.5, this.dna.bodyColor[1] * 0.5, this.dna.bodyColor[2] * 0.5);
    strokeWeight(2);
    ellipse(0, 0, s * 2, s * 1.5);
    
    // Spots
    noStroke();
    fill(this.dna.bodyColor[0] * 0.7, this.dna.bodyColor[1] * 0.7, this.dna.bodyColor[2] * 0.7);
    randomSeed(this.dna.bodySize * 1000); // Pour avoir des spots consistants
    for (let i = 0; i < this.dna.spots; i++) {
      let spotX = random(-s * 0.6, s * 0.6);
      let spotY = random(-s * 0.4, s * 0.4);
      ellipse(spotX, spotY, this.dna.spotSize * scaleFactor);
    }
    randomSeed(millis()); // Remettre le random normal
    
    // Antennes
    if (this.dna.hasAntennae) {
      stroke(this.dna.bodyColor[0] * 0.8, this.dna.bodyColor[1] * 0.8, this.dna.bodyColor[2] * 0.8);
      strokeWeight(2 * scaleFactor);
      let al = this.dna.antennaLength * scaleFactor;
      line(-s * 0.3, -s * 0.5, -s * 0.5, -s * 0.5 - al);
      line(s * 0.3, -s * 0.5, s * 0.5, -s * 0.5 - al);
      
      fill(255);
      noStroke();
      ellipse(-s * 0.5, -s * 0.5 - al, 5 * scaleFactor);
      ellipse(s * 0.5, -s * 0.5 - al, 5 * scaleFactor);
    }
    
    // Yeux
    let eyeSpacing = s * 0.8 / max(this.dna.numEyes, 1);
    for (let i = 0; i < this.dna.numEyes; i++) {
      let ex = -s * 0.4 + eyeSpacing * i + eyeSpacing / 2;
      let ey = -s * 0.2;
      
      fill(255);
      stroke(0);
      strokeWeight(1);
      ellipse(ex, ey, this.dna.eyeSize * scaleFactor);
      
      fill(0);
      noStroke();
      ellipse(ex, ey, this.dna.eyeSize * 0.5 * scaleFactor);
    }
    
    pop();
  }
}

function setup() {
  createCanvas(NP, NP);
  
  // Créer la cible (créature idéale)
  target = new Creature();
  target.dna = {
    bodySize: 50,
    bodyColor: [100, 200, 150],
    numLegs: 6,
    legLength: 30,
    hasAntennae: true,
    antennaLength: 25,
    numEyes: 2,
    eyeSize: 12,
    tailLength: 40,
    spots: 5,
    spotSize: 8
  };
  
  // Population initiale
  for (let i = 0; i < 20; i++) {
    population.push(new Creature());
  }
}

function draw() {
  background(30, 40, 50);
  
  // Calculer la fitness
  for (let creature of population) {
    creature.calculateFitness();
  }
  
  // Trier par fitness
  population.sort((a, b) => b.fitness - a.fitness);
  
  if (population[0].fitness > bestFitness) {
    bestFitness = population[0].fitness;
    maxGen = generation;
  }
  
  // Dessiner la cible
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text("TARGET", 100, 50);
  target.drawCreature(100, 150, 1);
  
  // Dessiner le meilleur
  text("BEST (Gen " + maxGen + ")", 100, 320);
  population[0].drawCreature(100, 420, 1);
  
  // Dessiner la population
  text("POPULATION - Generation " + generation, NP/2 + 100, 50);
  
  let cols = 4;
  let rows = 5;
  let startX = 250;
  let startY = 100;
  let spacing = 130;
  
  for (let i = 0; i < min(population.length, cols * rows); i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = startX + col * spacing;
    let y = startY + row * spacing;
    
    population[i].drawCreature(x, y, 0.6);
    
    // Afficher la fitness
    fill(200);
    noStroke();
    textSize(10);
    text("F: " + floor(population[i].fitness), x, y + 50);
  }
  
  // Évolution toutes les 30 frames
  if (frameCount % 30 == 0) {
    evolve();
  }
  
  // Statistiques
  fill(255);
  textSize(12);
  textAlign(LEFT);
  text("Best Fitness: " + floor(bestFitness) + " / 390", 20, NP - 40);
  text("Press 'R' to reset, 'E' to evolve faster", 20, NP - 20);
}

function evolve() {
  generation++;
  
  let newPopulation = [];
  
  // Garder les 2 meilleurs (élitisme) - copie profonde du DNA
  let elite1DNA = JSON.parse(JSON.stringify(population[0].dna));
  let elite2DNA = JSON.parse(JSON.stringify(population[1].dna));
  newPopulation.push(new Creature(elite1DNA));
  newPopulation.push(new Creature(elite2DNA));
  
  // Créer le reste par croisement et mutation
  while (newPopulation.length < 20) {
    // Sélection par tournoi
    let parent1 = tournamentSelect();
    let parent2 = tournamentSelect();
    
    let child = parent1.crossover(parent2);
    child.mutate(0.1);
    newPopulation.push(child);
  }
  
  population = newPopulation;
}

function tournamentSelect() {
  let best = null;
  for (let i = 0; i < 3; i++) {
    let contestant = population[floor(random(population.length))];
    if (best == null || contestant.fitness > best.fitness) {
      best = contestant;
    }
  }
  return best;
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    population = [];
    for (let i = 0; i < 20; i++) {
      population.push(new Creature());
    }
    generation = 0;
    bestFitness = 0;
    maxGen = 0;
  } else if (key == 'e' || key == 'E') {
    for (let i = 0; i < 10; i++) evolve();
  } else if (key == 'f' || key == 'F') {
    save("Genuary29_GeneticEvolution.png");
  }
}
