import { useEffect, useState, useRef } from "react";
import { getClassById } from "../constants/characters";

// Global sprite cache
const globalSpriteCache = {};
const loadingPromises = {};

export default function CharacterSprite({ 
  characterId,
  action = "idle", 
  size = "32px", 
  scale = 1, 
  colorMap = {},
  isDisabled = false
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationRef = useRef(null);
  const [spritesheet, setSpritesheet] = useState(null);
  const [debug, setDebug] = useState({ loading: true, error: null });

  // Size calculation from original component
  const getRealPixels = (remSize) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = window.innerWidth <= 1024;
    const adjustedRemSize = isMobile ? remSize / 2.2 : remSize;
    return adjustedRemSize * rootFontSize;
  };

  const pixelSize = typeof size === 'string' && size.endsWith('rem')
    ? getRealPixels(parseFloat(size))
    : parseFloat(size);
  
  const containerSize = `${pixelSize}px`;

  const loadSpritesheet = () => {
    const character = getClassById(characterId);
    if (!character?.spritesheet) return;

    const img = new Image();
    img.onload = () => {
      if (Object.keys(colorMap).length > 0) {
        setSpritesheet(applyColorMap(img, colorMap));
      } else {
        setSpritesheet(img);
      }
      setDebug(prev => ({ ...prev, loading: false }));
    };
    img.onerror = () => {
      setDebug(prev => ({ ...prev, loading: false, error: 'Failed to load spritesheet' }));
    };
    img.src = character.spritesheet.path;
  };

  const applyColorMap = (image, hexColorMap) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert hex color map to RGB
    const rgbColorMap = {};
    Object.entries(hexColorMap).forEach(([origHex, newHex]) => {
      try {
        // Handle both string and array values
        const origClean = String(origHex).replace('#', '');
        const newClean = Array.isArray(newHex) ? newHex[0] : String(newHex).replace('#', '');
        
        const origR = parseInt(origClean.slice(0, 2), 16);
        const origG = parseInt(origClean.slice(2, 4), 16);
        const origB = parseInt(origClean.slice(4, 6), 16);
        const newR = parseInt(newClean.slice(0, 2), 16);
        const newG = parseInt(newClean.slice(2, 4), 16);
        const newB = parseInt(newClean.slice(4, 6), 16);

        if (!isNaN(origR) && !isNaN(origG) && !isNaN(origB) &&
            !isNaN(newR) && !isNaN(newG) && !isNaN(newB)) {
          rgbColorMap[`${origR},${origG},${origB}`] = [newR, newG, newB];
        }
      } catch (error) {
        console.warn('Invalid color value:', origHex, newHex);
      }
    });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      if (a > 0) {
        const key = `${r},${g},${b}`;
        if (rgbColorMap[key]) {
          const [newR, newG, newB] = rgbColorMap[key];
          data[i] = newR;
          data[i + 1] = newG;
          data[i + 2] = newB;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };

  const animate = () => {
    if (isDisabled) return;

    const character = getClassById(characterId);
    if (!character?.spritesheet?.animations[action]) return;

    const frameCount = character.spritesheet.animations[action].frameCount;
    setCurrentFrame(prev => (prev + 1) % frameCount);
  };

  useEffect(() => {
    setDebug(prev => ({ ...prev, loading: true }));
    loadSpritesheet();
  }, [characterId, JSON.stringify(colorMap)]);

  useEffect(() => {
    const character = getClassById(characterId);
    if (!character?.spritesheet?.animations[action]) return;

    if (isDisabled) {
      setCurrentFrame(0);
      return;
    }

    const frameRate = character.spritesheet.animations[action].frameRate;
    const intervalId = setInterval(animate, 1000 / frameRate);

    return () => clearInterval(intervalId);
  }, [characterId, action, isDisabled]);

  if (debug.loading) return <div className="text-white"></div>;
  if (debug.error) return <div className="text-red-500">Error: {debug.error}</div>;

  const character = getClassById(characterId);
  const spriteScale = (pixelSize / 32) * scale * (character.spritesheet?.animations[action]?.scale || 1);

  return (
    <div 
      style={{ 
        width: containerSize,
        height: containerSize,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      className="drop-shadow-[0_10px_4px_rgba(0,0,0,0.7)]"
    >
      <div
        style={{ 
          width: '32px',
          height: '32px',
          imageRendering: 'pixelated',
          transform: `scale(${spriteScale})`,
          transformOrigin: '50% 100%',
          position: 'absolute',
          bottom: '20%',
          margin: 'auto',
          maxWidth: 'none',
          backgroundImage: spritesheet ? 
            `url(${spritesheet.toDataURL ? spritesheet.toDataURL() : spritesheet.src})` : 
            'none',
          backgroundPositionX: `-${currentFrame * 32}px`,
          backgroundPositionY: `-${character.spritesheet.animations[action].row * 32}px`
        }}
      />
    </div>
  );
}
