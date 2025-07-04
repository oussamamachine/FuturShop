import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from './Button';


/**
 * ErrorBoundary - Accessible, animated error boundary for React apps.
 * @component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gray-900 text-white"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="error-boundary-title"
          aria-describedby="error-boundary-desc"
          tabIndex={-1}
          data-testid="error-boundary"
        >
          <div className="text-center p-8">
            <FiAlertTriangle className="text-6xl text-red-500 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold mb-4" id="error-boundary-title">Something went wrong</h1>
            <p className="text-gray-400 mb-6" id="error-boundary-desc">
              We're sorry, but something unexpected happened.<br />
              Please try refreshing the page or contact support if the issue persists.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              className="px-6 py-3 mb-2"
              aria-label="Refresh page"
              data-testid="error-boundary-refresh"
            >
              Refresh Page
            </Button>
            <a
              href="mailto:support@futur.com"
              className="block text-cyan-400 hover:underline mt-2"
              aria-label="Contact support"
              data-testid="error-boundary-support"
            >
              Contact Support
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
