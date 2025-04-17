'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'

export default function Player() {
  const { camera } = useThree()
  const [subscribed, setSubscribed] = useState(false)
  const [jumping, setJumping] = useState(false)
  const [moveDirection, setMoveDirection] = useState({ forward: 0, right: 0 })
  
  // 物理演算を適用した球体
  const [playerRef, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    args: [0.5],
    type: 'Dynamic',
    material: {
      friction: 0,
      restitution: 0.2,
    },
  }))

  // 速度と位置の状態
  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 1, 0])

  // 速度と位置の購読
  useEffect(() => {
    if (!subscribed) {
      api.velocity.subscribe((v) => (velocity.current = v))
      api.position.subscribe((p) => (position.current = p))
      setSubscribed(true)
    }
  }, [api, subscribed])

  // キーボード入力の処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveDirection((prev) => ({ ...prev, forward: 1 }))
          break
        case 'KeyS':
        case 'ArrowDown':
          setMoveDirection((prev) => ({ ...prev, forward: -1 }))
          break
        case 'KeyA':
        case 'ArrowLeft':
          setMoveDirection((prev) => ({ ...prev, right: -1 }))
          break
        case 'KeyD':
        case 'ArrowRight':
          setMoveDirection((prev) => ({ ...prev, right: 1 }))
          break
        case 'Space':
          if (Math.abs(velocity.current[1]) < 0.1) {
            setJumping(true)
          }
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
        case 'KeyS':
        case 'ArrowDown':
          setMoveDirection((prev) => ({ ...prev, forward: 0 }))
          break
        case 'KeyA':
        case 'ArrowLeft':
        case 'KeyD':
        case 'ArrowRight':
          setMoveDirection((prev) => ({ ...prev, right: 0 }))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // フレームごとの更新
  useFrame(() => {
    // カメラの向きを取得
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.y = 0
    cameraDirection.normalize()

    // カメラの右方向を計算
    const cameraRight = new THREE.Vector3()
    cameraRight.crossVectors(camera.up, cameraDirection).normalize()

    // 移動方向を計算
    const moveVector = new THREE.Vector3()
    moveVector.addScaledVector(cameraDirection, moveDirection.forward)
    moveVector.addScaledVector(cameraRight, moveDirection.right)
    moveVector.normalize().multiplyScalar(5) // 移動速度

    // 現在の速度を取得
    const currentVelocity = [...velocity.current]

    // 水平方向の速度を設定
    if (moveVector.length() > 0) {
      currentVelocity[0] = moveVector.x
      currentVelocity[2] = moveVector.z
    } else {
      // 摩擦を模倣
      currentVelocity[0] *= 0.9
      currentVelocity[2] *= 0.9
    }

    // ジャンプ
    if (jumping) {
      currentVelocity[1] = 8 // ジャンプ力
      setJumping(false)
    }

    // 速度を適用
    api.velocity.set(currentVelocity[0], currentVelocity[1], currentVelocity[2])

    // カメラをプレイヤーに追従
    camera.position.x = position.current[0]
    camera.position.y = position.current[1] + 5
    camera.position.z = position.current[2] + 10
    camera.lookAt(
      position.current[0],
      position.current[1],
      position.current[2]
    )
  })

  return (
    <Sphere
      ref={playerRef as any}
      args={[0.5, 16, 16]}
      position={[0, 1, 0]}
      castShadow
    >
      <meshStandardMaterial color="#ff00ff" />
    </Sphere>
  )
}