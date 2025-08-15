import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDSphereProps {
  logos: Array<{ name: string; url: string }>;
}

const ThreeDSphere = ({ logos }: ThreeDSphereProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(128, 128);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create transparent sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Add logos as sprites inside sphere
    const textureLoader = new THREE.TextureLoader();
    logos.slice(0, 30).forEach((logo, index) => {
      textureLoader.load(logo.url, (texture) => {
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);
        
        // Random position inside sphere
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = Math.random() * 1.8;
        
        sprite.position.x = radius * Math.sin(theta) * Math.cos(phi);
        sprite.position.y = radius * Math.sin(theta) * Math.sin(phi);
        sprite.position.z = radius * Math.cos(theta);
        
        sprite.scale.set(0.3, 0.3, 0.3);
        scene.add(sprite);
      });
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [logos]);

  return <div ref={mountRef} className="w-32 h-32" />;
};

export default ThreeDSphere;