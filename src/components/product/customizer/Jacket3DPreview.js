import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export default function Jacket3DPreview({ design, JacketModel }) {
  return (
    <div className="h-[60vh] bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 relative">
      <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <Environment preset="city" />
        <JacketModel design={design} />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
