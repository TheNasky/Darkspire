import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BattleGrid({ config, onCellClick }) {
  const [cellSize, setCellSize] = useState(100);
  const gridRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxWidth = container.clientWidth - 48;
        const maxHeight = (window.innerHeight * 0.8) - 120;
        const maxCellSize = Math.floor(
          Math.min(maxWidth / config.grid.cols, maxHeight / config.grid.rows)
        );
        setCellSize(maxCellSize);
      }
    };

    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [config.grid]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <motion.div
        ref={gridRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${config.grid.cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${config.grid.rows}, ${cellSize}px)`
        }}
      >
        {Array.from({ length: config.grid.rows * config.grid.cols }).map((_, index) => {
          const row = Math.floor(index / config.grid.cols);
          const col = index % config.grid.cols;

          return (
            <motion.div
              key={`${row}-${col}`}
              className="bg-black/20 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => onCellClick(row, col)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          );
        })}
      </motion.div>
    </div>
  );
} 