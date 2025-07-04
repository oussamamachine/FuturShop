import React from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { HexColorPicker } from 'react-colorful';
import { FiX, FiUpload, FiRotateCw } from 'react-icons/fi';

export default function DesignPanel({ design, setDesign, imagePreview, setImagePreview, fileInputRef, handleImageUpload, removeImage }) {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Back Design</h2>
        <div className="flex flex-col gap-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Custom design" 
                  className="max-h-40 rounded-md"
                />
                <Button
                  onClick={removeImage}
                  variant="secondary"
                  aria-label="Remove image"
                  className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black"
                >
                  <FiX />
                </Button>
              </div>
            ) : (
              <>
                <FiUpload className="text-2xl text-gray-400" />
                <p className="text-gray-400 text-center">Upload your custom design</p>
                <p className="text-xs text-gray-500">PNG or JPG, max 5MB</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current.click()}
                  variant="primary"
                  className="px-4 py-2 text-sm"
                >
                  Select Image
                </Button>
              </>
            )}
          </div>
          <div className="text-xs text-gray-400">
            {design.backDesign ? (
              <span className="text-cyan-400">+$30 for custom design</span>
            ) : (
              "Or add text below (+$10)"
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Back Text</h2>
        <Input
          type="text"
          placeholder="Enter your custom text"
          value={design.backText}
          onChange={e => setDesign({
            ...design, 
            backText: e.target.value,
            backDesign: e.target.value ? null : design.backDesign
          })}
          disabled={!!design.backDesign}
          maxLength={20}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none disabled:opacity-50"
          aria-label="Custom back text"
        />
        {!design.backDesign && (
          <>
            <h3 className="text-lg font-medium mt-4 mb-2">Text Color</h3>
            <HexColorPicker 
              color={design.textColor} 
              onChange={color => setDesign({...design, textColor: color})} 
              className="w-full mb-4"
            />
            <div className="grid grid-cols-5 gap-2">
              {['#000000', '#FFFFFF', '#00F0FF', '#FF00FF', '#00FF00'].map(c => (
                <Button
                  key={c}
                  variant={design.textColor === c ? 'primary' : 'secondary'}
                  className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white"
                  style={{ backgroundColor: c }}
                  onClick={() => setDesign({...design, textColor: c})}
                  aria-label={`Select text color ${c}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {design.style === 'cyber' && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Serial Number</h2>
          <Input
            type="text"
            value={design.serial}
            onChange={e => setDesign({...design, serial: e.target.value})}
            maxLength={8}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            aria-label="Serial number"
          />
          <Button
            onClick={() => setDesign({...design, serial: Math.random().toString(36).substring(2, 8).toUpperCase()})}
            variant="link"
            className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            aria-label="Generate new serial number"
          >
            <FiRotateCw size={14} /> Generate New
          </Button>
        </div>
      )}
    </div>
  );
}
