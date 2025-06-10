import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Web3Provider } from './context/Web3Context'
import { AIContextProvider } from './context/AIContext'
import { CartProvider } from './context/CartContext'
import ProductPage from './pages/Product'
import CheckoutPage from './pages/Checkout'
import Layout from './components/Layout'
import HomePage from './pages/Home'
import CartDrawer from './components/cart/CartDrawer'
function App() {
  return (
    <Web3Provider>
      <AIContextProvider>
        <CartProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </Layout>
            <CartDrawer /> {/* <-- Move here */}
          </BrowserRouter>
        </CartProvider>
      </AIContextProvider>
    </Web3Provider>
  )
}

export default App