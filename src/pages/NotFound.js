/**
 * NotFound - Accessible 404 page for Futur.
 * @component
 */
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-8" role="alert" aria-labelledby="notfound-title">
      <h1 id="notfound-title" className="text-6xl font-bold text-cyan-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Page Not Found</h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Go to homepage"
      >
        Go Home
      </Link>
    </div>
  );
}
