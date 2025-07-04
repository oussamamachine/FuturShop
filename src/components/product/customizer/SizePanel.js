import React from 'react';
import Button from '../../ui/Button';
import { SIZES, SIZE_PRICES } from '../../../constants/jacket';

export default function SizePanel({ design, setDesign }) {
  return (
    <section id="customizer-panel-size" className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 space-y-6" aria-labelledby="customizer-size-label">
      <div>
        <h2 id="customizer-size-label" className="text-xl font-semibold mb-3">Select Size</h2>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(size => (
            <Button
              key={size}
              variant={design.size === size ? 'primary' : 'secondary'}
              className={`w-12 h-12 flex items-center justify-center rounded-lg border font-medium ${
                design.size === size 
                  ? 'bg-cyan-500 text-white border-cyan-600' 
                  : 'bg-gray-800 border-gray-700 hover:border-cyan-400'
              }`}
              onClick={() => setDesign({...design, size})}
              aria-label={`Select size ${size}`}
              aria-pressed={design.size === size}
            >
              {size}
            </Button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-400">
          {SIZE_PRICES[design.size] > 0 ? (
            <span>+${SIZE_PRICES[design.size]} for {design.size} size</span>
          ) : (
            "Standard sizes (XS-M) included in base price"
          )}
        </div>
      </div>
      <div className="pt-4 border-t border-gray-700">
        <h2 className="text-xl font-semibold mb-3">Size Guide</h2>
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <div className="grid grid-cols-4 gap-2 mb-2 font-medium">
            <div>Size</div>
            <div>Chest</div>
            <div>Length</div>
            <div>Sleeve</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>XS</div><div>32-34"</div><div>24"</div><div>24.5"</div>
            <div>S</div><div>35-37"</div><div>25"</div><div>25"</div>
            <div>M</div><div>38-40"</div><div>26"</div><div>25.5"</div>
            <div>L</div><div>41-43"</div><div>27"</div><div>26"</div>
            <div>XL</div><div>44-46"</div><div>28"</div><div>26.5"</div>
          </div>
        </div>
      </div>
    </section>
  );
}
