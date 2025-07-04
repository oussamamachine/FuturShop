import { useEffect, useRef } from 'react'

/**
 * BackgroundParticles - Animated, accessible, and responsive background canvas effect.
 * @component
 */
export default function BackgroundParticles() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  // Helper to create particles
  const createParticles = (width, height, count) => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(0, 200, 255, ${Math.random() * 0.5 + 0.1})`
      })
    }
    return arr
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let running = true

    function setCanvasSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Create initial particles
    const particleCount = window.innerWidth < 768 ? 30 : 60
    particlesRef.current = createParticles(canvas.width, canvas.height, particleCount)

    function animate() {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(particle => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Throttled resize handler
    let resizeTimeout
    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasSize()
        // Recreate particles for new size
        const count = window.innerWidth < 768 ? 30 : 60
        particlesRef.current = createParticles(canvas.width, canvas.height, count)
      }, 100)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      running = false
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-10"
      aria-hidden="true"
      tabIndex={-1}
      data-testid="background-particles-canvas"
    />
  )
}