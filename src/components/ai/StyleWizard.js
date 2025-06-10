import { useState } from 'react'
import { motion } from 'framer-motion'

export default function StyleWizard() {
  const [step, setStep] = useState(1)
  const [style, setStyle] = useState('casual')

  const styles = [
    { id: 'casual', name: 'Casual', emoji: '👕' },
    { id: 'formal', name: 'Formal', emoji: '👔' },
    { id: 'streetwear', name: 'Streetwear', emoji: '🧢' },
    { id: 'sporty', name: 'Sporty', emoji: '👟' },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">AI Style Wizard</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let our AI help you discover your perfect style
          </p>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-4">What's your preferred style?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styles.map((s) => (
                  <motion.button
                    key={s.id}
                    className={`p-4 rounded-lg border-2 transition-all ${style === s.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStyle(s.id)}
                  >
                    <span className="text-2xl block mb-2">{s.emoji}</span>
                    <span>{s.name}</span>
                  </motion.button>
                ))}
              </div>
              <button
                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Your {style} style recommendations</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <p>AI-generated style visualization would appear here</p>
              </div>
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                onClick={() => setStep(1)}
              >
                Start Over
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}