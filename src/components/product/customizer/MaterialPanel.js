import React from 'react';
import Button from '../../ui/Button';
import { JACKET_TYPES } from '../../../constants/jacket';

export default function MaterialPanel({ design, setDesign }) {
  return (
    <section id="customizer-panel-material" className="bg-gray-900/50 rounded-xl p-6 border border-gray-700" aria-labelledby="customizer-material-label">
      <h2 id="customizer-material-label" className="text-xl font-semibold mb-4">Material Selection</h2>
      <div className="space-y-4">
        {Object.entries(JACKET_TYPES[design.style].materials).map(([key, mat]) => (
          <Button
            key={key}
            variant={design.material === key ? 'primary' : 'secondary'}
            className={`w-full p-4 rounded-lg text-left flex justify-between items-center ${
              design.material === key 
                ? 'bg-cyan-500/20 border border-cyan-400' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setDesign({...design, material: key})}
            aria-pressed={design.material === key}
            aria-label={mat.label}
          >
            <div>
              <div className="font-medium">{mat.label}</div>
              <div className="text-sm text-gray-300">
                {mat.price > 0 ? `+$${mat.price}` : 'Included'}
              </div>
            </div>
            {design.material === key && (
              <div className="w-4 h-4 rounded-full bg-cyan-400" />
            )}
          </Button>
        ))}
      </div>
    </section>
  );
}
