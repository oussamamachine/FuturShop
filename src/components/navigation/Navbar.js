import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { cartItems, itemCount, setIsCartOpen } = useCart()

  const [glitchEffect, setGlitchEffect] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const triggerGlitch = () => {
    setGlitchEffect(true)
    setTimeout(() => setGlitchEffect(false), 300)
  }
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartPulse(true)
      const timer = setTimeout(() => setCartPulse(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [cartItems])

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-cyan-400/20 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent 
            ${glitchEffect ? 'translate-x-1 skew-x-12' : 'transition-all duration-500 hover:skew-x-0'}`}
          onMouseEnter={triggerGlitch}
        >
          <span className="relative">
            FUTUR<span className="text-purple-400">SHOP</span>
            <span className={`absolute left-0 top-0 text-white opacity-0 ${glitchEffect ? 'animate-glitch opacity-100' : ''}`}>
              FUTUR_SHOP
            </span>
          </span>
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 group rounded-full border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
        >
          <div className="relative">
            <FiShoppingCart 
              size={24} 
              className="text-cyan-400 group-hover:text-purple-400 transition-colors" 
            />
            {cartItems.length > 0 && (
              <span className={`
                absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold h-6 w-6 
                flex items-center justify-center rounded-full border border-cyan-400
                ${cartPulse ? 'animate-ping-once' : ''}
              `}>
                {itemCount}
              </span>
            )}
          </div>
          <span className="absolute inset-0 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
      </div>
      <style jsx>{`
        @keyframes glitch {
          0% { clip-path: inset(10% 0 90% 0); transform: skewX(0deg); }
          20% { clip-path: inset(80% 0 20% 0); transform: skewX(30deg); }
          40% { clip-path: inset(30% 0 70% 0); transform: skewX(-20deg); }
          60% { clip-path: inset(60% 0 40% 0); transform: skewX(15deg); }
          80% { clip-path: inset(20% 0 80% 0); transform: skewX(-10deg); }
          100% { clip-path: inset(0); transform: skewX(0deg); }
        }
        .animate-glitch {
          animation: glitch 0.3s linear;
        }
        @keyframes ping-once {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-ping-once {
          animation: ping-once 0.5s ease-out;
        }
      `}</style>
    </nav>
  )
}
