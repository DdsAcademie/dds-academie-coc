'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  opacity: number
  color: string
}

interface AnimatedBackgroundProps {
  primaryColor?: string // RGB string ex: "74,158,255"
}

const DEFAULT_ORBS = [
  { xRatio: 0.15, yRatio: 0.30, rgb: '74,158,255',  radius: 250, opacity: 0.12 },
  { xRatio: 0.85, yRatio: 0.20, rgb: '200,168,75',  radius: 300, opacity: 0.10 },
  { xRatio: 0.50, yRatio: 0.80, rgb: '155,89,255',  radius: 200, opacity: 0.12 },
  { xRatio: 0.30, yRatio: 0.65, rgb: '255,140,0',   radius: 180, opacity: 0.08 },
]

function buildOrbs(primaryColor?: string) {
  if (!primaryColor) return DEFAULT_ORBS
  return [
    { xRatio: 0.15, yRatio: 0.30, rgb: primaryColor, radius: 280, opacity: 0.14 },
    { xRatio: 0.85, yRatio: 0.20, rgb: '200,168,75', radius: 300, opacity: 0.08 },
    { xRatio: 0.50, yRatio: 0.80, rgb: primaryColor, radius: 220, opacity: 0.10 },
    { xRatio: 0.30, yRatio: 0.65, rgb: primaryColor, radius: 180, opacity: 0.07 },
  ]
}

export default function AnimatedBackground({ primaryColor }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ORBS = buildOrbs(primaryColor)
    const PARTICLE_COLORS = primaryColor
      ? [`rgba(${primaryColor},0.8)`, '#c8a84b', `rgba(${primaryColor},0.5)`]
      : ['#c8a84b', '#4a9eff', '#9b59ff', '#ff8c00']

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }))

    let animationId: number

    const animate = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = '#030712'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Orbs
      ORBS.forEach((orb, index) => {
        const x = orb.xRatio * canvas.width + Math.sin(t * 0.0008 + index) * 40
        const y = orb.yRatio * canvas.height + Math.cos(t * 0.0006 + index) * 25
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius)
        gradient.addColorStop(0, `rgba(${orb.rgb}, ${orb.opacity})`)
        gradient.addColorStop(1, `rgba(${orb.rgb}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [primaryColor])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
