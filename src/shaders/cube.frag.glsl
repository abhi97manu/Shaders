uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uLightPosition;
uniform float uLightPower;
uniform vec3 uBaseColor;
uniform vec3 uAccentColor;
uniform float uPos;


varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 lightDirection = normalize(uLightPosition - vPosition);
 
  float diffuse = max(dot(normalize(vNormal), lightDirection), 0.0);
  vec3 color = mix(uBaseColor , vec3(diffuse, uPos,sin(uTime) ), 0.2);

 

    gl_FragColor = vec4(vec3(diffuse,diffuse,diffuse), 1.0);
  
}
