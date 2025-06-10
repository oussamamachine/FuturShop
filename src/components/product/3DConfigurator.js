
import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

export default function ThreeDConfigurator({ product, basePrice = 0 }) {
  const defaultConfig = {
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    materials: ['Basic', 'Premium', 'Deluxe'],
    sizes: ['S', 'M', 'L']
  }
  const config = product?.configurations || defaultConfig
  const colors = config.colors || defaultConfig.colors
  const materials = config.materials || defaultConfig.materials
  const sizes = config.sizes || defaultConfig.sizes

  const [selections, setSelections] = useState({
    color: colors[0],
    material: materials[0],
    size: sizes[0]
  })

  const calculatePrice = () => {
    let price = basePrice
    if (selections.material === 'Premium') price += 20
    if (selections.material === 'Deluxe') price += 40
    return price.toFixed(2)
  }

  if (!product) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg animate-pulse h-64">
        Loading configuration...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelections({...selections, color})}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selections.color === color 
                  ? 'border-primary-500 scale-110' 
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Material</h3>
        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <button
              key={material}
              onClick={() => setSelections({...selections, material})}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selections.material === material
                  ? 'bg-primary-100 border-primary-500 text-primary-900'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelections({...selections, size})}
              className={`w-12 h-12 flex items-center justify-center rounded-lg border font-medium ${
                selections.size === size
                  ? 'bg-primary-500 text-white border-primary-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t mt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="text-xl font-bold">${calculatePrice()}</span>
        </div>
        <button className="w-full mt-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <FiCheck /> Add to Cart
        </button>
      </div>
    </div>
  )
}