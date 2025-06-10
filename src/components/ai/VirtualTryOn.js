import { useRef, useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as bodyPix from '@tensorflow-models/body-pix'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCamera, FiLoader, FiCheck, FiX } from 'react-icons/fi'

export default function VirtualTryOn() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [outfit, setOutfit] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [fps, setFps] = useState(0)
  const lastFpsUpdate = useRef(Date.now())
  const frameCount = useRef(0)

  const outfits = [
    { id: 'jacket', name: 'Designer Jacket', color: 'bg-blue-500' },
    { id: 'dress', name: 'Evening Dress', color: 'bg-pink-500' },
    { id: 'glasses', name: 'Sunglasses', color: 'bg-gray-800' },
    { id: 'hat', name: 'Summer Hat', color: 'bg-yellow-400' },
  ]

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      try {
        await tf.ready()
        await loadModel()
      } catch (error) {
        console.error('Initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    init()
    
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const loadModel = async () => {
    try {
      const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
      })
      setIsReady(true)
      return net
    } catch (error) {
      console.error('Model loading error:', error)
      throw error
    }
  }

  const startCamera = async () => {
    try {
      setIsLoading(true)
      const constraints = {
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' 
        }
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      videoRef.current.srcObject = stream
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play()
        setIsCameraActive(true)
        setIsLoading(false)
        processVideo()
      }
    } catch (error) {
      console.error('Camera error:', error)
      setIsLoading(false)
      alert('Could not access the camera. Please check permissions.')
    }
  }

  const processVideo = async () => {
    if (!isReady || !videoRef.current || isLoading) return
    
    const model = await bodyPix.load()
    const processFrame = async () => {
      const startTime = performance.now()
      
      try {
        const segmentation = await model.segmentPerson(videoRef.current, {
          flipHorizontal: false,
          internalResolution: 'medium',
          segmentationThreshold: 0.7
        })
        
        renderOutfit(segmentation)

        frameCount.current++
        const now = Date.now()
        if (now - lastFpsUpdate.current >= 1000) {
          setFps(Math.round((frameCount.current * 1000) / (now - lastFpsUpdate.current)))
          frameCount.current = 0
          lastFpsUpdate.current = now
        }
        
        const processingTime = performance.now() - startTime
        const delay = Math.max(0, 1000/30 - processingTime) 
        
        setTimeout(() => {
          requestAnimationFrame(processFrame)
        }, delay)
      } catch (error) {
        console.error('Processing error:', error)
      }
    }
    
    processFrame()
  }

  const renderOutfit = (segmentation) => {
    const ctx = canvasRef.current.getContext('2d')
    const { width, height } = canvasRef.current
    
    ctx.clearRect(0, 0, width, height)
    
    ctx.drawImage(videoRef.current, 0, 0, width, height)

    const mask = bodyPix.toMask(segmentation)
    ctx.putImageData(mask, 0, 0)

    if (outfit) {
      ctx.fillStyle = 'rgba(0, 100, 255, 0.5)'
      ctx.globalCompositeOperation = 'source-atop'
      switch(outfit) {
        case 'jacket':
          ctx.beginPath()
          ctx.moveTo(width * 0.3, height * 0.2)
          ctx.fill()
          break
        case 'dress':
          ctx.beginPath()
          ctx.ellipse(width/2, height*0.4, width*0.3, height*0.5, 0, 0, Math.PI*2)
          ctx.fill()
          break
        case 'glasses':
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
          ctx.fillRect(width*0.25, height*0.3, width*0.5, height*0.1)
          break
        default:
          break
      }
    }
  }

  const captureImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = canvasRef.current.width
    canvas.height = canvasRef.current.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(canvasRef.current, 0, 0)
    setCapturedImage(canvas.toDataURL('image/png'))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const resetTryOn = () => {
    setOutfit(null)
    setCapturedImage(null)
  }

  return (
    <div className="relative h-[80vh] max-h-[800px] w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
      <video ref={videoRef} autoPlay playsInline className="hidden" />
      
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
            className="p-6 bg-white/90 rounded-full"
          >
            <FiLoader className="text-3xl text-primary animate-spin" />
          </motion.div>
        </div>
      )}
      {!isCameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white z-10 p-8 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md"
          >
            <h1 className="text-4xl font-bold mb-4">Virtual Fitting Room</h1>
            <p className="text-lg mb-8">Try on different outfits virtually before you buy. Our AI will map the clothing onto your body in real-time.</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startCamera}
              disabled={isLoading}
              className="bg-white text-indigo-900 px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2"
            >
              <FiCamera /> Start Virtual Try-On
            </motion.button>
          </motion.div>
        </div>
      )}
      {isCameraActive && (
        <>
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {fps} FPS
            </div>
            
            <div className="flex gap-2">
              {capturedImage ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetTryOn}
                  className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg"
                >
                  <FiX className="text-lg" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={captureImage}
                  className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg"
                >
                  <FiCamera className="text-lg" />
                </motion.button>
              )}
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex gap-3 justify-center overflow-x-auto px-4 py-2 no-scrollbar">
              {outfits.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center ${outfit === item.id ? 'ring-2 ring-white' : ''}`}
                  onClick={() => setOutfit(item.id)}
                >
                  <div className={`w-16 h-16 ${item.color} rounded-lg mb-1 flex items-center justify-center text-white`}>
                    {item.id === 'glasses' ? '👓' : item.id === 'hat' ? '🧢' : '👕'}
                  </div>
                  <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full">
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
      {capturedImage && (
        <div className="absolute inset-0 bg-black/80 z-30 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <img 
              src={capturedImage} 
              alt="Captured try-on" 
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white px-6 py-2 rounded-full font-medium"
                onClick={() => {
                  const link = document.createElement('a')
                  link.download = `virtual-tryon-${new Date().toISOString()}.png`
                  link.href = capturedImage
                  link.click()
                }}
              >
                Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 px-6 py-2 rounded-full font-medium"
                onClick={resetTryOn}
              >
                Try Another
              </motion.button>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <FiCheck className="text-xl" />
            <span>Outfit saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}