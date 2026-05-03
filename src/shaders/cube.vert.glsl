uniform float uTime;
uniform float uPos;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

float random(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
}

void main() {
  vUv = uv;
 float height = texture2D(uTexture,uv).r;
 vec3 newPosition = position + normal * - height  * uPos;

 
  gl_Position =  projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
