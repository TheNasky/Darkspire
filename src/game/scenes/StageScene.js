import Phaser from 'phaser';

export default class StageScene extends Phaser.Scene {
  constructor(config = {}) {
    super({ key: 'StageScene' });
    this.biome = config.biome || null;
    this.mode = config.mode || 'battle';
  }

  preload() {
    // Load all background layers for the biome
    Object.entries(this.biome.backgrounds).forEach(([key, path]) => {
      this.load.image(key, path);
    });
  }

  create() {
    const scaleY = this.cameras.main.height;
    const displayWidth = this.cameras.main.width;
    
    // Create parallax layers with different speeds
    this.parallaxLayers = Object.entries(this.biome.backgrounds).map(([key, _], index) => {
      const speed = 0.1 * (index + 1); // Increase speed for each layer
      
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
      
      this.scale.resize(newWidth, newHeight);
      
      this.parallaxLayers.forEach(({ sprite }) => {
        const newScaleY = newHeight / 240;
        sprite.setScale(newScaleY)
          .setDisplaySize(newWidth, newHeight);
        sprite.x = 0;
        sprite.y = 0;
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
    this.parallaxLayers.forEach(({ sprite, speed }) => {
      sprite.tilePositionX += speed;
    });
  }
} 