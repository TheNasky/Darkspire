import Phaser from "phaser";
import { STAGE_BIOMES } from "../../constants/stageBackgrounds";

export default class StageBackground extends Phaser.Scene {
  constructor(biome = 'FOREST') {
    super({ key: "StageBackground" });
    this.biome = biome;
  }

  init(data) {
    if (data.biome) {
      this.biome = data.biome;
    }
  }

  preload() {
    const biomeData = STAGE_BIOMES[this.biome];
    if (!biomeData) return;

    biomeData.layers.forEach(({ key, path }) => {
      this.load.image(key, path);
    });
  }

  create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    const biomeData = STAGE_BIOMES[this.biome];
    
    if (!biomeData) return;

    this.parallaxLayers = biomeData.layers.map(({ key, speed }) => {
      // Get the texture dimensions
      const texture = this.textures.get(key);
      const textureWidth = texture.source[0].width;
      const textureHeight = texture.source[0].height;

      // Calculate scale needed for both dimensions
      const scaleX = screenWidth / textureWidth;
      const scaleY = screenHeight / textureHeight;
      
      // Use the larger scale to ensure full coverage
      const scale = Math.max(scaleX, scaleY);

      const sprite = this.add.tileSprite(
        0, 
        0, 
        textureWidth, 
        textureHeight, 
        key
      )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(scale)
        .setDisplaySize(screenWidth, screenHeight);
      
      return { sprite, speed };
    });

    // Handle window resize
    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      this.scale.resize(newWidth, newHeight);
      
      this.parallaxLayers.forEach(({ sprite }) => {
        const texture = this.textures.get(sprite.texture.key);
        const textureWidth = texture.source[0].width;
        const textureHeight = texture.source[0].height;

        const scaleX = newWidth / textureWidth;
        const scaleY = newHeight / textureHeight;
        const scale = Math.max(scaleX, scaleY);

        sprite.setScale(scale)
          .setDisplaySize(newWidth, newHeight);
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('fullscreenchange', resize);
    
    this.events.on('shutdown', () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('fullscreenchange', resize);
    });

    // Notify game that scene is ready
    this.game.events.emit('ready');
  }

  update() {
    this.parallaxLayers?.forEach(({ sprite, speed }) => {
      sprite.tilePositionX += speed;
    });
  }
} 