import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Sound({ url, distance }) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(distance);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  }, [buffer, distance]);
  return <positionalAudio ref={sound} args={[listener]} />;
}

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene-draco.glb");
  useFrame(() => (group.current.rotation.y += 0.003));
  return (
    <group
      ref={group}
      scale={[0.001, 0.001, 0.001]}
      position={[0, 0, -100]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-102253.52, -210688.86, -17050.52]}>
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_0.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_1.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_2.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_3.geometry}
          />
        </group>
        <group position={[100000, 120000, 2000]}>
          <Sound url="/zapsplat_icecream.mp3" distance={10} />
        </group>
        <mesh position={[250000, -200000, 50000]}>
          <sphereBufferGeometry attach="geometry" args={[30000, 32, 32]} />
          <meshBasicMaterial attach="material" color="#ff1020" />
        </mesh>
      </group>
    </group>
  );
}
