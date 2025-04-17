'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import GameStage from './GameStage'
import Player from './Player'

export default function GameCanvas() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <color attach="background" args={['#87ceeb']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Suspense fallback={null}>
          <Physics>
            <GameStage />
            <Player />
          </Physics>
        </Suspense>
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  )
}