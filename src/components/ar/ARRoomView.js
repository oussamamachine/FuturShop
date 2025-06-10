import { useXR, ARCanvas, ARMarker } from '@react-three/xr'
import { Text } from '@react-three/drei'

export default function ARRoomView({ products }) {
  return (
    <div className="h-[600px] relative">
      <ARCanvas
        camera={{ position: [0, 0, 0] }}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight)
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        
        {products.map(product => (
          <ARMarker
            key={product.id}
            type="pattern"
            patternUrl={`/patterns/${product.id}.patt`}
          >
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="orange" />
              <Text
                position={[0, 0.6, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {product.name}
              </Text>
            </mesh>
          </ARMarker>
        ))}
      </ARCanvas>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        <p>Point your camera at a flat surface to place products</p>
      </div>
    </div>
  )
}