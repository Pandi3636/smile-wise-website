import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// Fix the import path for OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const TeethViewSection = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // === THREE.JS CODE START ===

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the 3D model (replace 'path/to/your/model.gltf' with the actual path)
    const loader = new THREE.GLTFLoader();
    loader.load('/scene.gltf', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Optional: Scale the model if it's too big or small
      model.scale.set(0.01, 0.01, 0.01);

      // Center the model (adjust the values as needed)
      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());
      model.position.set(-center.x, -center.y, -center.z);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        controls.update(); // required if damping or auto-rotation is enabled

        renderer.render(scene, camera);
      };

      animate();
    }, undefined, function (error) {
      console.error(error);
    });

    // === THREE.JS EXAMPLE CODE END ===

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / 2 / window.innerHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div id="teeth-view" className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Explore Our 3D Teeth View
        </h2>
        <div ref={mountRef} style={{ height: '500px' }} />
        <p className="text-center text-gray-600 mt-4">
          Interact with our 3D teeth model to learn more about dental anatomy.
        </p>
      </div>
    </div>
  );
}

export default TeethViewSection;
