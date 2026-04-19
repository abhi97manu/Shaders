uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;

  vec3 animatedPosition = position;
  vec4 worldPosition = modelMatrix * vec4(animatedPosition, 1.0);

  vNormal = normalize(mat3(modelMatrix) * normal);
  vPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
