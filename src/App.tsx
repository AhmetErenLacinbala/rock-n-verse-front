//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas, MeshProps, ThreeElements, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { Token } from "./models/Token";
import { Concert_hall } from "./models/Simple_concert_stage";
import Plane from "./models/plane";
import { Perf } from "r3f-perf";
import {
  CameraControls,
  OrbitControls,
  Text,
  useScroll,
} from "@react-three/drei";

import { ReactLenis, useLenis } from "lenis/react";
import { useWindowScrollPositions } from "./hooks/my_hooks";
import * as THREE from "three";
import { Fire } from "./comps/Particles";
import GridPlane from "./models/GridPlane";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

interface CylinderProps extends MeshProps {
  position?: Vector3 | [number, number, number];
}
const Cylinder: React.FC<CylinderProps> = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef<Mesh>(null!);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh scale={0.3} ref={meshRef} rotation={[0, 0, 0]} position={position}>
      <cylinderGeometry args={[1, 1, 0.33, 64]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function App() {
  const { scrollX, scrollY } = useWindowScrollPositions();
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    const body = document.body;
    const fullHeight = Math.max(body.scrollHeight, body.offsetHeight);
    const scrollPara = scrollY / fullHeight;
    console.log("hook: ", scrollY, fullHeight, scrollPara * 100);
    setScrollCount(scrollPara * 100);
  }, [scrollY]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          position: "fixed",
          width: "100vw",
          top: "0",
          zIndex: "30",
        }}
      >
        <Canvas camera={{ position: [0, -2, 2] }}>
          <EffectComposer>
            <Perf position="top-left" />
            <Bloom mipmapBlur luminanceThreshold={1} />
            <TheComp scrollCount={scrollCount} />
            <OrbitControls />
          </EffectComposer>
        </Canvas>
      </div>
      <div
        style={{
          zIndex: "30",
          width: "100vw",
          position: "absolute",
          top: "0",
          color: "black",
          visibility: "hidden",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",

            textAlign: "center",
            margin: "auto",
            width: "50vw",
            fontSize: "64px",
            marginTop: "100vw",
          }}
        >
          <p
            style={{
              backgroundColor: "white",
            }}
          >
            1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            rerum ratione. Placeat, alias maxime autem esse molestiae tempore
            obcaecati non quaerat? Eligendi unde sit ex neque, perferendis
            tempora molestiae corrupti vero velit maxime at odio similique
            cupiditate dicta rem soluta quaerat consequuntur. Praesentium nemo
            facere tempora
          </p>
        </div>

        <div
          style={{
            textAlign: "right",
            margin: "auto",
            width: "40vw",
            marginTop: "400vh",
            fontSize: "64px",
          }}
        >
          <p
            style={{
              backgroundColor: "white",
              position: "absolute",
            }}
          >
            2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            rerum ratione. Placeat, alias maxime autem esse molestiae tempore
            obcaecati non quaerat? Eligendi unde sit ex neque, perferendis
            tempora molestiae corrupti vero velit maxime at odio similique
            cupiditate dicta rem soluta quaerat consequuntur. Praesentium nemo
            facere tempora Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Pariatur, rerum ratione. Placeat, alias maxime autem esse
            molestiae tempore obcaecati non quaerat? Eligendi unde sit ex neque,
            perferendis tempora molestiae corrupti vero velit maxime at odio
            similique cupiditate dicta rem soluta quaerat consequuntur.
            Praesentium nemo facere tempora. Placeat, alias maxime autem esse
            molestiae tempore obcaecati non quaerat? Eligendi unde sit ex neque,
            perferendis tempora molestiae corrupti vero velit maxime at odio
            similique cupiditate dicta rem soluta quaerat consequuntur.
            Praesentium nemo facere tempora Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Pariatur, rerum ratione. Placeat,
            alias maxime autem esse molestiae tempore obcaecati non quaerat?
            Eligendi unde sit ex neque, perferendis tempora molestiae corrupti
            vero velit maxime at odio similique cupiditate dicta rem soluta
            quaerat consequuntur. Praesentium nemo facere tempora
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            margin: "auto",
            width: "40vw",
            marginTop: "400vh",
            fontSize: "64px",
            position: "absolute",

            left: "10vw",
          }}
        >
          <p
            style={{
              backgroundColor: "white",
              position: "absolute",
            }}
          >
            3Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            rerum ratione. Placeat, alias maxime autem esse molestiae tempore
            obcaecati non quaerat? Eligendi unde sit ex neque, perferendis
            tempora molestiae corrupti vero velit maxime at odio similique
            cupiditate dicta rem soluta quaerat consequuntur. Praesentium nemo
            facere tempora Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Pariatur, rerum ratione. Placeat, alias maxime autem esse
            molestiae tempore obcaecati non quaerat? Eligendi unde sit ex neque,
            perferendis tempora molestiae corrupti vero velit maxime at odio
            similique cupiditate dicta rem soluta quaerat consequuntur.
            Praesentium nemo facere tempora. Placeat, alias maxime autem esse
            molestiae tempore obcaecati non quaerat? Eligendi unde sit ex neque,
            perferendis tempora molestiae corrupti vero velit maxime at odio
            similique cupiditate dicta rem soluta quaerat consequuntur.
            Praesentium nemo facere tempora Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Pariatur, rerum ratione. Placeat,
            alias maxime autem esse molestiae tempore obcaecati non quaerat?
            Eligendi unde sit ex neque, perferendis tempora molestiae corrupti
            vero velit maxime at odio similique cupiditate dicta rem soluta
            quaerat consequuntur. Praesentium nemo facere tempora
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            margin: "auto",
            width: "40vw",
            marginTop: "100vh",
            fontSize: "64px",
            marginTop: "100vw",
          }}
        >
          <p
            style={{
              backgroundColor: "white",
            }}
          >
            4alo ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            rerum ratione. Placeat, alias maxime autem esse molestiae tempore
            obcaecati non quaerat? Eligendi unde sit ex neque, perferendis
            tempora molestiae corrupti vero velit maxime at odio similique
            cupiditate dicta rem soluta quaerat consequuntur. Praesentium nemo
            facere tempora Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Pariatur, rerum ratione. Placeat, alias maxime autem esse
            molestiae tempore obcaecati non quaerat? Eligendi unde sit ex neque,
            perferendis tempora molestiae corrupti vero velit maxime at odio
            similique cupiditate dicta rem soluta quaerat consequuntur.
            Praesentium nemo facere tempora
          </p>
        </div>
      </div>
    </div>
  );
}

/*let arr: number[];
for (let i = 0; i < 300; i++) {
  arr.push(Math.random() * 30);
}*/
function TheComp(props) {
  const [particleCubeValues, setParticleCuberValues] = useState<number[]>();
  const { scrollCount } = props;
  const tokenRef = useRef();
  const gridRef = useRef();
  const helloWordRef = useRef();
  const [hover, setHover] = useState<boolean>(false);

  const particalRef = useRef();
  const cubeParticleRef = useRef();

  useFrame((state, delta) => (cubeParticleRef.current.rotation.y += delta));
  useEffect(() => {
    console.log(scrollCount, "true");

    gridRef.current.position.y = scrollCount;
  }, [scrollCount]);

  useEffect(() => {
    console.log("scrollcount: ", scrollCount);
    if (scrollCount > 6) {
      tokenRef.current.position.x = scrollCount / 1 - 14;

      tokenRef.current.rotation.z = -scrollCount / 1;
    }
  });

  /*useEffect(() => {
    const particleGeometry = new THREE.BoxGeometry(1, 1, 1);
    const particlePositions = new Float32Array(100 * 3);

    // Set all positions to zero
    for (let i = 0; i < particlePositions.length; i += 4) {
      particlePositions[i + 0] = 2;
      particlePositions[i + 1] = 0;
      particlePositions[i + 2] = 0;
    }

    console.log("particle positions: ", particlePositions);
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
    });

    particalRef.current.geometry = particleGeometry;
    particalRef.current.material = particleMaterial;
    console.log(particalRef.current.position);
  }, []);*/

  return (
    <mesh>
      <mesh ref={tokenRef} position={[-2, 0, 0]}>
        <pointLight
          position={[0, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <mesh rotation={[0, -0.2, 6.2]}>
          <Token rotation={[Math.PI / 1.5, 0, Math.PI / 1.2]} />
        </mesh>
      </mesh>

      <mesh ref={gridRef}>
        <mesh rotation={[0, 0, 0]} ref={cubeParticleRef}></mesh>

        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI / 2}
        />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Text
          position={[0, -2, 1.2]}
          scale={hover ? [0.6, 0.6, 0.6] : [0.2, 0.2, 0.2]}
          rotation={[Math.PI / 2, 0, 0]}
          color="red" // default
          anchorX="center" // default
          anchorY="middle" // default
          ref={helloWordRef}
          onClick={() => setHover(!hover)}
          color={hover ? "hotpink" : "orange"}
        >
          Yarak Gibi Şarkı Elif
        </Text>
        <Cylinder position={[-3, 0, 0]} />
        <pointLight
          position={[-10, -10, -10]}
          decay={0}
          intensity={Math.PI / 2}
        />

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 1]}>
          <GridPlane />
        </mesh>
      </mesh>
    </mesh>
  );
}

export default App;
