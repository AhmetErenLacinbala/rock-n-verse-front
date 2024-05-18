import React from "react";
import { useThree } from "@react-three/fiber";

const Plane = () => {
  const { scene } = useThree();

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
    >
      <planeGeometry attach="geometry" args={[20, 16]} />
      <meshBasicMaterial attach="material" color="#082444" />
    </mesh>
  );
};

export default Plane;
