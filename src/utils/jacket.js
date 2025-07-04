/**
 * Utility functions for jacket customization.
 */
import { JACKET_TYPES, SIZE_PRICES } from '../constants/jacket';

/**
 * Calculates the total price of a jacket design.
 * @param {Object} design - The jacket design object.
 * @param {string} design.style - The style key from JACKET_TYPES.
 * @param {string} design.material - The material key from JACKET_TYPES[style].materials.
 * @param {string} design.size - The size key from SIZE_PRICES.
 * @param {string} [design.backDesign] 
 * @param {string} [design.backText] 
 * @returns {number} The calculated price.
 * @throws {Error} If required fields are missing or invalid.
 */
export function calculatePrice(design) {
  if (!design || typeof design !== 'object') {
    throw new Error('Invalid design: must be an object.');
  }
  const { style, material, size } = design;
  if (!JACKET_TYPES[style]) {
    throw new Error(`Invalid style: ${style}`);
  }
  if (!JACKET_TYPES[style].materials[material]) {
    throw new Error(`Invalid material: ${material} for style: ${style}`);
  }
  if (!(size in SIZE_PRICES)) {
    throw new Error(`Invalid size: ${size}`);
  }
  const basePrice = JACKET_TYPES[style].basePrice;
  const materialPrice = JACKET_TYPES[style].materials[material].price;
  const sizePrice = SIZE_PRICES[size];
  const designPrice = design.backDesign ? 30 : (design.backText ? 10 : 0);
  return basePrice + materialPrice + sizePrice + designPrice;
}
