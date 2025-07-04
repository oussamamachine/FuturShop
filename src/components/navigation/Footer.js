import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'
import { RiContactsLine } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'


/**
 * Footer - Accessible, animated, and professional site footer.
 * @component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const linkVariants = {
    hover: {
      y: -3,
      color: '#00f0ff',
      textShadow: '0 0 8px rgba(0, 240, 255, 0.7)',
      transition: { duration: 0.2 },
    },
  };
  const location = useLocation();
  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/legal', label: 'Legal' },
  ];

  return (
    <footer
      className="bg-black border-t border-cyan-400/20 relative overflow-hidden"
      aria-label="Site footer"
      data-testid="site-footer"
    >
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="grid grid-cols-12 grid-rows-6 h-full w-full">
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-800"
              style={{ animationDelay: `${i * 0.02}s` }}
            />
          ))}
        </div>
      </div>
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              x: [null, Math.random() * 100 + '%'],
              y: [null, Math.random() * 100 + '%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <nav aria-label="Footer navigation" className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">FUTURSHOP</h3>
            <p className="text-gray-400 mb-4">Products from tomorrow, delivered yesterday</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <motion.a
                href="https://github.com/futurshop"
                className="text-gray-400 hover:text-cyan-400"
                whileHover="hover"
                variants={linkVariants}
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                data-testid="footer-github"
              >
                <FiGithub size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://twitter.com/futurshop"
                className="text-gray-400 hover:text-cyan-400"
                whileHover="hover"
                variants={linkVariants}
                target="_blank" rel="noopener noreferrer"
                aria-label="Twitter"
                data-testid="footer-twitter"
              >
                <FiTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://instagram.com/futurshop"
                className="text-gray-400 hover:text-cyan-400"
                whileHover="hover"
                variants={linkVariants}
                target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                data-testid="footer-instagram"
              >
                <FiInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </motion.div>
          {/* Explore Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">EXPLORE</h3>
            <ul className="space-y-2" aria-label="Explore links">
              {navLinks.map(({ to, label }) => (
                <motion.li key={to} whileHover="hover" variants={linkVariants}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-cyan-400"
                    aria-current={location.pathname === to ? 'page' : undefined}
                    data-testid={`footer-link-${label.toLowerCase()}`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">SUPPORT</h3>
            <ul className="space-y-2" aria-label="Support links">
              <motion.li whileHover="hover" variants={linkVariants}>
                <a href="mailto:support@futur.com" className="text-gray-400 hover:text-cyan-400" data-testid="footer-support-email">Email Support</a>
              </motion.li>
              <motion.li whileHover="hover" variants={linkVariants}>
                <a href="mailto:hologram@futurshop.ai" className="text-gray-400 hover:text-cyan-400" data-testid="footer-hologram-email">Hologram Support</a>
              </motion.li>
            </ul>
          </motion.div>
          {/* Transmission/Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">TRANSMISSION</h3>
            <div className="flex items-center space-x-2 mb-4">
              <RiContactsLine className="text-cyan-400" aria-hidden="true" />
              <span className="text-gray-400" data-testid="footer-contact-email">hologram@futurshop.ai</span>
            </div>
            <div className="text-gray-400 text-sm">
              <span className="sr-only">Coordinates:</span> 34.0522° N, 118.2437° W<br />
              <span className="sr-only">Time Zone:</span> PST (but we're omnipresent)
            </div>
          </motion.div>
        </nav>
        <motion.div
          className="pt-8 border-t border-gray-800 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          aria-label="Copyright"
        >
          © {currentYear} FUTURSHOP INC. All realities reserved.<br />
          Patent Pending: Quantum Commerce System v4.2
        </motion.div>
      </div>
    </footer>
  );
}