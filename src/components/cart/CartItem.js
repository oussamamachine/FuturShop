import { FiX } from 'react-icons/fi';

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-400">${item.price}</div>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-2 py-1 bg-gray-700 rounded"
            onClick={() => onQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >-</button>
          <span>{item.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-700 rounded"
            onClick={() => onQuantityChange(item.quantity + 1)}
          >+</button>
        </div>
      </div>
      <button
        className="ml-2 p-2 rounded-full hover:bg-gray-700"
        onClick={onRemove}
        title="Remove"
      >
        <FiX />
      </button>
    </div>
  );
}