import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

/**
 * ProductGrid displays a grid of ProductCard components or loading skeletons.
 * @param {Object} props
 * @param {Array} props.products - Array of product objects.
 * @param {boolean} props.loading - Whether products are loading.
 * @param {function} [props.onTryOn] - Handler for try-on action.
 * @param {function} [props.onViewAR] - Handler for AR view action.
 */

/**
 * ProductGrid displays a grid of ProductCard components or loading skeletons.
 * @component
 * @param {Object} props
 * @param {Array} props.products - Array of product objects.
 * @param {boolean} props.loading - Whether products are loading.
 * @param {function} [props.onTryOn] - Handler for try-on action.
 * @param {function} [props.onViewAR] - Handler for AR view action.
 */
export default function ProductGrid({ products = [], loading, onTryOn, onViewAR }) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        role="status"
        aria-busy="true"
        data-testid="product-grid-loading"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" data-testid="product-skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
      aria-label="Product grid"
      data-testid="product-grid"
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onTryOn={onTryOn}
          onViewAR={onViewAR}
        />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onTryOn: PropTypes.func,
  onViewAR: PropTypes.func,
};

ProductGrid.defaultProps = {
  products: [],
  loading: false,
  onTryOn: () => {},
  onViewAR: () => {},
};