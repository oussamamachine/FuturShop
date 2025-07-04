/**
 * ProductPage - Product details, 3D/AR, and related products.
 * @component
 */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  FiShoppingCart,
  FiBox,
  FiGrid,
  FiSliders,
  FiEye,
  FiArrowRight,
} from 'react-icons/fi';
import ProductHologram from '../components/product/ProductHologram';
import ProductCard from '../components/product/ProductCard';
import ProductGrid from '../components/product/ProductGrid';
import ThreeDConfigurator from '../components/product/3DConfigurator';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const mockProduct = {
      id,
      name: `FutureTech ${id}`,
      price: 199.99,
      description: 'Premium futuristic product with AR/3D capabilities',
      features: ['3D Customizable', 'AR View', 'Virtual Try-On', 'NFT Certificate'],
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
      configurations: {
        material: ['Carbon Fiber', 'Titanium', 'Ceramic'],
        finish: ['Matte', 'Glossy', 'Textured'],
      },
    };
    const mockRelated = [
      { id: 1, name: 'FutureTech X', price: 249.99, image: '/products/x.jpg' },
      { id: 2, name: 'FutureTech Lite', price: 149.99, image: '/products/lite.jpg' },
      { id: 3, name: 'FutureTech Pro', price: 299.99, image: '/products/pro.jpg' },
    ];
    setProduct(mockProduct);
    setRelatedProducts(mockRelated);
  }, [id]);

  if (!product) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <ProductHologram product={product} />
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <FiSliders /> 3D Configurator
            </h3>
            <ThreeDConfigurator options={product.configurations} basePrice={product.price} />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-primary-600 mb-6">${product.price}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                {i === 0 && <FiSliders className="text-primary-500" />}
                {i === 1 && <FiEye className="text-primary-500" />}
                {i === 2 && <FiBox className="text-primary-500" />}
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => addItemToCart(product)}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 mb-8"
          >
            <FiShoppingCart /> Add to Cart
          </button>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <TabButton
                active={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
                icon={<FiBox />}
                label="Details"
              />
              <TabButton
                active={activeTab === 'specs'}
                onClick={() => setActiveTab('specs')}
                icon={<FiSliders />}
                label="Specifications"
              />
            </nav>
          </div>
          <div className="py-4">
            {activeTab === 'details' && (
              <div>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="space-y-2">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FiArrowRight className="text-primary-500 mt-1 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 gap-4">
                <SpecItem label="Material" value="Advanced Polymer" />
                <SpecItem label="Weight" value="450g" />
                <SpecItem label="Dimensions" value="15 x 10 x 3cm" />
                <SpecItem label="Warranty" value="2 Years" />
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="mb-16">
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
          <FiGrid /> You May Also Like
        </h2>
        <ProductGrid>
          {relatedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addItemToCart(product)}
            />
          ))}
        </ProductGrid>
      </section>
    </div>
  );
}
function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="h-[500px] bg-gray-100 animate-pulse rounded-xl" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-100 animate-pulse rounded w-3/4" />
          <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
        </div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 font-medium text-sm border-b-2 flex items-center gap-2 ${
        active 
          ? 'border-primary-500 text-primary-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function SpecItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}