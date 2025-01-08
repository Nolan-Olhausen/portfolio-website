import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useErrorBoundary } from "use-error-boundary";

const ModelViewer = ({ props, modelPath }) => {
  const { nodes, materials } = useGLTF(modelPath);
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <ErrorBoundary>
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <group {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.Material}
          />
        </group>
        <OrbitControls
          enableZoom={true} // Allow zooming
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation
          minPolarAngle={0} // Prevent flipping
        />
      </Canvas>
    </ErrorBoundary>
  );
};

export default ModelViewer;
