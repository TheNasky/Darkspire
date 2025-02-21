import { useEffect, useState, useRef } from "react";

export default function BattleGrid({ gridSize = { rows: 10, cols: 10 }, children }) {
  const containerRef = useRef(null);
  const [cellSize, setCellSize] = useState(100);
  const [mounted, setMounted] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateCellSize = () => {
      const container = containerRef.current;
      const maxWidth = container.clientWidth - 48;
      const maxHeight = container.clientHeight - 48;
      const maxCellSize = Math.floor(
        Math.min(maxWidth / (gridSize.cols/2), maxHeight / (gridSize.rows/2))
      );
      setCellSize(maxCellSize / 2);
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [gridSize]);

  const gridWidth = gridSize.cols * cellSize;
  const gridHeight = gridSize.rows * cellSize;

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/30 p-6 h-full flex items-center justify-center">
        {/* Hover coordinates display */}
        <div className="absolute top-4 left-4 text-white/80 font-mono text-sm z-10">
          {hoveredCell ? `Cell: ${hoveredCell.row}, ${hoveredCell.col}` : ''}
        </div>

        {/* Grid Container */}
        <div className="flex justify-center items-center flex-1">
          <div
            className="relative"
            style={{
              width: gridWidth,
              height: gridHeight,
            }}
          >
            {/* Grass Tiles Layer */}
            {Array.from({ length: Math.ceil(gridSize.rows / 2) }).map((_, macroRow) =>
              Array.from({ length: Math.ceil(gridSize.cols / 2) }).map((_, macroCol) => (
                <div
                  key={`grass-${macroRow}-${macroCol}`}
                  className={`absolute opacity-0 ${mounted ? "animate-cell-drop" : ""}`}
                  style={{
                    width: cellSize * 2 + 1,
                    height: cellSize * 2 + 1,
                    left: macroCol * cellSize * 2,
                    top: macroRow * cellSize * 2,
                    animationDelay: `${(macroRow + macroCol) * 50}ms`,
                  }}
                >
                  <img
                    src="/assets/png/GrassTile.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )}

            {/* MacroCells - 2x2 cells */}
            {Array.from({ length: Math.ceil(gridSize.rows / 2) }).map((_, macroRow) =>
              Array.from({ length: Math.ceil(gridSize.cols / 2) }).map((_, macroCol) => (
                <div
                  key={`macro-${macroRow}-${macroCol}`}
                  className="absolute border border-gray-600/50 hover:bg-white/30 transition-colors"
                  style={{
                    width: cellSize * 2,
                    height: cellSize * 2,
                    left: macroCol * cellSize * 2,
                    top: macroRow * cellSize * 2,
                  }}
                >
                  {/* Subcells */}
                  {Array.from({ length: 2 }).map((_, subRow) =>
                    Array.from({ length: 2 }).map((_, subCol) => {
                      const actualRow = macroRow * 2 + subRow;
                      const actualCol = macroCol * 2 + subCol;
                      return (
                        <div
                          key={`subcell-${macroRow}-${macroCol}-${subRow}-${subCol}`}
                          className="absolute border border-gray-600/30 subcell"
                          style={{
                            width: cellSize,
                            height: cellSize,
                            left: subCol * cellSize,
                            top: subRow * cellSize,
                          }}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoveredCell({ row: actualRow, col: actualCol });
                          }}
                          onMouseLeave={(e) => {
                            e.stopPropagation();
                            if (!e.relatedTarget?.closest('.subcell')) {
                              setHoveredCell(null);
                            }
                          }}
                        />
                      );
                    })
                  )}

                  {/* MacroCell coordinates */}
                  <div className="absolute bottom-1 right-1 text-[0.6rem] text-gray-500/40">
                    {macroRow},{macroCol}
                  </div>
                </div>
              ))
            )}

            {/* Character Layer */}
            <div className="absolute inset-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 