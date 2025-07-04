
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import Button from '../ui/Button';

/**
 * ProductCard displays a product image, name, and price, with a try-on button if customizable.
 * @param {Object} props
 * @param {Object} props.product - Product object with image, name, price, customizable.
 * @param {Function} props.onTryOn - Callback for try-on action.
 */

/**
 * ProductCard displays a product image, name, and price, with a try-on button if customizable.
 * @component
 * @param {Object} props
 * @param {Object} props.product - Product object with image, name, price, customizable.
 * @param {Function} props.onTryOn - Callback for try-on action.
 */
export default function ProductCard({ product, onTryOn }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      tabIndex={0}
      aria-label={`Product card: ${product.name}`}
      data-testid="product-card"
    >
      <div className="aspect-square bg-gray-100 relative group">
        <img
          src={product.image}
          alt={product.name ? `Product: ${product.name}` : 'Product image'}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable="false"
          data-testid="product-image"
        />
        {product.customizable && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" aria-hidden="false">
            <Button
              onClick={() => onTryOn(product)}
              className="bg-white/90 backdrop-blur p-3 rounded-full hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Try on ${product.name}`}
              type="button"
              data-testid="tryon-btn"
            >
              <FiShoppingCart className="text-lg" aria-hidden="true" />
              <span className="sr-only">Try on {product.name}</span>
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold" data-testid="product-name">{product.name}</h3>
        <p className="text-primary-600 font-bold" data-testid="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    customizable: PropTypes.bool,
  }).isRequired,
  onTryOn: PropTypes.func,
};

ProductCard.defaultProps = {
  onTryOn: () => {},
};