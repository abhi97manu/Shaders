uniform float uTime;
uniform float uPos;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

float random(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
}

void main() {
  vUv = uv;

  vec3 animatedPosition = position;

  float mask = step(0.8, ((cos(dot(position , vec3(50, 10, 10))))));
  animatedPosition +=  normal * uPos * 0.2 * mask *sin(uTime);
  
  vec4 worldPosition = modelMatrix * vec4(animatedPosition, 1.0) ;

  vNormal = normalize(mat3(modelMatrix) * normal);
  vPosition = worldPosition.xyz ;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
