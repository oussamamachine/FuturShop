import React from 'react';
import { motion } from 'framer-motion';

const base =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-cyan-600 text-white hover:bg-cyan-700',
  secondary:
    'bg-gray-800 text-white hover:bg-gray-700',
  outline:
    'bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black',
  ghost:
    'bg-transparent text-cyan-400 hover:bg-cyan-100',
};


/**
 * Button - Accessible, animated, and flexible button component.
 * @component
 * @param {object} props
 * @param {string} [props.variant] - Visual style variant
 * @param {string} [props.className] - Additional classes
 * @param {string|React.ElementType} [props.as] - Element type (button, a, etc)
 * @param {React.ReactNode} props.children - Button content
 * @param {object} [props] - Other props
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  as = 'button',
  'data-testid': dataTestId,
  ...props
}) {
  const Comp = as;
  const isButton = as === 'button' || as === undefined;
  return (
    <motion.button
      as={Comp}
      type={isButton ? (props.type || 'button') : undefined}
      role={!isButton ? 'button' : undefined}
      tabIndex={!isButton ? 0 : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant] || ''} ${className}`}
      data-testid={dataTestId || 'ui-button'}
      {...props}
    >
      {children}
    </motion.button>
  );
}
