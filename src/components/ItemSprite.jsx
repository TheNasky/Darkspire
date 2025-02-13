import { useEffect, useState } from 'react';

export default function ItemSprite({ 
  spritesheet = '/assets/Items/Weapons and Equipment/Raven.png',
  row = 0,
  col = 0,
  size = '3rem',
  opacity = 1,
  isIcon = false
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
        backgroundPosition: isIcon ? 'center' : `-${col * 64}px -${row * 64}px`,
        backgroundSize: isIcon ? 'contain' : '1024px 1024px',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        opacity
      }}
    />
  );
} 