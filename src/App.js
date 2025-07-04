import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Web3Provider } from './context/Web3Context'
import { AIContextProvider } from './context/AIContext'
import { CartProvider } from './context/CartContext'
import ProductPage from './pages/Product'
import CheckoutPage from './pages/Checkout'
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/Home'
import CartDrawer from './components/cart/CartDrawer'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { reportWebVitals } from './utils/analytics'
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';

// Initialize performance monitoring
reportWebVitals();

function App() {
  return (
    <ErrorBoundary>
      <Web3Provider>
        <AIContextProvider>
          <CartProvider>
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/legal" element={<Legal />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
              <CartDrawer />
            </BrowserRouter>
          </CartProvider>
        </AIContextProvider>
      </Web3Provider>
    </ErrorBoundary>
  )
}

export default App