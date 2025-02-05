import React, { useState, useRef, useEffect, useContext } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useErrorBoundary } from "use-error-boundary";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ThemeContext } from '../context/ThemeContext';

const RotatingGroup = ({ children, ...props }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * -0.2; // Adjust rotation speed here
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
};

const useDetectVisibility = (meshRef, camera) => {
  const [isVisible, setIsVisible] = useState(false);

  useFrame(() => {
    if (!camera || !meshRef.current) return;

    const frustum = new THREE.Frustum();
    const cameraViewProjectionMatrix = new THREE.Matrix4();

    camera.updateMatrixWorld(); // Update camera matrix
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); // Get the inverse of the camera matrix
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); // Create the camera view projection matrix
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix); // Update the frustum

    const meshWorldPosition = new THREE.Vector3();
    meshRef.current.getWorldPosition(meshWorldPosition);
    setIsVisible(frustum.containsPoint(meshWorldPosition)); // Check if the mesh is within the camera's frustum
  });

  return isVisible;
};

const Pin = ({ position, pinRef, handlePointerOver, handlePointerOut, updateTooltipPosition }) => {
  const { camera, scene } = useThree();
  const [isVisible, setIsVisible] = useState(false);

  const handlePointerOverInternal = (event) => {
    if (isVisible) {
      handlePointerOver(event);
    }
  };

  useFrame(() => {
    if (!camera || !pinRef.current) return;

    // Check if pin is occluded by the globe
    const pinWorldPosition = new THREE.Vector3();
    pinRef.current.getWorldPosition(pinWorldPosition);

    const direction = pinWorldPosition.clone().sub(camera.position).normalize();
    const raycaster = new THREE.Raycaster(camera.position, direction);
    const intersects = raycaster.intersectObject(scene, true);

    setIsVisible(
      intersects.length > 0 &&
      intersects[0].object === pinRef.current
    );
  });

  return (
    <mesh
      position={position}
      ref={pinRef}
      onPointerOver={handlePointerOverInternal}
      onPointerMove={updateTooltipPosition}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial 
        color="#FF8C1A" 
        emissive={new THREE.Color(0xFF8C1A)} // Set the emissive color to red
        emissiveIntensity={1} // Adjust the intensity of the emission
      />
    </mesh>
  );
};

const GlobeViewer = ({ props, modelPath }) => {
  const { theme } = useContext(ThemeContext);
  const { nodes, materials } = useGLTF(modelPath);
  const firstMesh = Object.values(nodes).find((node) => node.isMesh);
  const firstMaterial = Object.values(materials)[0];
  const globeScale = 3;

  if (firstMaterial && theme == 'dark') {
    firstMaterial.emissive = new THREE.Color(0x33b5e5); // Blue glow
    firstMaterial.emissiveIntensity = 2; // Adjust brightness
    firstMaterial.side = THREE.FrontSide;
  } else {
    firstMaterial.emissive = new THREE.Color(0x33b5e5); // Blue glow
    firstMaterial.emissiveIntensity = 1; // Adjust brightness
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
          camera.layers.enable(1); // Enable layer 1 for the camera
        }}
        fallback={<div>Sorry, no WebGL supported!</div>}
        hdr
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <RotatingGroup {...props} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={firstMesh.geometry}
            material={firstMaterial}
            scale={[globeScale, globeScale, globeScale]}
            layers={[0]} // Set globe to layer 0
            renderOrder={0}
          />
          <Pin
            position={pinPosition}
            pinRef={pinRef}
            handlePointerOver={handlePointerOver}
            handlePointerOut={handlePointerOut}
            updateTooltipPosition={updateTooltipPosition}
          />
        </RotatingGroup>

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

export default GlobeViewer;


