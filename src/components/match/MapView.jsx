import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NODE_TYPES } from "../../constants/mapNodes";
import CharacterSprite from "../CharacterSprite";
import useMapStore from "../../store/mapStore"; // Import the map store
import useCharacterStore from "../../store/characterStore";
import useGameStore from "../../store/gameStore";
import { CHARACTER_CLASSES } from "../../constants/characters";
import { matchService } from "../../services/matchService";
import { toast } from "react-hot-toast";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function MapView() {
  // Store hooks
  const mapData = useMapStore((state) => state.mapData);
  const currentCharacter = useCharacterStore((state) => state.currentCharacter);
  
  // State hooks
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [eventMessage, setEventMessage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Refs
  const containerRef = useRef(null);

  // Derived state
  const characterPosition = mapData?.match?.characterPositions?.find(
    pos => pos.characterId === currentCharacter.id
  )?.position;

  // Add viewport center tracking
  const [viewportCenter, setViewportCenter] = useState({ x: 0, y: 0 });

  // Callback hooks
  const findTargetCell = useCallback((position) => {
    if (!mapData?.grid) return null;
    
    const targetNode = mapData.grid.nodes.find(
      node => node.position.x === position.x && 
              node.position.y === position.y && 
              node.revealed
    );

    const targetPath = mapData.grid.paths.find(
      path => path.position.x === position.x && 
              path.position.y === position.y && 
              path.revealed
    );

    return targetNode || targetPath;
  }, [mapData]);

  const moveToAdjacentCell = useCallback(async (direction) => {
    console.log('moveToAdjacentCell called with direction:', direction);
    console.log('Current position:', characterPosition);
    
    if (!characterPosition || isMoving || !mapData?.match?._id) {
      console.log('Movement blocked:', { 
        noPosition: !characterPosition, 
        isMoving,
        noMatch: !mapData?.match?._id 
      });
      return;
    }

    const newPosition = { ...characterPosition };
    switch (direction) {
      case 'up': newPosition.y -= 1; break;
      case 'down': newPosition.y += 1; break;
      case 'left': newPosition.x -= 1; break;
      case 'right': newPosition.x += 1; break;
      default: return;
    }

    console.log('Attempting to move to:', newPosition);
    const targetCell = findTargetCell(newPosition);
    console.log('Target cell:', targetCell);

    if (targetCell) {
      try {
        setIsMoving(true);
        const response = await matchService.moveCharacter(
          currentCharacter.id,
          mapData.match._id,
          newPosition
        );

        console.log('Move response:', response);

        if (response.success) {
          // Merge the existing map data with the new data
          const updatedMapData = {
            grid: {
              ...response.payload.match.grid,
              nodes: [
                ...mapData.grid.nodes.map(node => ({
                  ...node,
                  completed: response.payload.match.grid.nodes.find(
                    n => n.position.x === node.position.x && n.position.y === node.position.y
                  )?.completed || node.completed
                })),
                ...response.payload.match.grid.nodes.filter(node => 
                  !mapData.grid.nodes.some(
                    n => n.position.x === node.position.x && n.position.y === node.position.y
                  )
                )
              ],
              paths: [
                ...mapData.grid.paths.map(path => ({
                  ...path,
                  completed: response.payload.match.grid.paths.find(
                    p => p.position.x === path.position.x && p.position.y === path.position.y
                  )?.completed || path.completed
                })),
                ...response.payload.match.grid.paths.filter(path => 
                  !mapData.grid.paths.some(
                    p => p.position.x === path.position.x && p.position.y === path.position.y
                  )
                )
              ]
            },
            match: {
              ...response.payload.match,
              grid: undefined // We'll use our merged grid instead
            }
          };

          useMapStore.getState().setMapData(updatedMapData);

          if (response.payload.event) {
            setEventMessage({
              ...response.payload.event,
              position: newPosition
            });
            setTimeout(() => setEventMessage(null), 3000);
          }
        }
      } catch (error) {
        console.error('Move error:', error);
        toast.error(error.message || "Failed to move");
      } finally {
        setIsMoving(false);
      }
    } else {
      console.log('No valid target cell found at position:', newPosition);
    }
  }, [characterPosition, isMoving, currentCharacter?.id, mapData, findTargetCell]);

  const handleCellClick = useCallback(async (cell) => {
    console.log('Cell clicked:', cell);
    if (!cell.revealed || isMoving || !characterPosition) {
      console.log('Click blocked:', { 
        notRevealed: !cell.revealed, 
        isMoving, 
        noPosition: !characterPosition 
      });
      return;
    }

    const dx = cell.position.x - characterPosition.x;
    const dy = cell.position.y - characterPosition.y;
    
    if (Math.abs(dx) + Math.abs(dy) !== 1) {
      console.log('Not adjacent:', { dx, dy });
      toast.error("You can only move to adjacent cells!");
      return;
    }

    let direction;
    if (dx === 1) direction = 'right';
    else if (dx === -1) direction = 'left';
    else if (dy === 1) direction = 'down';
    else if (dy === -1) direction = 'up';

    console.log('Moving in direction:', direction);
    await moveToAdjacentCell(direction);
  }, [characterPosition, isMoving, moveToAdjacentCell]);

  // Effect hooks
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          moveToAdjacentCell('up');
          break;
        case 's':
        case 'arrowdown':
          moveToAdjacentCell('down');
          break;
        case 'a':
        case 'arrowleft':
          moveToAdjacentCell('left');
          break;
        case 'd':
        case 'arrowright':
          moveToAdjacentCell('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveToAdjacentCell]);

  const centerOnStart = useCallback(() => {
    if (!mapData?.grid || !containerRef.current) return;

    const startNode = mapData.grid.nodes.find((node) => node.type === "START");
    if (!startNode) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Convert rem to pixels (assuming 1rem = 16px)
    const remToPx = 16;
    const gridCellSize = 6 * remToPx; // 6rem in pixels

    // Calculate the position that will center the node
    // We multiply the node position by gridCellSize to get its pixel position
    const nodePixelX = startNode.position.x * gridCellSize;
    const nodePixelY = startNode.position.y * gridCellSize;

    // Center the node by taking half of the container size and subtracting the scaled node position
    const centerX = (containerWidth / 2) - (nodePixelX * scale);
    const centerY = (containerHeight / 2) - (nodePixelY * scale);

    setPosition({
      x: centerX,
      y: centerY
    });
  }, [mapData, scale]);

  // Replace the wheel effect with useLayoutEffect
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 0.1;
      const direction = e.deltaY > 0 ? -1 : 1;
      
      // Get mouse position relative to container
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate new scale
      const newScale = Math.min(
        Math.max(scale * (1 + direction * zoomFactor), MIN_SCALE),
        MAX_SCALE
      );

      // Calculate how much the content will change in size
      const scaleDiff = newScale - scale;
      
      // Adjust position to zoom towards cursor
      setPosition(prev => ({
        x: prev.x - (mouseX - prev.x) * (scaleDiff / scale),
        y: prev.y - (mouseY - prev.y) * (scaleDiff / scale),
      }));
      
      setScale(newScale);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [containerRef.current, scale]); // Added scale as dependency

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition((prev) => ({
          x: prev.x + (e.clientX - dragStart.x),
          y: prev.y + (e.clientY - dragStart.y),
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Center on start node initially and handle spacebar
  useEffect(() => {
    centerOnStart();

    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        centerOnStart();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [centerOnStart]);

  // Update viewport center when character moves
  useEffect(() => {
    if (characterPosition && containerRef.current) {
      const cellSize = 6; // size in rem
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      // Convert rem to pixels for calculations
      const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const cellSizePx = cellSize * remToPx;

      // Calculate center position
      const newCenter = {
        x: (containerWidth / 2) - (characterPosition.x * cellSizePx),
        y: (containerHeight / 2) - (characterPosition.y * cellSizePx)
      };

      setViewportCenter(newCenter);
      setPosition(newCenter);
    }
  }, [characterPosition]);

  const getColorMap = () => {
    if (!currentCharacter?.customization?.colors) return {};

    const selectedClass = CHARACTER_CLASSES.find(
      (c) => c.id === currentCharacter.class
    );
    if (!selectedClass?.spritesheet?.baseColors) return {};

    const colorMap = {};
    Object.entries(currentCharacter.customization.colors).forEach(([part, colors]) => {
      if (colors && colors.length > 0) {
        const baseColors = selectedClass.spritesheet.baseColors[part] || [];
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = colors[index] || baseColor;
        });
      }
    });

    return colorMap;
  };

  if (!mapData?.grid) {
    return <div>Loading map...</div>; // Handle loading state
  }

  const getNodeDisplay = (nodeType) => {
    return (
      NODE_TYPES[nodeType] || {
        icon: "?",
        label: "Unknown Node",
        color: "gray",
      }
    );
  };

  const renderNode = (node) => {
    if (!node.revealed) return null;

    const nodeDisplay = getNodeDisplay(node.type || 'EMPTY');
    const isCurrentPosition = characterPosition && 
      node.position.x === characterPosition.x && 
      node.position.y === characterPosition.y;

    return (
      <motion.div
        key={`node-${node.position.x}-${node.position.y}`}
        className={`absolute w-[7rem] h-[7rem] -ml-2 -mt-2
          ${node.completed ? 'bg-[#1A1A1A] text-gray-500' : 'bg-[#2A2A2A] text-white'}
          rounded-lg shadow-lg 
          ${isCurrentPosition ? 'border-blue-600 border-2' : 
            !node.completed ? 'border border-white/20' : 'border-none'}
          flex items-center justify-center cursor-pointer
          hover:bg-[#353535] transition-all duration-200`}
        style={{
          left: `${node.position.x * 6}rem`,
          top: `${node.position.y * 6}rem`,
          zIndex: 10,
        }}
        onClick={() => handleCellClick(node)}
        onMouseEnter={() => setHoveredNode(node)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <div className="relative w-full h-full flex items-center justify-center text-5xl">
          {nodeDisplay.icon}
        </div>
      </motion.div>
    );
  };

  const renderPath = (path) => {
    if (!path.revealed) return null;

    const pathDisplay = getNodeDisplay(path.type || 'EMPTY');
    const isCurrentPosition = characterPosition && 
      path.position.x === characterPosition.x && 
      path.position.y === characterPosition.y;

    return (
      <motion.div
        key={`path-${path.position.x}-${path.position.y}`}
        className={`absolute w-[6rem] h-[6rem]
          ${path.completed ? 'bg-[#151515] text-gray-500' : 'bg-[#1A1A1A] text-white'}
          ${isCurrentPosition ? 'border-blue-600 border-2' : 
            !path.completed ? 'border border-white/20' : 'border-none'}
          flex items-center justify-center cursor-pointer
          hover:bg-[#252525] transition-all duration-200`}
        style={{
          left: `${path.position.x * 6}rem`,
          top: `${path.position.y * 6}rem`,
          zIndex: 5,
        }}
        onClick={() => handleCellClick(path)}
        onMouseEnter={() => setHoveredNode(path)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {pathDisplay.icon}
      </motion.div>
    );
  };

  // Render character separately to appear on both nodes and paths
  const renderCharacter = () => {
    if (!characterPosition) return null;

    return (
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          left: `${characterPosition.x * 6}rem`,
          top: `${characterPosition.y * 6}rem`,
          width: '6rem',
          height: '6rem',
          zIndex: 20,
        }}
      >
        <CharacterSprite
          characterId={currentCharacter.class}
          action={isMoving ? "walk" : "idle"}
          size="5rem"
          colorMap={getColorMap()}
        />
      </motion.div>
    );
  };

  // Update the arrow controls render
  const renderArrowControls = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-2">
      <div className="col-start-2">
        <button
          onClick={() => moveToAdjacentCell('up')}
          className="w-12 h-12 bg-black/80 rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
        >
          <FaArrowUp className="text-white text-2xl" />
        </button>
      </div>
      <div className="col-start-1">
        <button
          onClick={() => moveToAdjacentCell('left')}
          className="w-12 h-12 bg-black/80 rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
        >
          <FaArrowLeft className="text-white text-2xl" />
        </button>
      </div>
      <div className="col-start-2">
        <button
          onClick={() => moveToAdjacentCell('down')}
          className="w-12 h-12 bg-black/80 rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
        >
          <FaArrowDown className="text-white text-2xl" />
        </button>
      </div>
      <div className="col-start-3">
        <button
          onClick={() => moveToAdjacentCell('right')}
          className="w-12 h-12 bg-black/80 rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-[98.5vw] h-[80vh] mb-8 bg-[#121212] bg-opacity-80 overflow-hidden relative rounded-lg">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute origin-center"
          style={{
            scale,
            x: position.x,
            y: position.y,
          }}
          animate={{
            x: viewportCenter.x,
            y: viewportCenter.y,
            transition: { type: "spring", stiffness: 100, damping: 20 }
          }}
        >
          <div className="relative">
            {mapData?.grid?.paths?.map(renderPath)}
            {mapData?.grid?.nodes?.map(renderNode)}
            {renderCharacter()}
          </div>
        </motion.div>
      </div>

      {/* Event Message at the top */}
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
