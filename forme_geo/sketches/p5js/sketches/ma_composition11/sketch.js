// GENUARY JAN. 11: Quine
// Un programme qui affiche son propre code source de manière artistique

let NP = 800;
let codeLines = [];
let scrollY = 0;
let charIndex = 0;
let lineIndex = 0;
let displayedCode = "";
let typing = true;

// Le code source est stocké et affiché
let sourceCode = `// GENUARY JAN. 11: Quine
// Un programme qui affiche son propre code source

let NP = 800;
let codeLines = [];
let scrollY = 0;

function setup() {
  createCanvas(NP, NP);
  textFont('monospace');
  // Ce code s'affiche lui-même
  displaySourceCode();
}

function draw() {
  background(30, 30, 40);
  drawCode();
  drawDecoration();
}

function drawCode() {
  fill(0, 255, 100);
  textSize(12);
  // Affiche le code ligne par ligne
  for (let i = 0; i < codeLines.length; i++) {
    text(codeLines[i], 50, 100 + i * 18);
  }
}

function drawDecoration() {
  // Cadre autour du code
  noFill();
  stroke(0, 200, 100);
  rect(40, 80, NP - 80, NP - 160);
  
  // Titre
  fill(255, 200, 50);
  textSize(24);
  text("QUINE", NP/2 - 40, 50);
}

// Le code continue...
// Et affiche sa propre structure
// C'est une forme de poésie de code

function keyPressed() {
  if (key == 'f') save("Quine.png");
}`;

function setup() {
  createCanvas(NP, NP);
  textFont('Courier New');
  codeLines = sourceCode.split('\n');
}

function draw() {
  // Fond avec effet terminal
  background(20, 25, 35);
  
  // Effet de scan lines
  for (let y = 0; y < NP; y += 3) {
    stroke(0, 10);
    line(0, y, NP, y);
  }
  
  // Bordure du terminal
  noFill();
  stroke(0, 200, 100, 100);
  strokeWeight(2);
  rect(30, 70, NP - 60, NP - 100, 5);
  
  // Barre de titre
  fill(50, 55, 65);
  noStroke();
  rect(30, 70, NP - 60, 25);
  
  // Boutons de fenêtre
  fill(255, 95, 86);
  ellipse(50, 82, 12, 12);
  fill(255, 189, 46);
  ellipse(70, 82, 12, 12);
  fill(39, 201, 63);
  ellipse(90, 82, 12, 12);
  
  // Titre
  fill(200, 200, 200);
  textSize(12);
  text("sketch.js - QUINE", 120, 87);
  
  // Zone de code
  fill(25, 30, 40);
  noStroke();
  rect(31, 95, NP - 62, NP - 126);
  
  // Afficher le code avec effet de typing
  if (typing) {
    if (frameCount % 2 == 0) {
      if (lineIndex < codeLines.length) {
        if (charIndex < codeLines[lineIndex].length) {
          displayedCode += codeLines[lineIndex][charIndex];
          charIndex++;
        } else {
          displayedCode += '\n';
          lineIndex++;
          charIndex = 0;
        }
      } else {
        typing = false;
      }
    }
  }
  
  // Afficher le code
  let displayLines = displayedCode.split('\n');
  let yPos = 115;
  
  for (let i = 0; i < displayLines.length; i++) {
    let line = displayLines[i];
    
    // Numéro de ligne
    fill(100, 100, 120);
    textSize(11);
    textAlign(RIGHT);
    text(i + 1, 65, yPos);
    
    // Coloration syntaxique
    textAlign(LEFT);
    let x = 75;
    let words = tokenize(line);
    
    for (let token of words) {
      if (isKeyword(token)) {
        fill(197, 134, 192); // Purple pour keywords
      } else if (isString(token)) {
        fill(206, 145, 120); // Orange pour strings
      } else if (isComment(token)) {
        fill(106, 153, 85); // Vert pour commentaires
      } else if (isNumber(token)) {
        fill(181, 206, 168); // Vert clair pour nombres
      } else if (isFunction(token)) {
        fill(220, 220, 170); // Jaune pour fonctions
      } else {
        fill(212, 212, 212); // Blanc pour le reste
      }
      
      textSize(11);
      text(token, x, yPos);
      x += textWidth(token);
    }
    
    yPos += 16;
    
    if (yPos > NP - 50) break;
  }
  
  // Curseur clignotant
  if (typing && frameCount % 30 < 15) {
    fill(0, 255, 100);
    let cursorX = 75 + textWidth(displayLines[displayLines.length - 1] || "");
    rect(cursorX, yPos - 28, 8, 14);
  }
  
  // Titre en haut
  fill(255, 200, 50);
  textSize(20);
  textAlign(CENTER);
  text("Q U I N E", NP/2, 45);
  textSize(12);
  fill(150);
  text("A program that outputs its own source code", NP/2, 62);
  textAlign(LEFT);
}

function tokenize(line) {
  let tokens = [];
  let current = "";
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < line.length; i++) {
    let c = line[i];
    
    if (!inString && (c == '"' || c == "'" || c == '`')) {
      if (current) tokens.push(current);
      current = c;
      inString = true;
      stringChar = c;
    } else if (inString) {
      current += c;
      if (c == stringChar && line[i-1] != '\\') {
        tokens.push(current);
        current = "";
        inString = false;
      }
    } else if (c == ' ' || c == '(' || c == ')' || c == '{' || c == '}' || 
               c == '[' || c == ']' || c == ';' || c == ',' || c == ':') {
      if (current) tokens.push(current);
      tokens.push(c);
      current = "";
    } else {
      current += c;
    }
  }
  if (current) tokens.push(current);
  return tokens;
}

function isKeyword(token) {
  let keywords = ['let', 'const', 'var', 'function', 'if', 'else', 'for', 'while', 
                  'return', 'true', 'false', 'null', 'undefined', 'new', 'this'];
  return keywords.includes(token);
}

function isString(token) {
  return (token.startsWith('"') || token.startsWith("'") || token.startsWith('`'));
}

function isComment(token) {
  return token.startsWith('//');
}

function isNumber(token) {
  return !isNaN(token) && token.trim() !== '';
}

function isFunction(token) {
  let funcs = ['setup', 'draw', 'createCanvas', 'background', 'fill', 'stroke', 
               'rect', 'ellipse', 'line', 'text', 'textSize', 'textFont', 
               'noFill', 'noStroke', 'save', 'textWidth', 'textAlign', 'split',
               'frameCount', 'keyPressed', 'includes', 'startsWith', 'push', 'trim'];
  return funcs.includes(token);
}

function mousePressed() {
  // Reset animation
  displayedCode = "";
  lineIndex = 0;
  charIndex = 0;
  typing = true;
}

function keyPressed() {
  if (key == 'f' || key == 'F') {
    save("Genuary11_Quine.png");
  }
}
