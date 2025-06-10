import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'
import { RiContactsLine } from 'react-icons/ri'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const linkVariants = {
    hover: {
      y: -3,
      color: '#00f0ff',
      textShadow: '0 0 8px rgba(0, 240, 255, 0.7)',
      transition: { duration: 0.2 }
    }
  }

  return (
    <footer className="bg-black border-t border-cyan-400/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
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
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * 100 + '%'],
              y: [null, Math.random() * 100 + '%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">FUTURSHOP</h3>
            <p className="text-gray-400 mb-4">Products from tomorrow, delivered yesterday</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-cyan-400"
                whileHover="hover"
                variants={linkVariants}
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-cyan-400"
                whileHover="hover"
                variants={linkVariants}
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-cyan-400"
                whileHover="hover"
                variants={linkVariants}
              >
                <FiInstagram size={20} />
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">QUANTUM LINKS</h3>
            <ul className="space-y-2">
              {['Wormhole', 'Teleportation', 'Time Travel', 'Parallel Universe'].map((link) => (
                <motion.li key={link}
                  whileHover="hover"
                  variants={linkVariants}
                >
                  <a href="#" className="text-gray-400">{link} Mode</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">HOLO SUPPORT</h3>
            <ul className="space-y-2">
              {['Neural Chat', 'AI Assistant', 'Memory Upload', 'Dream Repair'].map((link) => (
                <motion.li key={link}
                  whileHover="hover"
                  variants={linkVariants}
                >
                  <a href="#" className="text-gray-400">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">TRANSMISSION</h3>
            <div className="flex items-center space-x-2 mb-4">
              <RiContactsLine className="text-cyan-400" />
              <span className="text-gray-400">hologram@futurshop.ai</span>
            </div>
            <div className="text-gray-400 text-sm">
              Coordinates: 34.0522° N, 118.2437° W<br />
              Time Zone: PST (but we're omnipresent)
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="pt-8 border-t border-gray-800 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          © {currentYear} FUTURSHOP INC. All realities reserved.<br />
          Patent Pending: Quantum Commerce System v4.2
        </motion.div>
      </div>
    </footer>
  )
}