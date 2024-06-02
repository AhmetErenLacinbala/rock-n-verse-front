/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 planet2.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Planet2(props) {
  const { nodes, materials } = useGLTF("/planet2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane006.geometry}
        material={materials["Material.009"]}
      />
      <mesh
        geometry={nodes.Plane007.geometry}
        material={materials["Material.009"]}
        position={[0, 0, -46.362]}
        rotation={[-Math.PI, 1.483, -Math.PI]}
      />
      <mesh
        geometry={nodes.Cylinder006.geometry}
        material={materials["Material.009"]}
        position={[4.038, -0.576, 0.465]}
        rotation={[0, -1.296, 0]}
        scale={3.165}
      />
      <group position={[0, 0, -12.069]} rotation={[0, -1.352, 0]}>
        <mesh geometry={nodes.Plane010_1.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={0}
          ></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes.Plane010_2.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={10}
          ></meshStandardMaterial>
        </mesh>
      </group>
      <group position={[0, 0, -29.413]} rotation={[-Math.PI, 0.948, -Math.PI]}>
        <mesh geometry={nodes.Plane010_1.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={0}
          ></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes.Plane010_2.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={10}
          ></meshStandardMaterial>
        </mesh>
      </group>
      <group
        position={[19.965, 0, -29.413]}
        rotation={[-Math.PI, 0.948, -Math.PI]}
      >
        <mesh geometry={nodes.Plane010_1.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={0}
          ></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes.Plane010_2.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={10}
          ></meshStandardMaterial>
        </mesh>
      </group>
      <group position={[0, 0, 7.942]} rotation={[-Math.PI, 1.527, -Math.PI]}>
        <mesh geometry={nodes.Plane010_1.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={0}
          ></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes.Plane010_2.geometry} material={"attach"}>
          <meshStandardMaterial
            color={0xff5504}
            emissive={0xff5504}
            emissiveIntensity={10}
          ></meshStandardMaterial>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/planet2.glb");
