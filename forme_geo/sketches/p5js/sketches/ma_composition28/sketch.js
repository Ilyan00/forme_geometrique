// GENUARY JAN. 28: No libraries, no canvas, only HTML elements
// Adaptation : p5.js génère des éléments HTML DOM au lieu de dessiner sur le canvas

let NP = 800;
let elements = [];
let time = 0;
let mainContainer;

function setup() {
  // Créer un canvas minimal
  let canvas = createCanvas(NP, NP);
  
  // Créer un conteneur div pour les éléments HTML
  mainContainer = createDiv('');
  mainContainer.style('position', 'absolute');
  mainContainer.style('top', '0');
  mainContainer.style('left', '0');
  mainContainer.style('width', NP + 'px');
  mainContainer.style('height', NP + 'px');
  mainContainer.style('overflow', 'hidden');
  mainContainer.style('pointer-events', 'auto');
  
  // Créer des éléments DIV comme art
  createHTMLElements();
}

function createHTMLElements() {
  // Créer une grille de carrés HTML
  let gridSize = 10;
  let cellSize = NP / gridSize;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let div = createDiv('');
      div.parent(mainContainer);
      div.style('position', 'absolute');
      div.style('left', (i * cellSize + cellSize * 0.1) + 'px');
      div.style('top', (j * cellSize + cellSize * 0.1) + 'px');
      div.style('width', (cellSize * 0.8) + 'px');
      div.style('height', (cellSize * 0.8) + 'px');
      div.style('border', '2px solid rgba(233, 69, 96, 0.5)');
      div.style('border-radius', '5px');
      div.style('transition', 'all 0.3s ease');
      div.style('cursor', 'pointer');
      
      // Couleur basée sur la position
      let hue = map(i + j, 0, gridSize * 2, 0, 360);
      div.style('background', `hsla(${hue}, 70%, 50%, 0.3)`);
      
      // Stocker pour animation
      elements.push({
        element: div,
        baseX: i * cellSize + cellSize * 0.1,
        baseY: j * cellSize + cellSize * 0.1,
        i: i,
        j: j,
        phase: (i + j) * 0.5,
        hue: hue
      });
      
      // Interactivité au survol
      let currentHue = hue;
      div.mouseOver(() => {
        div.style('transform', 'scale(1.2) rotate(10deg)');
        div.style('background', `hsla(${currentHue}, 90%, 60%, 0.8)`);
        div.style('box-shadow', '0 0 20px rgba(233, 69, 96, 0.8)');
        div.style('z-index', '100');
      });
      
      div.mouseOut(() => {
        div.style('transform', 'scale(1) rotate(0deg)');
        div.style('background', `hsla(${currentHue}, 70%, 50%, 0.3)`);
        div.style('box-shadow', 'none');
        div.style('z-index', '1');
      });
    }
  }
  
  // Ajouter des cercles HTML
  for (let c = 0; c < 15; c++) {
    let circle = createDiv('');
    circle.parent(mainContainer);
    circle.style('position', 'absolute');
    circle.style('border-radius', '50%');
    circle.style('pointer-events', 'none');
    
    let size = random(50, 150);
    let x = random(NP);
    let y = random(NP);
    
    circle.style('width', size + 'px');
    circle.style('height', size + 'px');
    circle.style('left', x + 'px');
    circle.style('top', y + 'px');
    circle.style('border', '3px solid rgba(230, 230, 250, 0.4)');
    circle.style('background', 'transparent');
    
    elements.push({
      element: circle,
      baseX: x,
      baseY: y,
      size: size,
      isCircle: true,
      phase: random(TWO_PI)
    });
  }
  
  // Titre en HTML
  let title = createDiv('HTML ELEMENTS');
  title.parent(mainContainer);
  title.style('position', 'absolute');
  title.style('top', '20px');
  title.style('left', '0');
  title.style('width', '100%');
  title.style('text-align', 'center');
  title.style('font-family', 'monospace');
  title.style('font-size', '32px');
  title.style('color', '#e94560');
  title.style('text-shadow', '0 0 10px rgba(233, 69, 96, 0.5)');
  title.style('letter-spacing', '10px');
  title.style('pointer-events', 'none');
  
  // Sous-titre
  let subtitle = createDiv('No canvas, only DIVs');
  subtitle.parent(mainContainer);
  subtitle.style('position', 'absolute');
  subtitle.style('bottom', '30px');
  subtitle.style('left', '0');
  subtitle.style('width', '100%');
  subtitle.style('text-align', 'center');
  subtitle.style('font-family', 'monospace');
  subtitle.style('font-size', '14px');
  subtitle.style('color', 'rgba(230, 230, 250, 0.7)');
  subtitle.style('pointer-events', 'none');
  
  // Lignes HTML (barres fines)
  for (let l = 0; l < 20; l++) {
    let line = createDiv('');
    line.parent(mainContainer);
    line.style('position', 'absolute');
    line.style('background', 'rgba(233, 69, 96, 0.3)');
    line.style('pointer-events', 'none');
    
    if (l % 2 == 0) {
      // Horizontale
      line.style('width', random(100, 300) + 'px');
      line.style('height', '2px');
      line.style('left', random(NP) + 'px');
      line.style('top', random(NP) + 'px');
    } else {
      // Verticale
      line.style('width', '2px');
      line.style('height', random(100, 300) + 'px');
      line.style('left', random(NP) + 'px');
      line.style('top', random(NP) + 'px');
    }
    
    elements.push({
      element: line,
      isLine: true,
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  // Le canvas avec un fond sombre
  background(26, 26, 46);
  
  time += 0.02;
  
  // Animer les cercles
  for (let item of elements) {
    if (item.isCircle) {
      let newX = item.baseX + sin(time + item.phase) * 30;
      let newY = item.baseY + cos(time * 0.7 + item.phase) * 30;
      item.element.style('left', newX + 'px');
      item.element.style('top', newY + 'px');
      
      let scaleVal = 1 + sin(time * 2 + item.phase) * 0.1;
      item.element.style('transform', `scale(${scaleVal})`);
    }
  }
  
  // Indication visuelle sur le canvas
  fill(233, 69, 96);
  noStroke();
  textSize(12);
  textAlign(CENTER);
  text("Hover over the squares!", NP/2, NP - 60);
}

function keyPressed() {
  if (key == 'f' || key == 'F') {
    save("Genuary28_HTMLElements.png");
  }
}
