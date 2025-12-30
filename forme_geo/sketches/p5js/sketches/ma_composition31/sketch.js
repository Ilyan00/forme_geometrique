// GENUARY JAN. 31: GLSL day
// Journée GLSL - Art avec shaders

let NP = 800;
let theShader;

// Vertex shader - simple passthrough
let vertShader = `
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;
  
  varying vec2 vTexCoord;
  
  void main() {
    vTexCoord = aTexCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
  }
`;

// Fragment shader - effets visuels
let fragShader = `
  precision mediump float;
  
  varying vec2 vTexCoord;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  #define PI 3.14159265359
  
  // Fonction de bruit simplex simplifié
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // Palette de couleurs
  vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
  }
  
  // Fonction SDF pour cercle
  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }
  
  // Fonction SDF pour boîte
  float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  }
  
  void main() {
    vec2 uv = vTexCoord;
    vec2 uv0 = uv;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 finalColor = vec3(0.0);
    
    // Effet de distorsion basé sur le bruit
    float noise = snoise(uv * 2.0 + u_time * 0.5);
    uv += noise * 0.1;
    
    // Cercles concentriques animés
    for (float i = 0.0; i < 4.0; i++) {
      uv = fract(uv * 1.5) - 0.5;
      
      float d = length(uv) * exp(-length(uv0));
      
      vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
      
      d = sin(d * 8.0 + u_time) / 8.0;
      d = abs(d);
      
      d = pow(0.01 / d, 1.2);
      
      finalColor += col * d;
    }
    
    // Ajouter des formes SDF
    vec2 uvSDF = vTexCoord * 2.0 - 1.0;
    uvSDF.x *= u_resolution.x / u_resolution.y;
    
    // Cercle central pulsant
    float circle = sdCircle(uvSDF, 0.3 + sin(u_time) * 0.1);
    circle = smoothstep(0.01, 0.0, abs(circle));
    finalColor += vec3(0.2, 0.5, 0.8) * circle * 0.5;
    
    // Boîtes rotatives
    for (float i = 0.0; i < 6.0; i++) {
      float angle = u_time * 0.5 + i * PI / 3.0;
      vec2 boxPos = vec2(cos(angle), sin(angle)) * 0.5;
      
      // Rotation de la boîte
      float s = sin(angle);
      float c = cos(angle);
      vec2 rotatedUV = mat2(c, -s, s, c) * (uvSDF - boxPos);
      
      float box = sdBox(rotatedUV, vec2(0.05, 0.1));
      box = smoothstep(0.01, 0.0, abs(box));
      
      vec3 boxColor = palette(i / 6.0 + u_time * 0.2);
      finalColor += boxColor * box * 0.3;
    }
    
    // Effet de vignette
    float vignette = 1.0 - length(uv0 - 0.5) * 0.8;
    finalColor *= vignette;
    
    // Effet de grain
    float grain = snoise(uv0 * 500.0 + u_time * 10.0) * 0.05;
    finalColor += grain;
    
    // Interaction avec la souris
    vec2 mouseUV = u_mouse / u_resolution;
    mouseUV = mouseUV * 2.0 - 1.0;
    mouseUV.x *= u_resolution.x / u_resolution.y;
    
    float mouseDist = length(uvSDF - mouseUV);
    float mouseGlow = 0.1 / mouseDist;
    finalColor += vec3(1.0, 0.8, 0.5) * mouseGlow * 0.2;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function preload() {
  // Le shader sera créé dans setup
}

function setup() {
  createCanvas(NP, NP, WEBGL);
  
  // Créer le shader
  theShader = createShader(vertShader, fragShader);
  
  noStroke();
}

function draw() {
  // Activer le shader
  shader(theShader);
  
  // Passer les uniforms
  theShader.setUniform('u_time', millis() / 1000.0);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_mouse', [mouseX, height - mouseY]);
  
  // Dessiner un rectangle plein écran pour appliquer le shader
  rect(-width/2, -height/2, width, height);
}

function keyPressed() {
  if (key == 'f' || key == 'F') {
    save("Genuary31_GLSL.png");
  }
}
