import { Material, Object3D, Object3DEventMap } from "three";

export interface gltfModel {
  nodes: Object3D<Object3DEventMap>;
  materials: Material[];
}
