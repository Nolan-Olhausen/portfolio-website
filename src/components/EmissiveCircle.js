import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const EmissiveCircle = ({ position = [0, 0, 0], scale = 1, color = "#ff0000" }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      ref.current.scale.set(pulse * scale, pulse * scale, pulse * scale);
    }
  });

  return (
    <>
      <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.1, 32, 100]} />
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={1.5}
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
};

export default EmissiveCircle;




