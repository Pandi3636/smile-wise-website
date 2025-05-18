import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, RotateCw, Play, Pause, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const TeethViewSection = () => {
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [activeView, setActiveView] = useState<"healthy" | "rootcanal">("healthy");
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  // Create realistic tooth geometry
  const createToothGeometry = (type: "healthy" | "rootcanal") => {
    const group = new THREE.Group();
    
    // Create crown (more detailed)
    const crownGeometry = new THREE.ConeGeometry(1, 1.5, 32);
    const crownMaterial = new THREE.MeshPhongMaterial({ 
      color: type === "healthy" ? 0xffffff : 0xffd700,
      specular: 0x111111,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 0.5;
    
    // Add surface details to crown
    const surfaceGeometry = new THREE.SphereGeometry(1.02, 32, 32);
    const surfaceMaterial = new THREE.MeshPhongMaterial({
      color: type === "healthy" ? 0xffffff : 0xffd700,
      specular: 0x222222,
      shininess: 50,
      transparent: true,
      opacity: 0.3
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    surface.position.y = 0.5;
    surface.scale.y = 0.5;
    group.add(surface);
    group.add(crown);

    // Create root (more detailed)
    const rootGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1.5, 32);
    const rootMaterial = new THREE.MeshPhongMaterial({ 
      color: type === "healthy" ? 0xffd700 : 0xffa500,
      specular: 0x111111,
      shininess: 30
    });
    const root = new THREE.Mesh(rootGeometry, rootMaterial);
    root.position.y = -1;
    group.add(root);

    // Add root canal if needed
    if (type === "rootcanal") {
      const canalGeometry = new THREE.CylinderGeometry(0.1, 0.15, 1.2, 32);
      const canalMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b4513,
        specular: 0x111111,
        shininess: 20
      });
      const canal = new THREE.Mesh(canalGeometry, canalMaterial);
      canal.position.y = -0.8;
      group.add(canal);
    }

    // Add gum line
    const gumGeometry = new THREE.TorusGeometry(1.1, 0.2, 16, 32);
    const gumMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      specular: 0x111111,
      shininess: 20
    });
    const gum = new THREE.Mesh(gumGeometry, gumMaterial);
    gum.position.y = 0;
    gum.rotation.x = Math.PI / 2;
    group.add(gum);

    return group;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional lights for better depth
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
    frontLight.position.set(0, 1, 1);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, -1, -1);
    scene.add(backLight);

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0xf0f0f0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Create and add the tooth model
    const toothModel = createToothGeometry(activeView);
    scene.add(toothModel);
    modelRef.current = toothModel;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (isAutoRotating && modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [activeView, isAutoRotating]);

  const handleZoom = (direction: "in" | "out") => {
    if (!cameraRef.current) return;
    const zoomFactor = direction === "in" ? 0.9 : 1.1;
    cameraRef.current.position.z *= zoomFactor;
  };

  return (
    <section id="teeth-view" className="py-16 bg-gradient-to-b from-white to-dental-light-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dental-dark-gray mb-4">Interactive 3D Dental View</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore detailed 3D views of dental conditions and treatments
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-6">
              <Tabs defaultValue="healthy" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger 
                    value="healthy"
                    className="text-lg font-medium"
                    onClick={() => setActiveView("healthy")}
                  >
                    Healthy Teeth
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rootcanal"
                    className="text-lg font-medium"
                    onClick={() => setActiveView("rootcanal")}
                  >
                    Root Canal Treatment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeView} className="mt-0">
                  <div className="bg-white rounded-lg">
                    <div className="relative aspect-square max-w-2xl mx-auto">
                      {/* 3D viewer container */}
                      <div 
                        ref={containerRef} 
                        className="w-full h-full rounded-lg overflow-hidden bg-dental-light-gray"
                      />

                      {/* Controls overlay */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleZoom("in")}
                          className="bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 p-0"
                        >
                          <ZoomIn className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAutoRotating(!isAutoRotating)}
                          className="bg-white/90 hover:bg-white shadow-lg rounded-full px-4 py-2"
                        >
                          {isAutoRotating ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Stop Rotation
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Auto Rotate
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleZoom("out")}
                          className="bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 p-0"
                        >
                          <ZoomOut className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Instructions overlay */}
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Click and drag to rotate • Scroll to zoom
                      </div>
                    </div>


                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeethViewSection;