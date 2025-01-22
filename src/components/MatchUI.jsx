import { useEffect, useRef, useState } from "react";
import useGameStore from "../store/gameStore";
import { CHARACTERS } from "../constants/characters";
import CharacterSprite from "./CharacterSprite";
import StatCard from "./StatCard";

export default function MatchUI() {
  const { matchData, userData, logout } = useGameStore();
  const gridRef = useRef(null);
  const containerRef = useRef(null);
  const [cellSize, setCellSize] = useState(100);
  const [showGrass, setShowGrass] = useState(true);
  const [spriteStyle, setSpriteStyle] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setMounted(true);
  }, []);

  // Helper function to get character info
  const getCharacterInfo = (characterId) => {
    return CHARACTERS.find((char) => char.id === characterId) || { name: "", icon: "👤" };
  };

  // Updated helper function to get cell occupation
  const getCellOccupant = (row, col, activeCells) => {
    if (!Array.isArray(activeCells)) return null;

    return (
      activeCells.find((cell) => cell?.position?.row === row && cell?.position?.col === col)
        ?.occupiedBy || null
    );
  };

  // Helper function to get player's full occupied area
  const getPlayerAtPosition = (row, col, players) => {
    if (!players) return null;

    return players.find((player) => {
      const baseRow = player.position.row;
      const baseCol = player.position.col;
      const { width, height } = player.size;

      return (
        row >= baseRow && row < baseRow + height && col >= baseCol && col < baseCol + width
      );
    });
  };

  useEffect(() => {
    if (!matchData) return;

    const { rows } = matchData.dimensions || { rows: 5 };

    const updateCellSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxWidth = (container.clientWidth - 48);
        const maxHeight = (window.innerHeight * 0.8) - 120;
        const maxCellSize = Math.floor(
          Math.min(maxWidth / rows, maxHeight / rows)
        );
        setCellSize(maxCellSize * 1.15);
      }
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [matchData]);

  if (!matchData) return null;

  const { dimensions, players, activeCells = [] } = matchData;
  const { rows, cols } = dimensions || { rows: 5, cols: 5 };
  const gridWidth = cols * cellSize;
  const gridHeight = rows * cellSize;

  return (
    <div className="absolute inset-0 flex flex-col mt-16 items-center p-4">
      {/* Header */}
      <div className="max-w-5xl w-full flex items-center justify-between mb-6">
        <h1 className="text-5xl font-bold text-emerald-400">NeoTurn</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setSpriteStyle((prev) => (prev === 1 ? 2 : 1))}
            className="text-emerald-400 hover:text-white bg-gray-800/30 hover:bg-emerald-500 rounded-lg border border-gray-700/30 py-2 p-4"
          >
            Sprite Style {spriteStyle}
          </button>
          <button
            onClick={() => setShowGrass((prev) => !prev)}
            className="text-emerald-400 hover:text-white bg-gray-800/30 hover:bg-emerald-500 rounded-lg border border-gray-700/30 py-2 p-4"
          >
            {showGrass ? "Hide" : "Show"} Grass
          </button>
          <button
            onClick={logout}
            className="text-[#ff3c3c] hover:text-white bg-gray-800/30 hover:bg-[#ff3c3c] rounded-lg border border-gray-700/30 py-2 p-4"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Match Content */}
      <div ref={containerRef} className="max-w-5xl w-full h-[80vh] relative">
        {/* Stat Cards */}
        <div className="absolute -left-[23rem] top-0 h-fit">
          <StatCard 
            player={{
              name: userData.name,
              character: getCharacterInfo(userData.character),
              stats: {
                health: 100,
                stamina: 80,
                mana: 60
              }
            }}
          />
        </div>
        <div className="absolute -right-[23rem] top-0 h-fit">
          <StatCard 
            player={{
              name: matchData?.players?.find(p => p.userId !== userData.id)?.name,
              character: getCharacterInfo(matchData?.players?.find(p => p.userId !== userData.id)?.character),
              stats: {
                health: 100,
                stamina: 70,
                mana: 90
              }
            }}
            isEnemy
          />
        </div>

        {/* Existing game grid container */}
        <div className="bg-gray-800/30 rounded-lg border border-gray-700/30 p-6 h-full flex flex-col">
          {/* Grid Container - added flex-1 to take remaining space */}
          <div className="flex justify-center items-center flex-1">
            <div
              ref={gridRef}
              className="relative"
              style={{
                width: gridWidth,
                height: gridHeight,
                transform: `scaleX(${userData.id === players?.[1]?.userId ? -1 : 1})`
              }}
            >
              {/* Grass Tiles Layer */}
              {showGrass &&
                Array.from({ length: Math.ceil(rows / 2) }).map((_, macroRow) =>
                  Array.from({ length: Math.ceil(cols / 2) }).map((_, macroCol) => (
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

              {/* Macrocells and Cells */}
              {Array.from({ length: Math.ceil(rows / 2) }).map((_, macroRow) =>
                Array.from({ length: Math.ceil(cols / 2) }).map((_, macroCol) => (
                  <div
                    key={`macro-${macroRow}-${macroCol}`}
                    className={`absolute border hover:bg-white/30 transition-colors ${
                      showGrass ? "border-gray-600/50" : "border-emerald-500"
                    }`}
                    style={{
                      width: cellSize * 2,
                      height: cellSize * 2,
                      left: macroCol * cellSize * 2,
                      top: macroRow * cellSize * 2,
                    }}
                  >
                    {/* Regular Cells */}
                    {Array.from({ length: 2 }).map((_, cellRow) =>
                      Array.from({ length: 2 }).map((_, cellCol) => {
                        const actualRow = macroRow * 2 + cellRow;
                        const actualCol = macroCol * 2 + cellCol;
                        const playerOccupying = getPlayerAtPosition(
                          actualRow,
                          actualCol,
                          players
                        );
                        const isLocalPlayer = playerOccupying?.userId === userData.id;

                        // Only render the PlayerCell if this is the base position
                        if (
                          playerOccupying &&
                          playerOccupying.position.row === actualRow &&
                          playerOccupying.position.col === actualCol
                        ) {
                          return (
                            <div
                              key={`player-${actualRow}-${actualCol}`}
                              className={`absolute ${
                                isLocalPlayer
                                  ? "bg-blue-500/30 border-2 border-blue-500/50"
                                  : "bg-red-500/30 border-2 border-red-500/50"
                              }`}
                              style={{
                                width: cellSize * playerOccupying.size.width,
                                height: cellSize * playerOccupying.size.height,
                                left: cellCol * cellSize,
                                top: cellRow * cellSize,
                                zIndex: 1,
                              }}
                            >
                              {/* Player sprite centered in the PlayerCell */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                {spriteStyle === 1 && (
                                  <div className="absolute top-0 left-0 right-0 flex flex-col items-center z-[11]">
                                    {/* <span 
                                      className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                                      style={{
                                        fontSize: `${cellSize * 0.016}rem`
                                      }}
                                    >
                                      {playerOccupying.name || "Unknown"}
                                    </span> */}

                                    <div 
                                      className="bg-black/40 border border-gray-700/30 rounded-sm p-[0.2rem] mt-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] z-[11]"
                                      style={{
                                        width: `${cellSize * 0.1}rem`,
                                        transform: `scaleX(${
                                          userData.id === players?.[1]?.userId 
                                            ? -1  // Counter the grid flip for player 2
                                            : 1   // Normal behavior for player 1
                                        })`
                                      }}
                                    >
                                      <div 
                                        className="bg-black/30 rounded-[0.125rem]"
                                        style={{
                                          height: `${cellSize * 0.005}rem`
                                        }}
                                      >
                                        <div
                                          className="h-full bg-red-500 rounded-[0.125rem]"
                                          style={{ width: "70%" }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-center drop-shadow-[0_20px_8px_rgba(0,0,0,0.7)]" style={{
                                  transform: `scaleX(${
                                    userData.id === players?.[1]?.userId 
                                      ? (isLocalPlayer ? -1 : 1)  // Counter the grid flip for player 2
                                      : (isLocalPlayer ? 1 : -1)  // Normal behavior for player 1
                                  })`
                                }}>
                                  <CharacterSprite
                                    character={getCharacterInfo(playerOccupying.character)}
                                    size={cellSize * 2}
                                    scale={spriteStyle === 1 ? 1.2 : 1.6}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Regular cell rendering
                        return (
                          <div
                            key={`${actualRow}-${actualCol}`}
                            className={`absolute border ${
                              showGrass ? "border-gray-600/30" : "border-emerald-500/10"
                            }`}
                            style={{
                              width: cellSize,
                              height: cellSize,
                              left: cellCol * cellSize,
                              top: cellRow * cellSize,
                            }}
                          />
                        );
                      })
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
