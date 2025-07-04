import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
function HologramModel() {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });
  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshPhysicalMaterial
          color="#a855f7"
          metalness={0.7}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.8}
          thickness={0.7}
          ior={1.5}
          reflectivity={0.8}
          emissive="#9333ea"
          opacity={0.85}
          transparent
        />
      </mesh>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} color="#a855f7" intensity={2.2} />
    </group>
  );
}


function VoiceButton() {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice commands require Chrome or Safari!');
      setTimeout(() => setError(''), 2500);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => {
      setError('Voice recognition error.');
      setListening(false);
      setTimeout(() => setError(''), 2500);
    };
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      if (transcript.includes('explore') || transcript.includes('shop')) {
        window.location.href = '/shop';
      }
    };
    recognition.start();
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleVoice}
        className={`px-10 py-4 bg-purple-600/20 border-2 border-purple-400 text-white font-bold rounded-none hover:shadow-[0_0_15px_rgba(148,0,211,0.3)] hover:bg-purple-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${listening ? 'animate-pulse' : ''}`}
        aria-pressed={listening}
        aria-label={listening ? 'Listening for voice command' : 'Activate voice entry'}
      >
        {listening ? 'Listening... 👂' : 'VOICE ENTRY 🎤'}
      </button>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-red-700 text-white rounded shadow-lg text-sm z-20"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Hero - Accessible, animated, and professional hero section.
 * @component
 */
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
            opacity: 0.4,
          },
          move: { enable: true, speed: 2 },
        },
      });
    }
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden"
      aria-labelledby="hero-title"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-purple-900/60 to-black opacity-80" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-700/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-cyan-700/20 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-24">
        <div className="w-full flex flex-col items-center gap-8">
          <Canvas camera={{ position: [0, 0, 5] }} className="w-full max-w-xl h-80 md:h-96" aria-label="3D hologram animation">
            <HologramModel />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
          <h1
            id="hero-title"
            className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500 drop-shadow-[0_2px_40px_rgba(168,85,247,0.5)]"
            tabIndex={0}
            data-testid="hero-title"
          >
            <span className="inline-block animate-[futurFadeIn_1.2s_ease-out]">FUTUR</span>
            <span className="inline-block animate-[futurFadeIn_1.6s_ease-out] text-fuchsia-400">SHOP</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cyan-200 font-mono tracking-wide animate-[futurFadeIn_2s_ease-out]" data-testid="hero-subtitle">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Next-Gen Wearables, AR, AI, and More</span>
          </p>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center animate-[futurFadeIn_2.2s_ease-out]" role="group" aria-label="Hero actions">
            <button
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-cyan-400/30 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onClick={() => {
                const el = document.getElementById('products');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Scroll to products section"
              data-testid="hero-shop-btn"
            >
              Shop Now
            </button>
            <VoiceButton />
          </div>
        </div>
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-4 left-4 z-50 bg-cyan-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        tabIndex={0}
        data-testid="hero-skip-link"
      >
        Skip to Content
      </a>
      <style>{`
        @keyframes futurFadeIn {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}