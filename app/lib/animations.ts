'use client'
// app/lib/animations.ts
// Your central animation library — import from here across all pages
// This keeps all your motion config in one place

import { useRef, useState } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
export type { Variants }

// ── Easing curves ──
// These match the feel of high-end Framer sites
export const ease = {
    out:    [0.22, 1, 0.36, 1]    as const,
    inOut:  [0.65, 0, 0.35, 1]    as const,
    spring: { type: 'spring' as const, stiffness: 300, damping: 24 },
    softSpring: { type: 'spring' as const, stiffness: 180, damping: 18 },
}

// ── Reusable Variants ──
export const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 40, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeUpFast: Variants = {
    hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeIn: Variants = {
    hidden:  { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

// Clips text up from below — the signature Framer reveal
export const clipUp: Variants = {
    hidden:  { y: '100%', opacity: 0 },
    visible: { y: '0%',   opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

// 3D card flip in
export const flipIn: Variants = {
    hidden:  { opacity: 0, rotateX: 15, y: 60, scale: 0.95, filter: 'blur(4px)' },
    visible: { opacity: 1, rotateX: 0,  y: 0,  scale: 1,    filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
}

// Stagger containers
export const stagger = (delay = 0.1, p0: number): Variants => ({
    hidden:  {},
    visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } }
})

export const staggerFast: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
}

// Scale in with blur
export const scaleIn: Variants = {
    hidden:  { opacity: 0, scale: 0.88, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1,    filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
}

// Slide in from left
export const slideLeft: Variants = {
    hidden:  { opacity: 0, x: -60, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

// ── Magnetic hover hook ──
// Makes an element attract toward the cursor like a magnet
// Usage: const { ref, x, y } = useMagnetic(0.4)
// Then: <motion.div ref={ref} style={{ x, y }}>
export function useMagnetic(strength = 0.3) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springX = useSpring(x, { stiffness: 200, damping: 15 })
    const springY = useSpring(y, { stiffness: 200, damping: 15 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * strength)
        y.set((e.clientY - cy) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave }
}

// ── 3D tilt card hook ──
// Makes a card tilt in 3D toward the cursor
// Usage: const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()
// Then: <motion.div ref={ref} style={{ rotateX, rotateY, transformPerspective: 800 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
export function useTilt(strength = 12) {
    const ref = useRef<HTMLDivElement>(null)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  - 0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5
        rotateX.set(-y * strength)
        rotateY.set(x * strength)
    }

    const handleMouseLeave = () => {
        rotateX.set(0)
        rotateY.set(0)
    }

    return { ref, rotateX: springRotateX, rotateY: springRotateY, handleMouseMove, handleMouseLeave }
}

// ── Parallax hook ──
// Ties an element's position to scroll progress
// Usage: const { ref, y } = useParallax(80)
// Then: <motion.div ref={ref} style={{ y }}>
export function useParallax(offset = 60) {
    const ref = useRef<HTMLDivElement>(null)
    const [elementTop, setElementTop] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)

    const scrollY = useMotionValue(0)

    const initial = elementTop - clientHeight
    const final = elementTop + offset

    const y = useTransform(scrollY, [initial, final], [-offset, offset])

    return { ref, y }
}

// ── Glow cursor hook ──
// Tracks cursor position for a glowing spotlight effect
// Usage: const { x, y, handleMouseMove } = useGlowCursor()
// Then add onMouseMove={handleMouseMove} to the section
// And: <motion.div style={{ background: `radial-gradient(circle at ${x}px ${y}px, rgba(124,92,252,0.15), transparent 60%)` }} />
export function useGlowCursor() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
    }

    return { x, y, handleMouseMove }
}