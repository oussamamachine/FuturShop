/**
 * Jacket-related constants for product configuration and pricing.
 * @module constants/jacket
 */

export const JACKET_TYPES = Object.freeze({
  bomber: Object.freeze({
    label: "Classic Bomber",
    basePrice: 199,
    image: '/images/bomber-preview.jpg',
    parts: [
      { type: 'box', args: [1, 1.3, 0.2], pos: [0, 0, 0], roughness: 0.7 },
      { type: 'cylinder', args: [0.15, 0.15, 1, 16], pos: [0.6, 0, 0], roughness: 0.7 },
      { type: 'cylinder', args: [0.15, 0.15, 1, 16], pos: [-0.6, 0, 0], roughness: 0.7 },
      { type: 'box', args: [1.2, 0.3, 0.25], pos: [0, -0.65, 0], roughness: 0.9 },
    ],
    materials: Object.freeze({
      leather: { label: "Premium Leather", price: 50, roughness: 0.7, metalness: 0.3 },
      poly: { label: "Polyester Blend", price: 0, roughness: 0.9, metalness: 0 },
      nylon: { label: "Military Nylon", price: 30, roughness: 0.6, metalness: 0.1 },
    }),
    textures: Object.freeze({
      leather: '/textures/leather.jpg',
      carbon: '/textures/carbon-fiber.jpg',
    }),
  }),
  cyber: Object.freeze({
    label: "Cyberpunk Jacket",
    basePrice: 299,
    image: '/images/jackets/cyber-preview.jpg',
    parts: [
      { type: 'box', args: [1, 1.5, 0.15], pos: [0, 0, 0], roughness: 0.4 },
      { type: 'box', args: [0.12, 0.8, 0.15], pos: [0.5, 0.2, 0], roughness: 0.4 },
      { type: 'box', args: [0.12, 0.8, 0.15], pos: [-0.5, 0.2, 0], roughness: 0.4 },
      { type: 'box', args: [0.3, 0.3, 0.2], pos: [0, -0.3, 0.1], roughness: 0.2 },
    ],
    materials: Object.freeze({
      synth: { label: "Synthetic Fiber", price: 0, roughness: 0.4, metalness: 0.2 },
      carbon: { label: "Carbon Fiber", price: 80, roughness: 0.3, metalness: 0.8 },
      latex: { label: "Reactive Latex", price: 60, roughness: 0.5, metalness: 0.1 },
    }),
    textures: Object.freeze({
      neon: '/textures/neon-grid.jpg',
      circuit: '/textures/circuit-board.jpg',
    }),
  }),
});

export const SIZE_PRICES = Object.freeze({
  XS: 0,
  S: 0,
  M: 0,
  L: 10,
  XL: 20,
});

export const SIZES = Object.freeze(['XS', 'S', 'M', 'L', 'XL']);
