import Phaser from "phaser";

export default class MainMenuBackground extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuBackground" });
  }

  preload() {
    // Add loading error handler
    this.load.on('loaderror', (fileObj) => {
      console.error('Error loading asset:', fileObj.src);
    });
    // Load layers from farthest to closest
    const layers = [
      { key: 'sky', path: '/assets/background/MoonMountains/sky.png' },
      { key: 'far-clouds', path: '/assets/background/MoonMountains/far-clouds.png' },
      { key: 'near-clouds', path: '/assets/background/MoonMountains/near-clouds.png' },
      { key: 'far-mountains', path: '/assets/background/MoonMountains/far-mountains.png' },
      { key: 'mountains', path: '/assets/background/MoonMountains/mountains.png' },
      { key: 'trees', path: '/assets/background/MoonMountains/trees.png' }
    ];

    layers.forEach(({ key, path }) => {
      this.load.image(key, path);
    });
  }

  create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    // Get reference dimensions from the sky texture
    const skyTexture = this.textures.get('sky');
    const baseWidth = skyTexture.source[0].width;
    const baseHeight = skyTexture.source[0].height;

    // Calculate base scale that maintains aspect ratio
    const widthScale = screenWidth / baseWidth;
    const heightScale = screenHeight / baseHeight;
    const baseScale = Math.max(widthScale, heightScale);

    // Base vertical offset
    const baseYOffset = -screenHeight * 0.2;

    const layers = [
      { key: 'sky', speed: 0.0, yOffsetMod: 0.1 },
      { key: 'far-clouds', speed: 0.1, yOffsetMod: 0.07 },
      { key: 'near-clouds', speed: 0.2, yOffsetMod: 0.06 },
      { key: 'far-mountains', speed: 0.3, yOffsetMod: 0.05 }, // Move up a bit
      { key: 'mountains', speed: 0.55, yOffsetMod: 0 }, // Move down
      { key: 'trees', speed: 1.1, yOffsetMod: -0.05 } // Move up more
    ];

    this.parallaxLayers = layers.map(({ key, speed, yOffsetMod }) => {
      const yOffset = baseYOffset + (screenHeight * yOffsetMod);
      
      const sprite = this.add.tileSprite(
        0,
        yOffset,
        baseWidth,
        baseHeight,
        key
      )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(baseScale);

      // Set nearest-neighbor filtering for this sprite
      sprite.setTexture(key, undefined, { pixelArt: true });
      
      return { sprite, speed, yOffsetMod };
    });

    // Handle window resize
    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      this.scale.resize(newWidth, newHeight);
      
      const newWidthScale = newWidth / baseWidth;
      const newHeightScale = newHeight / baseHeight;
      const newScale = Math.max(newWidthScale, newHeightScale);
      
      const newBaseYOffset = -newHeight * 0.2;
      
      this.parallaxLayers.forEach(({ sprite, yOffsetMod }) => {
        const newYOffset = newBaseYOffset + (newHeight * yOffsetMod);
        sprite.setScale(newScale);
        sprite.y = newYOffset;
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('fullscreenchange', resize);
    
    this.events.on('shutdown', () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('fullscreenchange', resize);
    });
  }

  update() {
    // Update each layer's position at its designated speed
    this.parallaxLayers.forEach(({ sprite, speed }) => {
      sprite.tilePositionX += speed;
    });
  }
} 