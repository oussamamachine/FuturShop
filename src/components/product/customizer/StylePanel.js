import React from 'react';
import Button from '../../ui/Button';
import { JACKET_TYPES } from '../../../constants/jacket';

export default function StylePanel({ design, setDesign }) {
  return (
    <section id="customizer-panel-style" className="bg-gray-900/50 rounded-xl p-6 border border-gray-700" aria-labelledby="customizer-style-label">
      <h2 id="customizer-style-label" className="text-xl font-semibold mb-4">Jacket Style</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(JACKET_TYPES).map(([type, data]) => (
          <Button
            key={type}
            variant={design.style === type ? 'primary' : 'secondary'}
            className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
              design.style === type 
                ? 'bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/50' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setDesign({
              ...design, 
              style: type,
              material: Object.keys(data.materials)[0]
            })}
            aria-pressed={design.style === type}
            aria-label={data.label}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl">
              {type === 'bomber' ? '✈️' : '👾'}
            </div>
            <span className="font-medium">{data.label}</span>
            <span className="text-sm text-cyan-400">${data.basePrice}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}
