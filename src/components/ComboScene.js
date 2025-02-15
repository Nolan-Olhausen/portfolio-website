import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingObject from "./FloatingObject";
import EmissiveCircle from "./EmissiveCircle";

function ComboScene() {
  const [scales, setScales] = useState({ keyboard: 7, controller: 2, phone: 1 });
  const [positions, setPositions] = useState({
    keyboard: [-1.7, 0.2, 0],
    controller: [-0.2, 0.7, -1],
    phone: [1.5, -0.5, 0],
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setScales({ keyboard: 4, controller: 1.2, phone: 0.6 });
        setPositions({
          keyboard: [-0.85, -0.4, 0], // Move closer to center
          controller: [-0.1, 0.2, -2], // Slightly adjust
          phone: [0.75, -0.1, 0], // Move closer to center
        });
      } else if (width <= 1024) {
        setScales({ keyboard: 5, controller: 1.6, phone: 0.8 });
        setPositions({
          keyboard: [-1.25, 0.2, 0], 
          controller: [-0.15, 0.7, -1], 
          phone: [1.15, -0.5, 0], 
        });
      } else {
        setScales({ keyboard: 7, controller: 2, phone: 1 });
        setPositions({
          keyboard: [-1.7, 0.2, 0], 
          controller: [-0.2, 0.7, -1], 
          phone: [1.5, -0.5, 0], 
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial values

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Keyboard (slightly left) */}
      <FloatingObject
        modelPath="models/keyboard.glb"
        position={positions.keyboard}
        scale={scales.keyboard}
        initialRotation={[0, 0, Math.PI / 2]}
        rotationSpeed={0.75}
      />
      <EmissiveCircle position={[positions.keyboard[0], -1.9, 0]} color="#5DE2E7" />

      {/* Controller (center) */}
      <FloatingObject
        modelPath="models/controller.glb"
        position={positions.controller}
        floatSpeed={1.3}
        scale={scales.controller}
        rotationSpeed={-0.6}
      />
      <EmissiveCircle position={[positions.controller[0], positions.controller[1] - 0.5, positions.controller[2]]} color="#7DDA58" />

      {/* Phone (slightly right) */}
      <FloatingObject
        modelPath="models/phone.glb"
        position={positions.phone}
        floatSpeed={0.8}
        scale={scales.phone}
        rotationSpeed={0.4}
      />
      <EmissiveCircle position={[positions.phone[0], positions.phone[1] - 0.5, 0]} color="#FF9907" />
    </Canvas>
  );
}

export default ComboScene;

