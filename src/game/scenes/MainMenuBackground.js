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
      console.log('Loading:', path);
      this.load.image(key, path);
    });
  }

  create() {
    const scaleY = this.cameras.main.height;
    const displayWidth = this.cameras.main.width;
    
    const layers = [
      { key: 'sky', speed: 0.02 },
      { key: 'far-clouds', speed: 0.1 },
      { key: 'near-clouds', speed: 0.2 },
      { key: 'far-mountains', speed: 0.3 },
      { key: 'mountains', speed: 0.55 },
      { key: 'trees', speed: 0.85 }
    ];

    this.parallaxLayers = layers.map(({ key, speed }) => {
      const sprite = this.add.tileSprite(
        0,
        0,
        240,
        240,
        key
      )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(scaleY)
        .setDisplaySize(displayWidth, this.cameras.main.height);
      
      return { sprite, speed };
    });

    // Handle window resize
    const resize = () => {
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;
      
      // Update game scale
      this.scale.resize(newWidth, newHeight);
      
      // Update each layer
      this.parallaxLayers.forEach(({ sprite }) => {
        const newScaleY = newHeight / 240;
        sprite.setScale(newScaleY)
          .setDisplaySize(newWidth, newHeight);
        sprite.x = 0;
        sprite.y = 0;
      });
    };

    // Listen for both resize and fullscreenchange events
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