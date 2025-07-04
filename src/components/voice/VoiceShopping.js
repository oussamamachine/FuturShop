
/**
 * VoiceShopping - Accessible, animated voice shopping assistant.
 * Uses browser speech recognition to match product categories.
 * @component
 */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PRODUCT_RESPONSES = {
  'neon jackets': {
    title: 'Neon Jackets Collection',
    description: 'Check out our vibrant neon jackets perfect for nightlife and festivals!',
    image: '/images/neon-jackets.jpg',
    link: '/collections/neon-jackets',
  },
  'summer dresses': {
    title: 'Summer Dresses',
    description: 'Light and breezy dresses for your summer adventures',
    image: '/images/summer-dresses.jpg',
    link: '/collections/summer-dresses',
  },
  'red sneakers': {
    title: 'Red Sneakers',
    description: 'Bold red sneakers to make a statement',
    image: '/images/red-sneakers.jpg',
    link: '/collections/red-sneakers',
  },
};


export default function VoiceShopping() {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setCommand(transcript);
          processCommand(transcript);
        };

        recognition.onerror = (event) => {
          setError('Error occurred in recognition: ' + event.error);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setError('Speech recognition not supported in this browser');
      }
    }
    // Clean up on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
      }
    };
  }, []);

  const processCommand = (command) => {
    const matchedCategory = Object.keys(PRODUCT_RESPONSES).find(category => 
      command.includes(category)
    );
    
    if (matchedCategory) {
      setResponse(PRODUCT_RESPONSES[matchedCategory]);
    } else {
      setResponse({
        title: 'No exact match found',
        description: `We couldn't find products for "${command}". Try being more specific.`
      });
    }
  };

  const handleVoiceCommand = () => {
    if (isListening) return;
    setError(null);
    setCommand('');
    setResponse(null);
    setIsListening(true);
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      } else {
        setTimeout(() => {
          setCommand('Show me neon jackets');
          processCommand('Show me neon jackets');
          setIsListening(false);
        }, 2000);
      }
    } catch (err) {
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Voice Shopping Assistant</h2>
          <p className="text-lg text-gray-400 mb-8">
            Find what you need using just your voice
          </p>

          <div className="relative">
            <motion.button
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-primary'
              } shadow-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceCommand}
              disabled={isListening}
              aria-label={isListening ? 'Listening...' : 'Start voice command'}
            >
              {isListening ? (
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white rounded-full animate-pulse"></div>
                </div>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                  />
                </svg>
              )}
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-red-900/50 rounded-lg p-4 text-red-300"
              >
                <p>{error}</p>
              </motion.div>
            )}

            {command && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gray-900 rounded-lg p-4"
              >
                <p className="text-gray-300">You said:</p>
                <p className="text-xl font-medium">{command}</p>
              </motion.div>
            )}

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gray-900 rounded-lg p-6 text-left"
              >
                <h3 className="text-2xl font-bold mb-2">{response.title}</h3>
                <p className="text-gray-300 mb-4">{response.description}</p>
                {response.image && (
                  <div className="mt-4">
                    <img 
                      src={response.image} 
                      alt={response.title} 
                      className="rounded-lg w-full max-w-md mx-auto"
                    />
                  </div>
                )}
                {response.link && (
                  <a
                    href={response.link}
                    className="mt-4 inline-block px-6 py-2 bg-primary rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    tabIndex={0}
                    aria-label={`View ${response.title} collection`}
                    data-testid="voice-view-collection"
                  >
                    View Collection
                  </a>
                )}
              </motion.div>
            )}

            <div className="mt-8 text-gray-500">
              <p>Try saying: "Show me summer dresses" or "Find red sneakers"</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}