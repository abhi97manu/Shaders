uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uLightPosition;
uniform float uLightPower;
uniform vec3 uBaseColor;
uniform vec3 uAccentColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 lightDirection = normalize(uLightPosition - vPosition);
  vec3 eyeDirection = normalize(cameraPosition - vPosition);
  float dotProduct = dot(normalize(vNormal), eyeDirection);
  float diffuse = max(dot(normalize(vNormal), lightDirection), 0.0);

 

    gl_FragColor = vec4(uBaseColor*diffuse*uLightPower, 1.0);
  
}
