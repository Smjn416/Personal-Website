import { BackgroundScene } from '@/experience/BackgroundScene'

export default function HomePage() {
  return (
    <>
      <BackgroundScene />
      <main className="relative flex min-h-screen items-center justify-center">
        <p className="text-white/20 text-sm tracking-widest uppercase select-none">
          Move your cursor
        </p>
      </main>
    </>
  )
}
