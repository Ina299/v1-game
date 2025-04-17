import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Blenderモデルを読み込むためのローダーを作成
 */
export function createBlenderLoader(): GLTFLoader {
  // DRACOローダーの設定
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/') // DRACOデコーダーのパス

  // GLTFローダーの設定
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  return gltfLoader
}

/**
 * Blenderモデルを読み込む
 * @param url モデルのURL
 * @returns Promise<THREE.Group> モデルのグループ
 */
export function loadBlenderModel(url: string): Promise<THREE.Group> {
  const loader = createBlenderLoader()
  
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf: GLTF) => {
        const model = gltf.scene
        
        // モデルの全メッシュにシャドウを設定
        model.traverse((node: THREE.Object3D) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true
            node.receiveShadow = true
          }
        })
        
        resolve(model)
      },
      (progress: { loaded: number; total: number }) => {
        console.log(`Loading model: ${(progress.loaded / progress.total) * 100}%`)
      },
      (error: unknown) => {
        console.error('Error loading model:', error)
        reject(error)
      }
    )
  })
}

/**
 * Blenderモデルをエクスポートするための関数
 * この関数はクライアントサイドでは使用できません
 * Blenderのコマンドラインツールを使用してモデルをエクスポートします
 */
export function exportBlenderModel(): void {
  // この関数はサーバーサイドでのみ使用可能
  console.warn('exportBlenderModel is only available on server side')
  
  // サーバーサイドでの実装例:
  // const { execSync } = require('child_process')
  // execSync('blender -b model.blend --python export_script.py')
}