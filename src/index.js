import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Canvas}from '@react-three/fiber';
import Model from './Model';
import './styles.css';

ReactDOM.render(
  <Canvas camera={{position: [0, 2, 20], fov: 40}}>
    <fog attach="fog" args={['#cc7b32', 0, 500]}/>
    <Suspense fallback={null}>
      <Model/>
    </Suspense>
  </Canvas>,
  document.getElementById('root');
)
