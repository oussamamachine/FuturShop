/**
 * Accessible, styled input component with label and ARIA support.
 * @component
 */
export default function Input({ label, id, type = 'text', className = '', required = false, error = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
          aria-label={label}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`px-4 py-2 rounded-lg border border-gray-300 focus:border-cyan-400 focus:outline-none bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-colors ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert" data-testid="input-error">
          {error}
        </span>
      )}
    </div>
  );
}
