import React from 'react';
import { JACKET_TYPES, SIZE_PRICES } from '../../../constants/jacket';
import { calculatePrice } from '../../../utils/jacket';

export default function OrderSummary({ design }) {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Jacket Style:</span>
          <span>{JACKET_TYPES[design.style].label} (${JACKET_TYPES[design.style].basePrice})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Material:</span>
          <span>
            {JACKET_TYPES[design.style].materials[design.material].label}
            {JACKET_TYPES[design.style].materials[design.material].price > 0 && (
              <span className="text-cyan-400"> (+${JACKET_TYPES[design.style].materials[design.material].price})</span>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Size:</span>
          <span>
            {design.size}
            {SIZE_PRICES[design.size] > 0 && (
              <span className="text-cyan-400"> (+${SIZE_PRICES[design.size]})</span>
            )}
          </span>
        </div>
        {design.backDesign ? (
          <div className="flex justify-between">
            <span className="text-gray-400">Custom Design:</span>
            <span className="text-cyan-400">+$30</span>
          </div>
        ) : design.backText ? (
          <div className="flex justify-between">
            <span className="text-gray-400">Custom Text:</span>
            <span className="text-cyan-400">+$10</span>
          </div>
        ) : null}
        <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between font-medium text-lg">
          <span>Total:</span>
          <span className="text-cyan-400">${calculatePrice(design)}</span>
        </div>
      </div>
    </div>
  );
}
