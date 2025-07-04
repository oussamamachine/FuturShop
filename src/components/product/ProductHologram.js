import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Button from '../ui/Button';

/**
 * ProductHologram renders a 3D preview and AR launch button for a product.
 * @param {Object} props
 * @param {Object} props.product - Product object with arModel property.
 */

/**
 * ProductHologram renders a 3D preview and AR launch button for a product.
 * @component
 * @param {Object} props
 * @param {Object} props.product - Product object with arModel property.
 */
export default function ProductHologram({ product }) {
  const launchAR = (modelUrl) => {
    alert(`Launching AR experience with model: ${modelUrl}`);
  };

  return (
    <div
      className="holographic-container h-96 w-full"
      tabIndex={0}
      aria-label="3D product hologram preview"
      data-testid="product-hologram"
    >
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
      <Button
        onClick={() => launchAR(product.arModel)}
        className="ar-button mt-4 px-4 py-2 bg-primary-600 text-white rounded-full shadow hover:bg-primary-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        aria-label={`Try ${product?.name || 'this product'} in your space with AR`}
        type="button"
        data-testid="ar-launch-btn"
      >
        <span role="img" aria-label="Pointing Up">👆</span>
        <span className="ml-2">Try in Your Space</span>
      </Button>
    </div>
  );
}

ProductHologram.propTypes = {
  product: PropTypes.shape({
    arModel: PropTypes.string,
  }).isRequired,
};