import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingObject from "./FloatingObject";
import EmissiveCircle from "./EmissiveCircle";

function ComboScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Keyboard (slightly left) */}
      <FloatingObject
        modelPath="models/keyboard.glb"
        position={[-1.7, 0.2, 0]}
        scale={7}
        initialRotation={[0, 0, Math.PI / 2]}
        rotationSpeed={0.75}
      />
      <EmissiveCircle position={[-1.7, -1.9, 0]} color="#5DE2E7" />

      {/* Controller (center) */}
      <FloatingObject
        modelPath="models/controller.glb"
        position={[-0.2, 0.7, -1]}
        floatSpeed={1.3}
        scale={2}
        rotationSpeed={-0.6}
      />
      <EmissiveCircle position={[-0.2, 0.2, -1]} color="#7DDA58" />

      {/* Phone (slightly right) */}
      <FloatingObject
        modelPath="models/phone.glb"
        position={[1.5, -0.5, 0]}
        floatSpeed={0.8}
        scale={1}
        rotationSpeed={0.4}
      />
      <EmissiveCircle position={[1.5, -1, 0]} color="#FE9900" />

    </Canvas>
  );
}

export default ComboScene;
