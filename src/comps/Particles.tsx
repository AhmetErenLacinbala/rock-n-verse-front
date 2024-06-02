import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function CubeParticle({ count = 10, temp = new THREE.Object3D() }) {
  const instancedMeshRef = useRef();
  useEffect(() => {
    const color = new THREE.Color(0x00ff00);
    // Set positions
    for (let i = 0; i < count; i++) {
      temp.matrix.decompose(temp.position, temp.quaternion, temp.scale);
      temp.rotation.y = Math.random() * Math.PI;
      temp.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      );

      temp.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, temp.matrix);
      color.setHex(0x00ff00); // Example initial color, you can change this
      instancedMeshRef.current.setColorAt(i, color);
    }
    console.log(instancedMeshRef.current);
    // Update the instance
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    instancedMeshRef.current.instanceColor.needsUpdate = true;
  }, []);

  const updateColors = () => {
    for (let i = 0; i < count; i++) {
      //temp.matrix.decompose(temp.position, temp.quaternion, temp.scale);
      temp.rotation.y = Math.random() * Math.PI;
      //instancedMeshRef.current.setMatrixAt(i, temp.matrix);

      const color = new THREE.Color(Math.random() * 0xffffff);
      instancedMeshRef.current.setColorAt(i, color);
    }
    // Mark the instance color attribute as needing an update
    instancedMeshRef.current.instanceColor.needsUpdate = true;
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  };
  /*useFrame((state, delta) => {
    for (let i = 0; i < count; i++) {
      // get the items current position
      instancedMeshRef.current.getMatrixAt(i, temp.matrix);
      /*console.log("item: ", i, "currentMatrix: ", currentMatrix.toArray()); 

      // set the temp objects position using this matrix
      //threejs doesn't let you set the matrix directly
      temp.matrix.decompose(temp.position, temp.quaternion, temp.scale);
      // do the transformation to the temp object
      console.log("Rotation: ", temp.rotation.y);

      temp.rotation.y -= delta * 0.01;
      temp.updateMatrix();
      //push the change back to the instance
      instancedMeshRef.current.setMatrixAt(i, temp.matrix);
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });*/
  return (
    <instancedMesh
      onClick={() => updateColors()}
      ref={instancedMeshRef}
      args={[null, null, count]}
    >
      <boxGeometry />
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  );
}

interface ParticleProps {
  particles: number;
  color: number;
  speed: number;
}

export function CubeFireParticle(props: ParticleProps) {
  const { particles, color, speed } = props;
  const ref = useRef<THREE.InstancedMesh>(null!);
  const particleCount = particles;
  const positions = useRef(
    new Array(particleCount).fill(0).map(() => ({
      x: Math.random() * 0.25,
      y: Math.random(),
      z: Math.random() * 10 - 5,
      rotation: Math.random() * Math.PI * 2, // Initial rotation angle
      velocityX: (Math.random() - 0.5) * 0.01, // Random velocity
      velocityZ: (Math.random() - 0.5) * 0.01, // Random velocity
    }))
  );

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 4,
    });

    ref.current.geometry = geometry;
    ref.current.material = material;

    const dummy = new THREE.Object3D();
    positions.current.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.rotation.set(0, pos.rotation, 0); // Set initial rotation
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    const dummy = new THREE.Object3D();

    positions.current.forEach((pos, i) => {
      pos.y += speed * delta + pos.y / 20; // Update position with consistent speed
      pos.rotation += delta; // Update rotation
      pos.x += pos.velocityX; // Move away from the center on X axis
      pos.z += pos.velocityZ; // Move away from the center on Z axis

      if (pos.y > 1 + Math.random()) {
        // Reset position if it goes above a certain point
        pos.y = Math.random() * 0.25;
        pos.x = Math.random() * 0.25;
        pos.z = Math.random() * 10 - 5;
        pos.rotation = Math.random() * Math.PI * 2; // Reset rotation
        pos.velocityX = (Math.random() - 0.5) * 0.01; // Reset velocity
        pos.velocityZ = (Math.random() - 0.5) * 0.01; // Reset velocity
      }

      const scale = pos.y * 2 + 0.5; // Calculate scale based on Y position

      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.scale.set(scale, scale, scale); // Update scale based on Y position
      dummy.rotation.set(0, 0, pos.rotation); // Update rotation
      dummy.updateMatrix();

      ref.current.setMatrixAt(i, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      position={[0, 1, -10]}
      rotation={[0, Math.PI / 2, 0]}
      ref={ref}
      args={[undefined, undefined, particleCount]}
    />
  );
}

export function StarParticle(props: ParticleProps) {
  const { particles, color } = props;
  const { nodes, materials } = useGLTF("/star.glb");
  const ref = useRef<THREE.InstancedMesh>(null!);
  const particleCount = particles;
  const positions = useRef(
    new Array(particleCount).fill(0).map(() => ({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
      z: Math.random() * 300 - 150,
      rotation: Math.random() * Math.PI * 2, // Initial rotation angle
    }))
  );

  useEffect(() => {
    const geometry = nodes.Icosphere.geometry;
    const material = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 10,
    });

    ref.current.geometry = geometry;
    ref.current.material = material;

    const dummy = new THREE.Object3D();
    positions.current.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.rotation.set(pos.rotation, pos.rotation, pos.rotation); // Set initial rotation
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      ref={ref}
      args={[undefined, undefined, particleCount]}
    />
  );
}

useGLTF.preload("/star.glb");
