import React from 'react';
import Button from '../../ui/Button';
import { HexColorPicker } from 'react-colorful';

export default function ColorPanel({ design, setDesign }) {
  return (
    <section id="customizer-panel-color" className="bg-gray-900/50 rounded-xl p-6 border border-gray-700" aria-labelledby="customizer-color-label">
      <h2 id="customizer-color-label" className="text-xl font-semibold mb-4">Color Selection</h2>
      <HexColorPicker 
        color={design.color} 
        onChange={color => setDesign({...design, color})} 
        className="w-full mb-4"
        aria-label="Jacket color picker"
      />
      <div className="grid grid-cols-5 gap-2 mb-6">
        {['#3B82F6', '#EF4444', '#10B981', '#000000', '#FFFFFF'].map(c => (
          <Button
            key={c}
            variant={design.color === c ? 'primary' : 'secondary'}
            className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white"
            style={{ backgroundColor: c }}
            onClick={() => setDesign({...design, color: c})}
            aria-label={`Select color ${c}`}
            aria-pressed={design.color === c}
          />
        ))}
      </div>
    </section>
  );
}
