import { useMemo, useRef } from "react";
import { Color } from "three";

const vertexShader = `

vec3 gridPlane[6] = vec3[](
    vec3(1, 1, 0), vec3(-1, -1, 0), vec3(-1, 1, 0),
    vec3(-1, -1, 0), vec3(1, 1, 0), vec3(1, -1, 0)
);

void main(){
    vec4 modelPosition = modelMatrix * vec4(gridPlane[gl_VertexIndex].xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

}
`;

const fragmentShader = `
void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

export default function ShaderPlane() {
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );

  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} material={"attach"}>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      ></shaderMaterial>
    </mesh>
  );
}
