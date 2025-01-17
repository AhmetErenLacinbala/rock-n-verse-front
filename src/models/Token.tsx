//@ts-ignore
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 token.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Token(props) {
  const { nodes, materials } = useGLTF("/token.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, -Math.PI]} scale={[-1, -0.044, -1]}>
        <mesh
          geometry={nodes.Cylinder009.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          geometry={nodes.Cylinder009_1.geometry}
          material={materials["Material.019"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/token.glb");
