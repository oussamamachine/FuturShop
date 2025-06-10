import { motion } from 'framer-motion'
import { useState } from 'react'

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  const features = [
    {
      title: "Quantum Shipping",
      description: "Orders teleported within 24h",
      icon: "🚀",
      gradient: "from-purple-500 to-indigo-600",
      tech: "Wormhole Logistics™"
    },
    {
      title: "Neural Returns",
      description: "Mind-controlled returns system",
      icon: "🧠",
      gradient: "from-cyan-400 to-blue-500",
      tech: "Brain-Computer Interface"
    },
    {
      title: "Holographic Support",
      description: "3D AI assistants 24/7",
      icon: "👽",
      gradient: "from-emerald-400 to-teal-600",
      tech: "Holotech AI"
    },
    {
      title: "Anti-Gravity Packaging",
      description: "Zero-impact delivery",
      icon: "🛸",
      gradient: "from-amber-400 to-orange-500",
      tech: "Graviton Shielding"
    }
  ]

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-gray-800 animate-pulse"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          Future Commerce Technology
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative bg-gradient-to-br ${feature.gradient} p-0.5 rounded-xl overflow-hidden`}
            >
              <div className="bg-black p-6 rounded-lg h-full flex flex-col items-center">
                <div className={`text-6xl mb-6 transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center mb-4">{feature.description}</p>
                
                <div className={`mt-auto text-xs font-mono px-3 py-1 rounded-full bg-black border ${hoveredIndex === index ? 'border-cyan-400 text-cyan-400' : 'border-gray-700 text-gray-400'} transition-all`}>
                  {feature.tech}
                </div>
              </div>
              {hoveredIndex === index && (
                <>
                  <div className="absolute inset-0 rounded-xl bg-white opacity-10"></div>
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl border-2 border-cyan-400 pointer-events-none animate-pulse"></div>
                </>
              )}
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
         
        </motion.div>
      </div>
    </section>
  )
}