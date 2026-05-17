'use client'
// app/components/Counter.tsx
// Counts up to a number when it enters the viewport
// Usage: <Counter value={100} suffix="%" label="Custom Code" />

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CounterProps {
    value: number | string  // string for "∞" or "48hr"
    suffix?: string
    label: string
    duration?: number
}

export default function Counter({ value, suffix = '', label, duration = 2 }: CounterProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const [count, setCount] = useState(0)

    const isNumber = typeof value === 'number'

    useEffect(() => {
        if (!isInView || !isNumber) return

        let start = 0
        const end = value as number
        const increment = end / (duration * 60) // 60fps
        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 1000 / 60)

        return () => clearInterval(timer)
    }, [isInView, value, duration, isNumber])

    return (
        <motion.div
            ref={ref}
            className="works-stat"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="works-stat-num">
                {isNumber
                    ? isInView ? `${count}${suffix}` : `0${suffix}`
                    : value
                }
            </span>
            <span className="works-stat-label">{label}</span>
        </motion.div>
    )
}