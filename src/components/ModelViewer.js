import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useErrorBoundary } from "use-error-boundary";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const ModelViewer = ({ props, modelPath }) => {
  const { nodes, materials } = useGLTF(modelPath);
  const firstMesh = Object.values(nodes).find((node) => node.isMesh);
  const firstMaterial = Object.values(materials)[0];
  const globeScale = 3;

  // Apply emissive material properties
  if (firstMaterial) {
    firstMaterial.emissive = new THREE.Color(0x33b5e5); // Blue glow
    firstMaterial.emissiveIntensity = 2; // Adjust brightness
    firstMaterial.side = THREE.FrontSide;
  }

  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  const to3DCoordinates = (latitude, longitude, radius = globeScale) => {
    const phi = (latitude + 3) * (Math.PI / 180);
    const theta = (longitude + 56) * (Math.PI / 180);
    const x = radius * Math.cos(phi) * Math.sin(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.cos(theta);
    return [z, y, -x]; // Adjust for rotation
  };

  const pinPosition = to3DCoordinates(43.6683, -116.4436);

  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [camera, setCamera] = useState(null);

  const pinRef = useRef();
  const canvasRef = useRef();

  const handlePointerOver = (event) => {
    setHovered(true);
    updateTooltipPosition(event);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const updateTooltipPosition = (event) => {
    if (!camera || !pinRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const pinWorldPosition = new THREE.Vector3();
    pinRef.current.getWorldPosition(pinWorldPosition);

    // Convert 3D position to 2D screen coordinates
    const screenPosition = pinWorldPosition.project(camera);
    const x = (screenPosition.x + 1) * (canvasRect.width / 2);
    const y = -(screenPosition.y - 1) * (canvasRect.height / 2);

    setTooltipPosition({ x, y });
  };

  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <div style={{ width: 400, height: 400, position: "relative" }}>
      

      <Canvas
        ref={canvasRef}
        onCreated={({ camera }) => {
          setCamera(camera);
        }}
        fallback={<div>Sorry, no WebGL supported!</div>}
        hdr
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <group {...props} dispose={null} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Render the globe */}
          <mesh geometry={firstMesh.geometry} material={firstMaterial} scale={[globeScale, globeScale, globeScale]} />

          {/* Pin Mesh */}
          <mesh
            position={pinPosition}
            ref={pinRef}
            onPointerOver={handlePointerOver}
            onPointerMove={updateTooltipPosition}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>

        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.3} intensity={1} />
        </EffectComposer>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI} minPolarAngle={0} />
      </Canvas>
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            transform: "translate(-50%, -100%)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            pointerEvents: "none",
          }}
        >
          Located in Star, Idaho
        </div>
      )}
    </div>
  );
};

export default ModelViewer;

