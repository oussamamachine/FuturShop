import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
function HologramModel() {
  const meshRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 3);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00f0ff,
      emissive: 0x00a0ff,
      shininess: 100,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    meshRef.current = new THREE.Mesh(geometry, material);
    groupRef.current.add(meshRef.current);
  }, []);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00f0ff" intensity={1.5} />
    </group>
  );
}
function VoiceButton() {
  const [listening, setListening] = useState(false);

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice commands require Chrome or Safari!");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      if (transcript.includes('explore') || transcript.includes('shop')) {
        window.location.href = '/shop';
      }
    };
    recognition.start();
  };

  return (
    <button
      onClick={handleVoice}
      className="px-10 py-4 bg-purple-600/20 border-2 border-purple-400 text-white font-bold rounded-none hover:shadow-[0_0_15px_rgba(148,0,211,0.3)] hover:bg-purple-600/30 transition-all"
    >
      {listening ? 'Listening... 👂' : 'VOICE ENTRY 🎤'}
    </button>
  );
}
export default function Hero() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: "#00f0ff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { 
            enable: true, 
            distance: 150, 
            color: "#00f0ff", 
            opacity: 0.4 
          },
          move: { enable: true, speed: 2 }
        }
      });
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div id="particles-js" className="absolute inset-0 opacity-70" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <HologramModel />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          FUTURSHOP
        </h1>
        <p className="text-2xl md:text-3xl mb-10 text-cyan-300 
                     shadow-[0_0_10px_#00f0ff,0_0_20px_#00f0ff] 
                     border-r-2 border-cyan-300 
                     animate-[typing_3s_steps(22)_infinite,blink_1s_step-end_infinite] 
                     overflow-hidden whitespace-nowrap inline-block w-0 max-w-full">
          PRODUCTS FROM THE FUTURE_
        </p>
        <div className="flex gap-6">
          <button className="px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-none hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
            SHOP NOW
          </button>
          <VoiceButton />
        </div>
      </div>
      {typeof document !== 'undefined' && (
        <style>
          {`
            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }
            @keyframes blink {
              50% { border-color: transparent }
            }
          `}
        </style>
      )}
    </section>
  );
}