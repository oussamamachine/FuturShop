import LoadingSkeleton from './LoadingSkeleton';
import ProductGrid from '../product/ProductGrid';

export default function ProductsPage({ products, loading }) {
  return (
    <div>
      {loading ? <LoadingSkeleton count={3} /> : <ProductGrid products={products} />}
    </div>
  )
}