import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const InteractiveGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const mountNode = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountNode.clientWidth / mountNode.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x00F5D4, 2, 10);
    pointLight.position.set(-5, 3, 3);
    scene.add(pointLight);

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/land_ocean_ice_cloud_2048.jpg');
    const bumpTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/earth_bump.jpg');
    const futuristicMapTexture = textureLoader.load('https://raw.githubusercontent.com/images-ai-prototype/prompt-to-code/main/assets/images/map_2.png')
    
    // Globe Group
    const globeGroup = new THREE.Group();
    const globeGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      metalness: 0.3,
      roughness: 0.6,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.6, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.96, 0.83, 1.0) * intensity * 0.5 + vec4(0.6, 0.36, 0.9, 1.0) * intensity * 0.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    globeGroup.add(atmosphere);
    scene.add(globeGroup);

    // Trade Routes
    function createTradeRoute(start: [number, number], end: [number, number]) {
        const startLat = THREE.MathUtils.degToRad(start[0]);
        const startLon = THREE.MathUtils.degToRad(start[1]);
        const endLat = THREE.MathUtils.degToRad(end[0]);
        const endLon = THREE.MathUtils.degToRad(end[1]);
        const radius = 2.55;

        const startVec = new THREE.Vector3(Math.cos(startLat) * Math.cos(startLon), Math.sin(startLat), Math.cos(startLat) * Math.sin(startLon)).multiplyScalar(radius);
        const endVec = new THREE.Vector3(Math.cos(endLat) * Math.cos(endLon), Math.sin(endLat), Math.cos(endLat) * Math.sin(endLon)).multiplyScalar(radius);
        
        const arc = new THREE.CatmullRomCurve3([startVec, startVec.clone().lerp(endVec, 0.5).normalize().multiplyScalar(radius + 0.5), endVec]);
        const points = arc.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x9B5DE5, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
        return new THREE.Line(geometry, material);
    }
    globeGroup.add(createTradeRoute([20.59, 78.96], [34.05, -118.24])); // India to USA
    globeGroup.add(createTradeRoute([35.68, 139.69], [51.50, -0.12])); // Japan to UK
    
    // Map Group
    const mapGroup = new THREE.Group();
    const mapGeometry = new THREE.PlaneGeometry(12, 6);
    const mapMaterial = new THREE.MeshBasicMaterial({ map: futuristicMapTexture, transparent: true, opacity: 0 });
    const map = new THREE.Mesh(mapGeometry, mapMaterial);
    mapGroup.position.z = -2;
    mapGroup.add(map);

    const mapGrid = new THREE.GridHelper(12, 12, 0x00F5D4, 0x9B5DE5);
    mapGrid.material.transparent = true;
    mapGrid.material.opacity = 0;
    mapGroup.add(mapGrid);
    scene.add(mapGroup);
    

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      globe.rotation.y = elapsedTime * 0.1;
      globeGroup.rotation.y += (mouse.x * 0.2 - globeGroup.rotation.y) * 0.02;
      globeGroup.rotation.x += (-mouse.y * 0.2 - globeGroup.rotation.x) * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    // GSAP ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom+=100% top",
        scrub: 1,
        pin: true,
      }
    });
    
    tl.to(globeGroup.scale, { x: 0.5, y: 0.5, z: 0.5 }, 0)
      .to(camera.position, { z: 8 }, 0)
      .to(globeGroup.material, { opacity: 0, duration: 0.3 }, 0.5)
      .set(globeGroup, { visible: false })
      .to(map.material, { opacity: 1 }, 0.6)
      .to(mapGrid.material, { opacity: 0.5 }, 0.6)
      .to(map.position, { z: 1 }, 0.6);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
              if (object.geometry) object.geometry.dispose();
              if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
              }
          }
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default InteractiveGlobe;
