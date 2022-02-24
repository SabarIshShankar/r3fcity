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
  return <positionalAudi ref={sound} args={[listener]} />;
}
