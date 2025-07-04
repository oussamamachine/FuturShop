/**
 * LoadingSkeleton - Accessible skeleton loader for product grids.
 * @component
 */
import Skeleton from './Skeleton';

export default function LoadingSkeleton({ count = 3, className = '' }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
      aria-busy="true"
      aria-live="polite"
      data-testid="loading-skeleton"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-80 w-full" aria-hidden="true" />
      ))}
      <span className="sr-only">Loading content, please wait…</span>
    </div>
  );
}