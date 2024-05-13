import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas, MeshProps, ThreeElements, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

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
  const [scrollCount, setScrollCount] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setScrollCount((prevCount) => prevCount + 1);
    } else if (currentScrollTop < lastScrollTop) {
      // Scrolling up
      setScrollCount((prevCount) => prevCount - 1);
    }
    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);
  useEffect(() => {
    console.log(scrollCount);
  });
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      {scrollCount}
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Cylinder position={[-3, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
