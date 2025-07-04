
import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

/**
 * ThreeDConfigurator - Accessible, interactive 3D product configuration UI.
 * @component
 * @param {object} props
 * @param {object} props.product - Product data
 * @param {number} [props.basePrice=0] - Base price
 */
export default function ThreeDConfigurator({ product, basePrice = 0 }) {
  const defaultConfig = {
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    materials: ['Basic', 'Premium', 'Deluxe'],
    sizes: ['S', 'M', 'L'],
  };
  const config = product?.configurations || defaultConfig;
  const colors = config.colors || defaultConfig.colors;
  const materials = config.materials || defaultConfig.materials;
  const sizes = config.sizes || defaultConfig.sizes;

  const [selections, setSelections] = useState({
    color: colors[0],
    material: materials[0],
    size: sizes[0],
  });

  const calculatePrice = () => {
    let price = basePrice;
    if (selections.material === 'Premium') price += 20;
    if (selections.material === 'Deluxe') price += 40;
    return price.toFixed(2);
  };

  if (!product) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg animate-pulse h-64" aria-busy="true" aria-live="polite">
        Loading configuration...
      </div>
    );
  }

  return (
    <form className="space-y-6" aria-label="3D Product Configurator" data-testid="3d-configurator-form" tabIndex={0}>
      {/* Color selection */}
      <fieldset>
        <legend className="font-medium mb-2">Color</legend>
        <div className="flex gap-2" role="radiogroup" aria-label="Select color">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelections({ ...selections, color })}
              className={`w-8 h-8 rounded-full border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                selections.color === color
                  ? 'border-primary-500 scale-110'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
              aria-checked={selections.color === color}
              role="radio"
              tabIndex={selections.color === color ? 0 : -1}
              data-testid={`color-btn-${color.replace('#', '')}`}
            />
          ))}
        </div>
      </fieldset>
      {/* Material selection */}
      <fieldset>
        <legend className="font-medium mb-2">Material</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select material">
          {materials.map((material) => (
            <button
              key={material}
              type="button"
              onClick={() => setSelections({ ...selections, material })}
              className={`px-4 py-2 rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                selections.material === material
                  ? 'bg-primary-100 border-primary-500 text-primary-900'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`Select material ${material}`}
              aria-checked={selections.material === material}
              role="radio"
              tabIndex={selections.material === material ? 0 : -1}
              data-testid={`material-btn-${material.toLowerCase()}`}
            >
              {material}
            </button>
          ))}
        </div>
      </fieldset>
      {/* Size selection */}
      <fieldset>
        <legend className="font-medium mb-2">Size</legend>
        <div className="flex gap-2" role="radiogroup" aria-label="Select size">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelections({ ...selections, size })}
              className={`w-12 h-12 flex items-center justify-center rounded-lg border font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                selections.size === size
                  ? 'bg-primary-500 text-white border-primary-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`Select size ${size}`}
              aria-checked={selections.size === size}
              role="radio"
              tabIndex={selections.size === size ? 0 : -1}
              data-testid={`size-btn-${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>
      {/* Price and Add to Cart */}
      <div className="pt-4 border-t mt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="text-xl font-bold" data-testid="configurator-total">${calculatePrice()}</span>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Add to cart"
          data-testid="add-to-cart-btn"
        >
          <FiCheck aria-hidden="true" /> Add to Cart
        </button>
      </div>
    </form>
  );
}