import { memo, useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMapStore, {
  selectGridNodes,
  selectGridPaths,
  selectCharacterPosition,
} from "../../store/mapStore";
import useCharacterStore from "../../store/characterStore";
import { matchService } from "../../services/matchService";
import { NODE_TYPES } from "../../constants/mapNodes";
import CharacterSprite from "../CharacterSprite";
import { CHARACTER_CLASSES } from "../../constants/characters";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

// Memoized cell components
const GridNode = memo(({ node, onCellClick, isCurrentPosition, onHover }) => {
  const nodeDisplay = NODE_TYPES[node.type] || {
    icon: "?",
    label: "Unknown Node",
    color: "gray",
  };

  if (!node.revealed) return null;

  return (
    <motion.div
      className={`absolute w-[7rem] h-[7rem] -ml-2 -mt-2
        ${node.completed ? "bg-[#1A1A1A] text-gray-500" : "bg-[#2A2A2A] text-white"}
        rounded-lg shadow-lg 
        ${
          isCurrentPosition
            ? "border-2 border-blue-600"
            : node.completed
            ? "border-[0.2rem] border-[#4a4a4a]"
            : "border-4 border-white/70"
        }
        flex items-center justify-center cursor-pointer
        hover:bg-[#353535] transition-all duration-200`}
      style={{
        left: `${node.position.x * 6}rem`,
        top: `${node.position.y * 6}rem`,
        zIndex: 10,
      }}
      onClick={() => onCellClick(node)}
      onMouseEnter={() => onHover(node)}
      onMouseLeave={() => onHover(null)}
      layoutId={`node-${node.position.x}-${node.position.y}`}
    >
      <div className="relative w-full h-full flex items-center justify-center text-5xl">
        {nodeDisplay.icon}
      </div>
    </motion.div>
  );
});

const GridPath = memo(({ path, onCellClick, isCurrentPosition, onHover }) => {
  if (!path.revealed) return null;

  return (
    <motion.div
      className={`absolute w-[6rem] h-[6rem]
        ${path.completed ? "bg-[#151515] text-gray-500" : "bg-[#1A1A1A] text-white"}
        ${
          isCurrentPosition
            ? "border-2 border-blue-600"
            : path.completed
            ? "border-2 border-[#4a4a4a]"
            : "border-2 border-white/70"
        }
        flex items-center justify-center cursor-pointer
        hover:bg-[#252525] transition-all duration-200`}
      style={{
        left: `${path.position.x * 6}rem`,
        top: `${path.position.y * 6}rem`,
        zIndex: 5,
      }}
      onClick={() => onCellClick(path)}
      onMouseEnter={() => onHover(path)}
      onMouseLeave={() => onHover(null)}
      layoutId={`path-${path.position.x}-${path.position.y}`}
    />
  );
});

const Character = memo(({ position, character, isMoving }) => {
  const getColorMap = () => {
    if (!character?.customization?.colors) return {};

    const selectedClass = CHARACTER_CLASSES.find((c) => c.id === character.class);
    if (!selectedClass?.spritesheet?.baseColors) return {};

    const colorMap = {};
    Object.entries(character.customization.colors).forEach(([part, colors]) => {
      if (colors && colors.length > 0) {
        const baseColors = selectedClass.spritesheet.baseColors[part] || [];
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = colors[index] || baseColor;
        });
      }
    });

    return colorMap;
  };

  return (
    <motion.div
      className="absolute flex items-center justify-center scale-[300%]"
      style={{
        left: `${position.x * 6}rem`,
        top: `${position.y * 6}rem`,
        width: "6rem",
        height: "6rem",
        zIndex: 20,
      }}
    >
      <div className="">😃</div>
    </motion.div>
  );
});

export default function MapView() {
  // Store selectors
  const gridNodes = useMapStore(selectGridNodes);
  const gridPaths = useMapStore(selectGridPaths);
  const characterPosition = useMapStore(selectCharacterPosition);
  const mapData = useMapStore((state) => state.mapData);
  const currentCharacter = useCharacterStore((state) => state.currentCharacter);

  // State
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [eventMessage, setEventMessage] = useState(null);
  const [scale, setScale] = useState(0.7);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Refs
  const containerRef = useRef(null);

  // Add a ref to track the last character position for camera follow
  const lastCharacterPosition = useRef(null);

  const handleCellClick = useCallback(
    async (cell) => {
      if (!cell.revealed || isMoving || !characterPosition) return;

      const dx = cell.position.x - characterPosition.x;
      const dy = cell.position.y - characterPosition.y;

      if (Math.abs(dx) + Math.abs(dy) !== 1) {
        toast.error("You can only move to adjacent cells!");
        return;
      }

      try {
        setIsMoving(true);
        const response = await matchService.moveCharacter(
          currentCharacter.id,
          mapData.match._id,
          cell.position
        );

        if (response.success) {
          useMapStore.getState().setMapData({
            ...mapData,
            grid: response.payload.match.grid,
            match: {
              ...response.payload.match,
              characterPositions: response.payload.match.characterPositions,
            },
          });

          if (response.payload.event) {
            setEventMessage({
              ...response.payload.event,
              position: cell.position,
            });
            setTimeout(() => setEventMessage(null), 3000);
          }
        }
      } catch (error) {
        console.error("Move error:", error);
        toast.error(error.message || "Failed to move");
      } finally {
        setIsMoving(false);
      }
    },
    [characterPosition, isMoving, currentCharacter?.id, mapData]
  );

  const moveToAdjacentCell = useCallback(
    async (direction) => {
      if (!characterPosition || isMoving || !mapData?.match?._id) return;

      const newPosition = { ...characterPosition };
      switch (direction) {
        case "up":
          newPosition.y -= 1;
          break;
        case "down":
          newPosition.y += 1;
          break;
        case "left":
          newPosition.x -= 1;
          break;
        case "right":
          newPosition.x += 1;
          break;
        default:
          return;
      }

      const targetCell =
        Object.values(gridNodes).find(
          (node) =>
            node.position.x === newPosition.x &&
            node.position.y === newPosition.y &&
            node.revealed
        ) ||
        Object.values(gridPaths).find(
          (path) =>
            path.position.x === newPosition.x &&
            path.position.y === newPosition.y &&
            path.revealed
        );

      if (targetCell) {
        await handleCellClick(targetCell);
      }
    },
    [characterPosition, isMoving, mapData, gridNodes, gridPaths, handleCellClick]
  );

  // Add keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          moveToAdjacentCell("up");
          break;
        case "s":
        case "arrowdown":
          moveToAdjacentCell("down");
          break;
        case "a":
        case "arrowleft":
          moveToAdjacentCell("left");
          break;
        case "d":
        case "arrowright":
          moveToAdjacentCell("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [moveToAdjacentCell]);

  // Add zoom and pan functionality
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 0.05; // Reduced from 0.1 for smoother zoom
      const direction = e.deltaY > 0 ? -1 : 1;

      // Get mouse position relative to container
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate new scale with smooth transition
      const newScale = Math.min(
        Math.max(scale * (1 + direction * zoomFactor), MIN_SCALE),
        MAX_SCALE
      );

      // Calculate how much the content will change in size
      const scaleDiff = newScale - scale;

      // Adjust position to zoom towards cursor with smooth transition
      setPosition((prev) => ({
        x: prev.x - (mouseX - prev.x) * (scaleDiff / scale),
        y: prev.y - (mouseY - prev.y) * (scaleDiff / scale),
      }));

      setScale(newScale);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [scale]);

  // Camera follow effect - only trigger when character position changes
  useEffect(() => {
    if (!characterPosition || isDragging) return;

    // Check if character actually moved
    const hasPositionChanged =
      !lastCharacterPosition.current ||
      lastCharacterPosition.current.x !== characterPosition.x ||
      lastCharacterPosition.current.y !== characterPosition.y;

    if (hasPositionChanged && containerRef.current) {
      const container = containerRef.current;
      const cellSize = 6; // size in rem
      const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const cellSizePx = cellSize * remToPx;

      // Calculate center position
      const centerX = container.clientWidth / 2 - characterPosition.x * cellSizePx * scale;
      const centerY = container.clientHeight / 2 - characterPosition.y * cellSizePx * scale;

      // Update position directly instead of viewport center during movement
      setPosition({ x: centerX, y: centerY });

      // Update last known position
      lastCharacterPosition.current = characterPosition;
    }
  }, [characterPosition, scale]);

  // Handle dragging with proper event handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        setPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        setDragStart({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const renderArrowControls = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-2">
      <div className="col-start-2">
        <button
          onClick={() => moveToAdjacentCell("up")}
          className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-gray-700/90 transition-colors"
        >
          <FaArrowUp className="text-white text-2xl" />
        </button>
      </div>
      <div className="col-start-1">
        <button
          onClick={() => moveToAdjacentCell("left")}
          className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-gray-700/90 transition-colors"
        >
          <FaArrowLeft className="text-white text-2xl" />
        </button>
      </div>
      <div className="col-start-2">
        <button
          onClick={() => moveToAdjacentCell("down")}
          className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-gray-700/90 transition-colors"
        >
          <FaArrowDown className="text-white text-2xl" />
        </button>
      </div>
      <div className="col-start-3">
        <button
          onClick={() => moveToAdjacentCell("right")}
          className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-gray-700/90 transition-colors"
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );

  const isCurrentPosition = useCallback(
    (pos) => {
      return (
        characterPosition && pos.x === characterPosition.x && pos.y === characterPosition.y
      );
    },
    [characterPosition]
  );

  return (
    <div className="w-[98.5vw] h-[80vh] mb-8 bg-[#121212] bg-opacity-80 overflow-hidden relative rounded-lg">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="absolute origin-center"
          style={{
            scale,
            x: position.x,
            y: position.y,
          }}
          animate={{
            x: position.x,
            y: position.y,
            scale,
            transition: {
              type: "tween",
              duration: 0.01,
              ease: "linear",
            },
          }}
        >
          <div className="relative">
            {Object.values(gridPaths).map((path) => (
              <GridPath
                key={`${path.position.x},${path.position.y}`}
                path={path}
                onCellClick={handleCellClick}
                isCurrentPosition={isCurrentPosition(path.position)}
                onHover={setHoveredNode}
              />
            ))}
            {Object.values(gridNodes).map((node) => (
              <GridNode
                key={`${node.position.x},${node.position.y}`}
                node={node}
                onCellClick={handleCellClick}
                isCurrentPosition={isCurrentPosition(node.position)}
                onHover={setHoveredNode}
              />
            ))}
            {characterPosition && (
              <Character
                position={characterPosition}
                character={currentCharacter}
                isMoving={isMoving}
              />
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {eventMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 
                     p-4 bg-black/90 text-white rounded-lg border border-white/20
                     max-w-md"
          >
            <h3 className="font-bold mb-2">{eventMessage.type}</h3>
            <p>{eventMessage.description}</p>
            {eventMessage.rewards && (
              <p className="text-green-400 mt-2">{eventMessage.rewards}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {renderArrowControls()}
    </div>
  );
}
