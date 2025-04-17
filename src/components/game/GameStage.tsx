'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder } from '@react-three/drei'
import { usePlane, useBox, useCylinder } from '@react-three/cannon'

export default function GameStage() {
  // 地面（平面）
  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
  }))

  // プラットフォーム1
  const [platform1Ref] = useBox(() => ({
    args: [4, 1, 4],
    position: [3, 0.5, 3],
    type: 'Static',
  }))

  // プラットフォーム2
  const [platform2Ref] = useBox(() => ({
    args: [3, 1, 3],
    position: [-3, 0.75, -3],
    type: 'Static',
  }))

  // 障害物
  const [obstacleRef] = useCylinder(() => ({
    args: [1, 1, 4, 16],
    position: [0, 2, 0],
    type: 'Static',
  }))

  return (
    <>
      {/* 地面 */}
      <mesh ref={groundRef as any} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>

      {/* プラットフォーム1 */}
      <Box
        ref={platform1Ref as any}
        args={[4, 1, 4]}
        position={[3, 0.5, 3]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#2196f3" />
      </Box>

      {/* プラットフォーム2 */}
      <Box
        ref={platform2Ref as any}
        args={[3, 1, 3]}
        position={[-3, 0.75, -3]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#f44336" />
      </Box>

      {/* 障害物 */}
      <Cylinder
        ref={obstacleRef as any}
        args={[1, 1, 4, 16]}
        position={[0, 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ffeb3b" />
      </Cylinder>
    </>
  )
}