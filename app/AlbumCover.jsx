"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./AlbumCover.css";

export default function AlbumCover() {
  const x = useMotionValue(0);

  return (
    <div className="album-page">
      <div className="album-cover">
        {/*Sleeve*/}
        <div className="sleeve">
          <div className="album-content">
            <span className="album-year">EST. 2026</span>

            <h1 className="album-title">
              BEN
              <br />
              ABREY
            </h1>

            <p className="album-subtitle">
              Web Design
              <br />& Development
            </p>

            <div className="pull-indicator">← Pull Record</div>
          </div>

          {/*Vinyl*/}
          <motion.div
            className="vinyl"
            drag="x"
            dragConstraints={{ left: 0, right: 500 }}
            dragElastic={0.05}
            style={{ x }}
          >
            <div className="vinyl-center">
              <span>SIDE A</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
