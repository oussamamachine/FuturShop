import { useState, useRef , useCallback , useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Environment, useTexture, useGLTF } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { FiX, FiDownload, FiShare2, FiCheck, FiRotateCw, FiUpload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import React from 'react';
import ProductGrid from './ProductGrid';
import { TextureLoader } from 'three';
const JACKET_TYPES = {
  bomber: {
    label: "Classic Bomber",
    basePrice: 199,
    image: '/images/bomber-preview.jpg',
    parts: [
      { type: 'box', args: [1, 1.3, 0.2], pos: [0, 0, 0], roughness: 0.7 },
      { type: 'cylinder', args: [0.15, 0.15, 1, 16], pos: [0.6, 0, 0], roughness: 0.7 },
      { type: 'cylinder', args: [0.15, 0.15, 1, 16], pos: [-0.6, 0, 0], roughness: 0.7 },
      { type: 'box', args: [1.2, 0.3, 0.25], pos: [0, -0.65, 0], roughness: 0.9 }
    ],
    materials: {
      leather: { label: "Premium Leather", price: 50, roughness: 0.7, metalness: 0.3 },
      poly: { label: "Polyester Blend", price: 0, roughness: 0.9, metalness: 0 },
      nylon: { label: "Military Nylon", price: 30, roughness: 0.6, metalness: 0.1 }
    },
    textures: {
      leather: '/textures/leather.jpg',
      carbon: '/textures/carbon-fiber.jpg'
    }
  },
  cyber: {
    label: "Cyberpunk Jacket",
    basePrice: 299,
    image: '/images/jackets/cyber-preview.jpg',
    parts: [
      { type: 'box', args: [1, 1.5, 0.15], pos: [0, 0, 0], roughness: 0.4 },
      { type: 'box', args: [0.12, 0.8, 0.15], pos: [0.5, 0.2, 0], roughness: 0.4 },
      { type: 'box', args: [0.12, 0.8, 0.15], pos: [-0.5, 0.2, 0], roughness: 0.4 },
      { type: 'box', args: [0.3, 0.3, 0.2], pos: [0, -0.3, 0.1], roughness: 0.2 }
    ],
    materials: {
      synth: { label: "Synthetic Fiber", price: 0, roughness: 0.4, metalness: 0.2 },
      carbon: { label: "Carbon Fiber", price: 80, roughness: 0.3, metalness: 0.8 },
      latex: { label: "Reactive Latex", price: 60, roughness: 0.5, metalness: 0.1 }
    },
    textures: {
      neon: '/textures/neon-grid.jpg',
      circuit: '/textures/circuit-board.jpg'
    }
  }
};

const SIZE_PRICES = {
  XS: 0,
  S: 0,
  M: 0,
  L: 10,
  XL: 20
};

const BackDesign = ({ design }) => {
  const texture = useTexture(design.backDesign || '/textures/blank.jpg');
  return (
    <mesh position={[0, 0, -0.15]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshStandardMaterial map={design.backDesign ? texture : null} />
    </mesh>
  );
};

const JacketPart = ({ part, color, material, style, texture }) => {
  const tex = useTexture(texture ? `/textures/${texture}.jpg` : '/textures/blank.jpg');
  return (
    <mesh position={part.pos} castShadow>
      {part.type === 'box' && <boxGeometry args={part.args} />}
      {part.type === 'cylinder' && <cylinderGeometry args={part.args} />}
      <meshStandardMaterial 
        color={color}
        roughness={material?.roughness || part.roughness}
        metalness={material?.metalness || part.metalness}
        map={texture ? tex : null}
        emissive={style === 'cyber' ? color : '#000000'}
        emissiveIntensity={style === 'cyber' ? 0.5 : 0}
      />
    </mesh>
  );
};

function JacketModel({ design }) {
  const { scene } = useGLTF('/models/jacket.glb');

  React.useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) console.log(child.name);
    });
  }, [scene]);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(design.color);
        const mat = JACKET_TYPES[design.style]?.materials?.[design.material];
        if (mat) {
          child.material.roughness = mat.roughness;
          child.material.metalness = mat.metalness;
        }
        if (child.name === 'Back') {
          if (design.backDesign) {
            new TextureLoader().load(design.backDesign, (texture) => {
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          } else {
            child.material.map = null;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [scene, design.color, design.material, design.style, design.backDesign]);

  return (
    <group>
      <primitive object={scene} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </group>
  );
}

export default function JacketCustomizer({ onExit }) {
  const { addItemToCart, setIsCartOpen } = useCart();
  const [design, setDesign] = useState({
    style: 'bomber',
    color: '#3B82F6',
    size: 'M',
    material: 'leather',
    texture: null,
    backText: '',
    backDesign: null,
    textColor: '#000000',
    serial: Math.random().toString(36).substring(2, 8).toUpperCase()
  });

  const [activeTab, setActiveTab] = useState('style');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const [status, setStatus] = useState(null); 
  const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

  const calculatePrice = () => {
    const basePrice = JACKET_TYPES[design.style].basePrice;
    const materialPrice = JACKET_TYPES[design.style].materials[design.material].price;
    const sizePrice = SIZE_PRICES[design.size];
    const designPrice = design.backDesign ? 30 : (design.backText ? 10 : 0);
    return basePrice + materialPrice + sizePrice + designPrice;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setDesign({
          ...design,
          backDesign: event.target.result,
          backText: ''
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setDesign({ ...design, backDesign: null });
    fileInputRef.current.value = '';
  };

  const saveDesign = () => {
    setStatus('saved');
    setTimeout(() => setStatus(null), 2000);
  };

  const memoizedCustomization = useMemo(() => ({ ...design }), [design]);

const addToCart = useCallback(() => {
  try {
    const cartItem = {
      id: `${design.style}-${performance.now()}`,
      name: JACKET_TYPES[design.style].label,
      price: calculatePrice(),
      image: JACKET_TYPES[design.style].image,
      customization: design, 
      quantity: 1
    };

    addItemToCart(cartItem);
    setIsCartOpen(true);

    setStatus('added');
    setTimeout(() => setStatus(null), 2000);
  } catch (error) {
    setStatus('error');
    setTimeout(() => setStatus(null), 2000);
  }
}, [design, addItemToCart, setIsCartOpen, calculatePrice]);


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 text-white z-50 overflow-y-auto backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          >
            JACKET CUSTOMIZER
          </motion.h1>
          <button 
            onClick={onExit}
            className="p-3 rounded-full hover:bg-white/10 transition-colors group"
          >
            <FiX className="text-xl group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="flex border-b border-gray-700">
              {['style', 'material', 'color', 'design', 'size'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-medium capitalize ${
                    activeTab === tab 
                      ? 'border-b-2 border-cyan-400 text-cyan-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'style' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
                >
                  <h2 className="text-xl font-semibold mb-4">Jacket Style</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(JACKET_TYPES).map(([type, data]) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
                          design.style === type 
                            ? 'bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/50' 
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                        onClick={() => setDesign({
                          ...design, 
                          style: type,
                          material: Object.keys(data.materials)[0]
                        })}
                      >
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                          {type === 'bomber' ? '✈️' : '👾'}
                        </div>
                        <span className="font-medium">{data.label}</span>
                        <span className="text-sm text-cyan-400">${data.basePrice}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'material' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
                >
                  <h2 className="text-xl font-semibold mb-4">Material Selection</h2>
                  <div className="space-y-4">
                    {Object.entries(JACKET_TYPES[design.style].materials).map(([key, mat]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full p-4 rounded-lg text-left flex justify-between items-center ${
                          design.material === key 
                            ? 'bg-cyan-500/20 border border-cyan-400' 
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                        onClick={() => setDesign({...design, material: key})}
                      >
                        <div>
                          <div className="font-medium">{mat.label}</div>
                          <div className="text-sm text-gray-300">
                            {mat.price > 0 ? `+$${mat.price}` : 'Included'}
                          </div>
                        </div>
                        {design.material === key && (
                          <div className="w-4 h-4 rounded-full bg-cyan-400" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'color' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
                >
                  <h2 className="text-xl font-semibold mb-4">Color Selection</h2>
                  <HexColorPicker 
                    color={design.color} 
                    onChange={color => setDesign({...design, color})} 
                    className="w-full mb-4"
                  />
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {['#3B82F6', '#EF4444', '#10B981', '#000000', '#FFFFFF'].map(c => (
                      <motion.button
                        key={c}
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white"
                        style={{ backgroundColor: c }}
                        onClick={() => setDesign({...design, color: c})}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'design' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Back Design</h2>
                    <div className="flex flex-col gap-4">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Custom design" 
                              className="max-h-40 rounded-md"
                            />
                            <button
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black"
                            >
                              <FiX />
                            </button>
                          </div>
                        ) : (
                          <>
                            <FiUpload className="text-2xl text-gray-400" />
                            <p className="text-gray-400 text-center">Upload your custom design</p>
                            <p className="text-xs text-gray-500">PNG or JPG, max 5MB</p>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => fileInputRef.current.click()}
                              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
                            >
                              Select Image
                            </motion.button>
                          </>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {design.backDesign ? (
                          <span className="text-cyan-400">+$30 for custom design</span>
                        ) : (
                          "Or add text below (+$10)"
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Back Text</h2>
                    <input
                      type="text"
                      placeholder="Enter your custom text"
                      value={design.backText}
                      onChange={(e) => setDesign({
                        ...design, 
                        backText: e.target.value,
                        backDesign: e.target.value ? null : design.backDesign
                      })}
                      disabled={!!design.backDesign}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none disabled:opacity-50"
                      maxLength={20}
                    />
                    {!design.backDesign && (
                      <>
                        <h3 className="text-lg font-medium mt-4 mb-2">Text Color</h3>
                        <HexColorPicker 
                          color={design.textColor} 
                          onChange={color => setDesign({...design, textColor: color})} 
                          className="w-full mb-4"
                        />
                        <div className="grid grid-cols-5 gap-2">
                          {['#000000', '#FFFFFF', '#00F0FF', '#FF00FF', '#00FF00'].map(c => (
                            <motion.button
                              key={c}
                              whileHover={{ scale: 1.1 }}
                              className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white"
                              style={{ backgroundColor: c }}
                              onClick={() => setDesign({...design, textColor: c})}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {design.style === 'cyber' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Serial Number</h2>
                      <input
                        type="text"
                        value={design.serial}
                        onChange={(e) => setDesign({...design, serial: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
                        maxLength={8}
                      />
                      <button 
                        onClick={() => setDesign({...design, serial: Math.random().toString(36).substring(2, 8).toUpperCase()})}
                        className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <FiRotateCw size={14} /> Generate New
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'size' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Select Size</h2>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map(size => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          className={`w-12 h-12 flex items-center justify-center rounded-lg border font-medium ${
                            design.size === size 
                              ? 'bg-cyan-500 text-white border-cyan-600' 
                              : 'bg-gray-800 border-gray-700 hover:border-cyan-400'
                          }`}
                          onClick={() => setDesign({...design, size})}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      {SIZE_PRICES[design.size] > 0 ? (
                        <span>+${SIZE_PRICES[design.size]} for {design.size} size</span>
                      ) : (
                        "Standard sizes (XS-M) included in base price"
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h2 className="text-xl font-semibold mb-3">Size Guide</h2>
                    <div className="bg-gray-800 rounded-lg p-4 text-sm">
                      <div className="grid grid-cols-4 gap-2 mb-2 font-medium">
                        <div>Size</div>
                        <div>Chest</div>
                        <div>Length</div>
                        <div>Sleeve</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div>XS</div><div>32-34"</div><div>24"</div><div>24.5"</div>
                        <div>S</div><div>35-37"</div><div>25"</div><div>25"</div>
                        <div>M</div><div>38-40"</div><div>26"</div><div>25.5"</div>
                        <div>L</div><div>41-43"</div><div>27"</div><div>26"</div>
                        <div>XL</div><div>44-46"</div><div>28"</div><div>26.5"</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="h-[60vh] bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 relative">
              <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 45 }}>
                <Environment preset="city" />
                <JacketModel design={design} />
              </Canvas>
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                Drag to rotate • Scroll to zoom
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Jacket Style:</span>
                  <span>{JACKET_TYPES[design.style].label} (${JACKET_TYPES[design.style].basePrice})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Material:</span>
                  <span>
                    {JACKET_TYPES[design.style].materials[design.material].label}
                    {JACKET_TYPES[design.style].materials[design.material].price > 0 && (
                      <span className="text-cyan-400"> (+${JACKET_TYPES[design.style].materials[design.material].price})</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span>
                    {design.size}
                    {SIZE_PRICES[design.size] > 0 && (
                      <span className="text-cyan-400"> (+${SIZE_PRICES[design.size]})</span>
                    )}
                  </span>
                </div>
                {design.backDesign ? (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Custom Design:</span>
                    <span className="text-cyan-400">+$30</span>
                  </div>
                ) : design.backText ? (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Custom Text:</span>
                    <span className="text-cyan-400">+$10</span>
                  </div>
                ) : null}
                <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span className="text-cyan-400">${calculatePrice()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveDesign}
            className={`flex items-center gap-2 px-6 py-3 ${
              status === 'saved' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
            } rounded-full font-medium`}
          >
            <FiDownload /> {status === 'saved' ? 'Design Saved!' : 'Save Design'}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium"
          >
            <FiShare2 /> Share
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className={`flex items-center gap-2 px-6 py-3 ${
              status === 'added' ? 'bg-green-600' : 
              status === 'error' ? 'bg-red-600' : 
              'bg-purple-600 hover:bg-purple-700'
            } rounded-full font-medium`}
          >
            <FiCheck /> 
            {status === 'added' ? 'Added to Cart!' : 
             status === 'error' ? 'Error Adding Item' : 
             `Add to Cart ($${calculatePrice()})`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}