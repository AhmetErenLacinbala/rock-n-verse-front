//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas, MeshProps, ThreeElements, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { Token } from "./models/Token";
import Simple_Concert_Stage, {
  Concert_hall,
} from "./models/Simple_concert_stage";
import Plane from "./models/plane";
import { Perf } from "r3f-perf";
import {
  CameraControls,
  Environment,
  OrbitControls,
  Text,
  useScroll,
} from "@react-three/drei";

import { ReactLenis, useLenis } from "lenis/react";
import { useWindowScrollPositions } from "./hooks/my_hooks";
import * as THREE from "three";
import { CubeFireParticle, Fire, StarParticle } from "./comps/Particles";
import GridPlane from "./models/GridPlane";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { CubeByJc } from "@models/Cubebyjc";
import { PerspectiveCamera } from "@theatre/r3f";
import { Planet2 } from "@models/Planet2";

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

      <meshStandardMaterial
        metalness={0.9}
        roughness={0.1}
        color={hovered ? "hotpink" : "orange"}
      />
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
        <Canvas
          camera={{
            position: [0, -2, 2.5],
            rotation: [Math.PI / 3, 0, 0],
          }}
        >
          <EffectComposer>
            <Perf position="top-left" />
            <Bloom mipmapBlur luminanceThreshold={1} />
            <TheComp scrollCount={scrollCount} />
            <Environment path="cube" />
          </EffectComposer>
        </Canvas>
      </div>
      {
        <div
          style={{
            zIndex: "30",
            width: "100vw",
            position: "absolute",
            top: "0",
            color: "black",
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
              1Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Pariatur, rerum ratione. Placeat, alias maxime autem esse
              molestiae tempore obcaecati non quaerat? Eligendi unde sit ex
              neque, perferendis tempora molestiae corrupti vero velit maxime at
              odio similique cupiditate dicta rem soluta quaerat consequuntur.
              Praesentium nemo facere tempora
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
              2Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Pariatur, rerum ratione. Placeat, alias maxime autem esse
              molestiae tempore obcaecati non quaerat? Eligendi unde sit ex
              neque, perferendis tempora molestiae corrupti vero velit maxime at
              odio similique cupiditate dicta rem soluta quaerat consequuntur.
              Praesentium nemo facere tempora Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Pariatur, rerum ratione. Placeat,
              alias maxime autem esse molestiae tempore obcaecati non quaerat?
              Eligendi unde sit ex neque, perferendis tempora molestiae corrupti
              vero velit maxime at odio similique cupiditate dicta rem soluta
              quaerat consequuntur. Praesentium nemo facere tempora. Placeat,
              alias maxime autem esse molestiae tempore obcaecati non quaerat?
              Eligendi unde sit ex neque, perferendis tempora molestiae corrupti
              vero velit maxime at odio similique cupiditate dicta rem soluta
              quaerat consequuntur. Praesentium nemo facere tempora Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Pariatur, rerum
              ratione. Placeat, alias maxime autem esse molestiae tempore
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
              3Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Pariatur, rerum ratione. Placeat, alias maxime autem esse
              molestiae tempore obcaecati non quaerat? Eligendi unde sit ex
              neque, perferendis tempora molestiae corrupti vero velit maxime at
              odio similique cupiditate dicta rem soluta quaerat consequuntur.
              Praesentium nemo facere tempora Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Pariatur, rerum ratione. Placeat,
              alias maxime autem esse molestiae tempore obcaecati non quaerat?
              Eligendi unde sit ex neque, perferendis tempora molestiae corrupti
              vero velit maxime at odio similique cupiditate dicta rem soluta
              quaerat consequuntur. Praesentium nemo facere tempora. Placeat,
              alias maxime autem esse molestiae tempore obcaecati non quaerat?
              Eligendi unde sit ex neque, perferendis tempora molestiae corrupti
              vero velit maxime at odio similique cupiditate dicta rem soluta
              quaerat consequuntur. Praesentium nemo facere tempora Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Pariatur, rerum
              ratione. Placeat, alias maxime autem esse molestiae tempore
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
              molestiae tempore obcaecati non quaerat? Eligendi unde sit ex
              neque, perferendis tempora molestiae corrupti vero velit maxime at
              odio similique cupiditate dicta rem soluta quaerat consequuntur.
              Praesentium nemo facere tempora
            </p>
          </div>
        </div>
      }
    </div>
  );
}

/*let arr: number[];
for (let i = 0; i < 300; i++) {
  arr.push(Math.random() * 30);
}*/
function TheComp(props) {
  const { scrollCount } = props;
  const tokenRef = useRef();
  const gridRef = useRef();
  const helloWordRef = useRef();
  const [hover, setHover] = useState<boolean>(false);
  const cubeParticleRef = useRef();
  const allMeshRef = useRef();
  const planet3ref = useRef();
  useFrame((state, delta) => (cubeParticleRef.current.rotation.y += delta));
  useEffect(() => {
    console.log(scrollCount, "true");

    gridRef.current.position.y = scrollCount;
  }, [scrollCount]);

  useEffect(() => {
    allMeshRef.current.rotation.z = 0;
  }, []);
  useEffect(() => {
    console.log("scrollcount: ", scrollCount);
    if (scrollCount > 16 && allMeshRef.current.rotation.z < Math.PI / 2) {
      allMeshRef.current.rotation.z = -scrollCount / 10 + 16 / 10;
      planet3ref.current.position.y += scrollCount / 100;
    }
    if (scrollCount > 6) {
      tokenRef.current.visible = true;
      tokenRef.current.position.x = scrollCount / 1 - 14;

      tokenRef.current.rotation.z = -scrollCount / 1;
    } else {
      tokenRef.current.visible = false;
    }
  });

  return (
    <mesh ref={allMeshRef} rotation={[0, 0, 0]}>
      <mesh>
        <StarParticle particles={300} color={0xff8888} />
      </mesh>
      <mesh
        ref={planet3ref}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-30, -50, 0]}
      >
        <Planet2 />
      </mesh>
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
        <Box position={[-1.2, -2, -2]} />
        <Box position={[1.2, -2, -2]} />
        <Text
          visible={false}
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
          hello world
        </Text>

        <pointLight
          position={[-10, -10, -10]}
          decay={0}
          intensity={Math.PI / 2}
        />

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <GridPlane scrollCount={scrollCount} />
          <GridPlane
            scrollCount={scrollCount}
            position={[0, -0.0001, -4.5]}
            scale={[-1, 1, 1]}
          />

          {/*

           <mesh position={[0, 1, 0]}>
            <mesh position={[0, 1, 0]}>
              <CubeFireParticle speed={0.001} color={0x000000} particles={50} />
            </mesh>
            <CubeFireParticle speed={0.0001} color={0xff5504} particles={100} />
          </mesh>

          <mesh position={[0, 0, 4]}>
            <mesh position={[0, 1, 0]}>
              <CubeFireParticle
                speed={0.0001}
                color={0x000000}
                particles={200}
                />
            </mesh>
            <CubeFireParticle speed={0.001} color={0xff5504} particles={25} />
          </mesh>

          <Simple_Concert_Stage scale={0.2} position={[0, 0.25, -5]} />
        */}
        </mesh>
      </mesh>
    </mesh>
  );
}

export default App;
