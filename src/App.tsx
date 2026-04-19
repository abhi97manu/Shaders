import { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  BoxGeometry,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import vertexShader from './shaders/cube.vert.glsl?raw';
import fragmentShader from './shaders/cube.frag.glsl?raw';

export default function App() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pointLightRef = useRef<PointLight | null>(null);
  const lightMarkerRef = useRef<Mesh | null>(null);
  const cubeMaterialRef = useRef<ShaderMaterial | null>(null);
  const [isPointLightOn, setIsPointLightOn] = useState(true);

  useEffect(() => {
    const intensity = isPointLightOn ? 9 : 0;

    if (pointLightRef.current) {
      pointLightRef.current.intensity = intensity;
    }

    if (lightMarkerRef.current) {
      lightMarkerRef.current.visible = isPointLightOn;
    }

    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.uniforms.uLightPower.value = isPointLightOn ? 1 : 0;
    }
  }, [isPointLightOn]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }
    //scene setup
    const scene = new Scene();
    scene.background = new Color('#191a1f');

    const camera = new PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(4, 3, 10);
    camera.lookAt(0, 0.8, 0);

    const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    scene.add(new AmbientLight('#a14848', 0.16));

    // The point light's intensity is set to 9 when on to create a strong lighting effect, and 0 when off to effectively disable it. The light's power is controlled via a uniform in the shader, allowing for smooth transitions in the cube's appearance based on the light's state.
    const pointLight = new PointLight('#ffcf66', isPointLightOn ? 9 : 0, 12, 1.4);
    pointLight.position.set(0, 4.2, 0);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(mount.clientWidth, mount.clientHeight) },
      uLightPosition: { value: new Vector3().copy(pointLight.position) },
      uLightPower: { value: isPointLightOn ? 1 : 0 },
      uBaseColor: { value: new Color('#5c4374') },
      uAccentColor: { value: new Color('#b68b2d') },
    };

    const cube = new Mesh(
      new BoxGeometry(1.8, 1.8, 1.8, 64, 64, 64),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
      }),
    );
    cube.position.y = 0.9;
    scene.add(cube);
    cubeMaterialRef.current = cube.material as ShaderMaterial;

    const plane = new Mesh(
      new PlaneGeometry(9, 9),
      new MeshStandardMaterial({
        color: '#4d515a',
        roughness: 0.72,
        metalness: 0.05,
      }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);

    const lightMarker = new Mesh(
      new SphereGeometry(0.14, 24, 24),
      new MeshBasicMaterial({
        color: '#ffcf66',
      }),
    );
    lightMarker.position.copy(pointLight.position);
    lightMarker.visible = isPointLightOn;
    scene.add(lightMarker);
    lightMarkerRef.current = lightMarker;

    const clock = new Clock();
    let animationFrame = 0;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      lightMarker.position.copy(pointLight.position);
      uniforms.uLightPosition.value.copy(pointLight.position);
      uniforms.uTime.value = elapsed;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      cube.geometry.dispose();
      plane.geometry.dispose();
      lightMarker.geometry.dispose();
      (cube.material as ShaderMaterial).dispose();
      (plane.material as MeshStandardMaterial).dispose();
      (lightMarker.material as MeshBasicMaterial).dispose();
      pointLightRef.current = null;
      lightMarkerRef.current = null;
      cubeMaterialRef.current = null;
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="scene-panel" ref={mountRef} aria-label="Animated shader cube scene" />
      <div className="hud">
        <span>WebGL Shader Scene</span>
        <strong>Top Point Light</strong>
        <label className="switch-row">
          <span>Point light</span>
          <input
            type="checkbox"
            checked={isPointLightOn}
            onChange={(event) => setIsPointLightOn(event.target.checked)}
            aria-label="Toggle point light"
          />
        </label>
      </div>
    </main>
  );
}
