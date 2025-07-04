/**
 * Skeleton - Accessible, animated loading placeholder.
 * @component
 */
export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-700/40 rounded ${className}`}
      aria-hidden="true"
      data-testid="skeleton-loader"
      {...props}
    />
  );
}
