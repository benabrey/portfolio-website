"use client"
import {motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress(){
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
        restDelta: 0.001,
    });

    return(
        <motion.div 
        aria-hidden
        style ={{
            scaleX,
            transformOrigin: "0% 50%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            zIndex: 100,
            pointerEvents: "none",
        }}
    />
    );
}