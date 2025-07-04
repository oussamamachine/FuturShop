

import { useRef, useEffect } from 'react';
import { useXR, ARCanvas, ARMarker } from '@react-three/xr';
import { Text } from '@react-three/drei';

export default function ARRoomView({ products }) {
  const canvasRef = useRef(null);

  // Responsive AR canvas sizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.gl) {
        canvasRef.current.gl.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="h-[600px] relative" aria-label="AR Room View">
      <ARCanvas
        ref={canvasRef}
        camera={{ position: [0, 0, 0] }}
        onCreated={({ gl }) => {
          canvasRef.current.gl = gl;
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
        style={{ outline: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {products && products.length > 0 ? (
          products.map(product => (
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
                  fontSize={0.2}
                  outlineColor="white"
                  outlineWidth={0.01}
                >
                  {product.name}
                </Text>
              </mesh>
            </ARMarker>
          ))
        ) : (
          <Text position={[0, 1, 0]} color="red" fontSize={0.3} anchorX="center" anchorY="middle">
            No products available
          </Text>
        )}
      </ARCanvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-white pointer-events-none" aria-live="polite">
        <p>Point your camera at a flat surface to place products</p>
      </div>
    </section>
  );
}

