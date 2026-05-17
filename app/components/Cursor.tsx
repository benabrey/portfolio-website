'use client'
// app/components/Cursor.tsx
// A custom cursor that morphs based on what you hover

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'text' | 'drag'

export default function Cursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const [cursorState, setCursorState] = useState<CursorState>('default')
    const [isVisible, setIsVisible] = useState(false)

    // Spring makes the cursor lag slightly behind the mouse — feels premium
    const springConfig = { stiffness: 500, damping: 35 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    // Slower follower dot for the trail effect
    const followerX = useSpring(cursorX, { stiffness: 150, damping: 20 })
    const followerY = useSpring(cursorY, { stiffness: 150, damping: 20 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            setIsVisible(true)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        // Detect what element the cursor is over and change state
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hiw-step') ||
                target.classList.contains('service-card') ||
                target.classList.contains('coming-card')
            ) {
                setCursorState('hover')
            } else if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT'
            ) {
                setCursorState('text')
            } else {
                setCursorState('default')
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('mouseenter', handleMouseEnter)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('mouseenter', handleMouseEnter)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [cursorX, cursorY])

    // Hide on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0, top: 0,
                    x, y,
                    translateX: '-50%',
                    translateY: '-50%',
                    zIndex: 99999,
                    pointerEvents: 'none',
                    mixBlendMode: 'difference',
                }}
                animate={{
                    width:  cursorState === 'hover' ? 48 : cursorState === 'text' ? 3 : 10,
                    height: cursorState === 'hover' ? 48 : cursorState === 'text' ? 24 : 10,
                    borderRadius: cursorState === 'text' ? '2px' : '50%',
                    backgroundColor: '#ffffff',
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Follower ring — lags behind */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0, top: 0,
                    x: followerX,
                    y: followerY,
                    translateX: '-50%',
                    translateY: '-50%',
                    zIndex: 99998,
                    pointerEvents: 'none',
                    border: '1px solid rgba(124, 92, 252, 0.5)',
                    borderRadius: '50%',
                }}
                animate={{
                    width:  cursorState === 'hover' ? 72 : 32,
                    height: cursorState === 'hover' ? 72 : 32,
                    opacity: isVisible ? (cursorState === 'text' ? 0 : 0.6) : 0,
                    scale: cursorState === 'hover' ? 1.1 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    )
}