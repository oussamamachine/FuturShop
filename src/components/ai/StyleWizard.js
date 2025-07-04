
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function StyleWizard() {
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState('casual');
  const styles = useMemo(() => [
    { id: 'casual', name: 'Casual', emoji: '👕' },
    { id: 'formal', name: 'Formal', emoji: '👔' },
    { id: 'streetwear', name: 'Streetwear', emoji: '🧢' },
    { id: 'sporty', name: 'Sporty', emoji: '👟' },
  ], []);
  const styleButtonsRef = useRef([]);

  // Keyboard navigation for style selection
  useEffect(() => {
    if (step !== 1) return;
    const handleKeyDown = (e) => {
      const idx = styles.findIndex((s) => s.id === style);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (idx + 1) % styles.length;
        setStyle(styles[next].id);
        styleButtonsRef.current[next]?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (idx - 1 + styles.length) % styles.length;
        setStyle(styles[prev].id);
        styleButtonsRef.current[prev]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setStep(2);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [step, style, styles]);

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50" aria-labelledby="ai-style-wizard-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 id="ai-style-wizard-heading" className="text-3xl font-bold mb-4">AI Style Wizard</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let our AI help you discover your perfect style
          </p>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-6"
              role="group"
              aria-labelledby="style-choice-heading"
            >
              <h3 id="style-choice-heading" className="text-xl font-semibold mb-4">What's your preferred style?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="radiogroup" aria-label="Style options">
                {styles.map((s, i) => (
                  <motion.button
                    key={s.id}
                    ref={el => styleButtonsRef.current[i] = el}
                    className={`p-4 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${style === s.id ? 'border-primary bg-primary/10 ring-2 ring-primary-400' : 'border-gray-200 hover:border-primary/50'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStyle(s.id)}
                    aria-checked={style === s.id}
                    role="radio"
                    tabIndex={style === s.id ? 0 : -1}
                  >
                    <span className="text-2xl block mb-2" aria-hidden="true">{s.emoji}</span>
                    <span>{s.name}</span>
                  </motion.button>
                ))}
              </div>
              <button
                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                onClick={() => setStep(2)}
                aria-label="Continue to recommendations"
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
              role="region"
              aria-labelledby="recommendations-heading"
            >
              <h3 id="recommendations-heading" className="text-xl font-semibold mb-4">Your {style} style recommendations</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <p>AI-generated style visualization would appear here</p>
              </div>
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                onClick={() => setStep(1)}
                aria-label="Start over"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}