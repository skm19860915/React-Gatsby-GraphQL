uniform vec2 uFrequency;
uniform vec2 uMousePos;
uniform float uMouseDelta;
uniform float uTime;
uniform float uTextureRepeat;

attribute float aRandom;

varying vec2 vUv;


void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  float elevation = sin(modelPosition.x * (uFrequency.x + (uMouseDelta / 100000.0)) - (uMousePos.x / 1000.0) - uTime / 1.5) * 1.1;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv * uTextureRepeat;
}
