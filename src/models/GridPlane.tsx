//@ts-ignore
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./src/models/gridPlane.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function GridPlane(props) {
  const { nodes, materials } = useGLTF("/gridPlane.glb");
  console.log("aa", materials["Material.033"]);
  return (
    <group {...props} dispose={null}>
      <mesh material={"attach"} geometry={nodes.Plane005.geometry}>
        <meshStandardMaterial color={0x5350ff}></meshStandardMaterial>
      </mesh>
      <mesh geometry={nodes.Plane005_1.geometry} material={"attach"}>
        <meshStandardMaterial
          color={0xffacb9}
          emissive={0xffacb9}
          emissiveIntensity={4}
        ></meshStandardMaterial>
      </mesh>
    </group>
  );
}

useGLTF.preload("/gridPlane.glb");