import { FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product, onTryOn }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 relative group">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.customizable && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => onTryOn(product)}
              className="bg-white/90 backdrop-blur p-3 rounded-full hover:scale-110 transition-transform"
            >
              <FiShoppingCart className="text-lg" />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-primary-600 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}