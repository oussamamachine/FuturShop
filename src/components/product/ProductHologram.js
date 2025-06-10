import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'

export default function ProductHologram({ product }) {
  const launchAR = (modelUrl) => {
    alert(`Launching AR experience with model: ${modelUrl}`)
  }

  return (
    <div className="holographic-container h-96 w-full">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          <OrbitControls enableZoom={false} autoRotate />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <button 
        onClick={() => launchAR(product.arModel)}
        className="ar-button"
      >
        👆 Try in Your Space
      </button>
    </div>
  )
}