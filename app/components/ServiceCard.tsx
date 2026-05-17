'use client'
// app/components/ServiceCard.tsx
// A single service card with 3D tilt effect and cursor glow
// Import and use this instead of plain divs in your home page

import { motion, useMotionTemplate } from 'framer-motion'
import Link from 'next/link'
import { useTilt, useGlowCursor, flipIn } from '../lib/animations'

interface ServiceCardProps {
    tag: string
    tagColor: 'purple' | 'pink'
    title: string
    desc: string
    videoSrc: string
}

export default function ServiceCard({ tag, tagColor, title, desc, videoSrc }: ServiceCardProps) {
    // 3D tilt — card tilts toward cursor in 3D space
    const tilt = useTilt(8)

    // Glow cursor — spotlight follows mouse inside the card
    const glow = useGlowCursor()

    // useMotionTemplate lets you build a dynamic CSS string from motion values
    // This creates a radial gradient that follows the cursor
    const glowBackground = useMotionTemplate`radial-gradient(circle at ${glow.x}px ${glow.y}px, rgba(124,92,252,0.12), transparent 60%)`

    return (
        // flipIn — card flips in from 3D perspective when it scrolls into view
        <motion.div
            ref={tilt.ref}
            className="service-card"
            variants={flipIn}
            // 3D tilt follows cursor
            style={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                transformPerspective: 1000,
            }}
            onMouseMove={(e) => {
                tilt.handleMouseMove(e)
                glow.handleMouseMove(e)
            }}
            onMouseLeave={() => {
                tilt.handleMouseLeave()
            }}
            // Lifts up on hover
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Glow overlay — follows cursor inside the card */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: glowBackground,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            <div className="service-card-media" style={{ position: 'relative' }}>
                <video className="service-item-img" autoPlay muted loop playsInline>
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="service-item-overlay" />
            </div>

            <div className="service-card-body" style={{ position: 'relative', zIndex: 2 }}>
                <span className={`service-tag ${tagColor}`}>{tag}</span>
                <div className="service-item-name">{title}</div>
                <div className="service-item-desc">{desc}</div>
            </div>

            <div className="service-card-footer" style={{ position: 'relative', zIndex: 2 }}>
                <Link href="/contact" className="service-cta">Get started</Link>
                <motion.span
                    className="service-arrow"
                    // Arrow slides right on card hover
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                    →
                </motion.span>
            </div>
        </motion.div>
    )
}