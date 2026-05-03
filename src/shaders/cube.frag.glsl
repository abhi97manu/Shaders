uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uLightPosition;
uniform float uLightPower;
uniform vec3 uBaseColor;
uniform vec3 uAccentColor;
uniform float uPos;
uniform sampler2D uTexture;


varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
 
  vec3 lightDirection = normalize(uLightPosition - vPosition);
  vec4 texture = texture2D(uTexture,vUv);
  float diffuse = max(dot(normalize(vNormal), lightDirection), 0.0);
  

 

    gl_FragColor = vec4( 1.0,1.0,1.0 , 1.0) * texture ;
  
}
