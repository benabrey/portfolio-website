'use client'
// app/components/TextReveal.tsx
// Reveals text character by character when it enters the viewport
// Usage: <TextReveal text="Hello World" className="hero-title" as="h1" />

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface TextRevealProps {
    text: string
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
    delay?: number
    staggerDelay?: number
}

const containerVariants: Variants = {
    hidden: {},
    visible: (delay: number) => ({
        transition: { staggerChildren: 0.03, delayChildren: delay }
    })
}

const charVariants: Variants = {
    hidden: { y: '110%', opacity: 0, rotateX: -30 },
    visible: {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
}

export default function TextReveal({
    text,
    className,
    as: Tag = 'h2',
    delay = 0,
    staggerDelay = 0.03
}: TextRevealProps) {
    // Split into words, then each word into characters
    // We keep words together so line breaks work naturally
    const words = text.split(' ')

    return (
        <motion.div
            variants={containerVariants}
            custom={delay}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{ overflow: 'hidden' }}
        >
            <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
                {words.map((word, wi) => (
                    // Each word is a flex container that clips its characters
                    <span key={wi} style={{ display: 'inline-flex', overflow: 'hidden' }}>
                        {word.split('').map((char, ci) => (
                            <motion.span
                                key={ci}
                                variants={charVariants}
                                style={{ display: 'inline-block' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </Tag>
        </motion.div>
    )
}