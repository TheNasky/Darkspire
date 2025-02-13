import { useEffect, useState } from 'react';

export default function ItemSprite({ 
  spritesheet = '/assets/Weapons and Equipment/Raven.png',
  row = 0,
  col = 0,
  size = '3rem',
  opacity = 1
}) {
  const [spritesheetImage, setSpritesheetImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = spritesheet;
    img.onload = () => setSpritesheetImage(img);
  }, [spritesheet]);

  if (!spritesheetImage) return null;

  return (
    <div 
      className="w-full h-full"
      style={{
        backgroundImage: `url(${spritesheetImage.src})`,
        backgroundPosition: `-${col * 64}px -${row * 64}px`,
        backgroundSize: '1024px 1024px',
        imageRendering: 'pixelated',
        opacity
      }}
    />
  );
} 