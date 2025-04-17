import GameCanvas from '@/components/game/GameCanvas'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white p-4 text-center">
        <h1 className="text-3xl font-bold">ジャンプマスター</h1>
        <p className="text-sm mt-2">v-1グランプリ - Blender + Three.js ゲーム</p>
      </header>
      
      <main className="flex-grow">
        {/* GameCanvasは 'use client' を含むため、クライアントサイドでレンダリングされる */}
        <GameCanvas />
      </main>
      
      <footer className="bg-black text-white p-4 text-center text-sm">
        <p>操作方法: WASDまたは矢印キーで移動、Spaceでジャンプ</p>
        <p className="mt-1">© 2025 v-1グランプリ</p>
      </footer>
    </div>
  )
}
