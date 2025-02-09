import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function FloatingObject({
  modelPath,
  position = [0, 0, 0],
  scale = 1.2, // Default scale
  initialRotation = [0, 0, 0], // Default rotation in radians
  floatSpeed = 1,
  rotationSpeed = 0.5
}) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      // Apply continuous rotation
      ref.current.rotation.y = initialRotation[1] + t * rotationSpeed;

      // Apply floating animation (smooth up/down movement)
      ref.current.position.y = position[1] + Math.sin(t * floatSpeed) * 0.2;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      scale={scale}
      rotation={initialRotation} // Set initial rotation
    />
  );
}

export default FloatingObject;

