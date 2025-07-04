import { FiX } from 'react-icons/fi';

/**
 * CartItem - Accessible, interactive cart item row for CartDrawer.
 * @component
 */
export default function CartItem({ item, onRemove, onQuantityChange, tabIndex = 0, ...props }) {
  return (
    <div
      className="flex items-center gap-4 bg-gray-800 rounded-lg p-4 group"
      tabIndex={tabIndex}
      aria-label={`Cart item: ${item.name}`}
      data-testid={`cart-item-${item.id}`}
      {...props}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-md object-cover border border-gray-700"
        loading="lazy"
        draggable="false"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate" title={item.name}>{item.name}</div>
        <div className="text-sm text-gray-400">${item.price}</div>
        <div className="flex items-center gap-2 mt-2" role="group" aria-label={`Change quantity for ${item.name}`}> 
          <button
            className="px-2 py-1 bg-gray-700 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50"
            onClick={() => onQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
            data-testid={`decrease-qty-${item.id}`}
          >
            <span aria-hidden="true">-</span>
            <span className="sr-only">Decrease</span>
          </button>
          <span aria-live="polite" className="w-6 text-center select-none">{item.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-700 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            onClick={() => onQuantityChange(item.quantity + 1)}
            aria-label={`Increase quantity of ${item.name}`}
            data-testid={`increase-qty-${item.id}`}
          >
            <span aria-hidden="true">+</span>
            <span className="sr-only">Increase</span>
          </button>
        </div>
      </div>
      <button
        className="ml-2 p-2 rounded-full hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        onClick={onRemove}
        aria-label={`Remove ${item.name} from cart`}
        title={`Remove ${item.name}`}
        data-testid={`remove-item-${item.id}`}
      >
        <FiX aria-hidden="true" />
        <span className="sr-only">Remove</span>
      </button>
    </div>
  );
}