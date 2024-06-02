/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 star.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/star.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Icosphere.geometry} material={materials['Material.001']} />
    </group>
  )
}

useGLTF.preload('/star.glb')
