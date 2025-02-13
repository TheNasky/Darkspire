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

    this.parallaxLayers = biomeData.layers.map(({ key, speed, yOffsetMod = 0 }) => {
      const texture = this.textures.get(key);
      const textureWidth = texture.source[0].width;
      const textureHeight = texture.source[0].height;

      // Calculate scale based on width first
      const scaleX = screenWidth / textureWidth;
      // Then ensure height is scaled up enough to cover screen height plus some extra
      const scaleY = (screenHeight * 1.2) / textureHeight;
      
      // Use the larger scale for both dimensions to maintain aspect ratio
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
        .setScale(scale);

      // Enable pixel art rendering
      sprite.setTexture(key, undefined, { pixelArt: true });

      // Calculate vertical position
      const scaledHeight = textureHeight * scale;
      const baseOffset = -(scaledHeight - screenHeight) / 2;
      const yOffset = baseOffset + (screenHeight * yOffsetMod);
      sprite.y = yOffset;
      
      return { sprite, speed, yOffsetMod };
    });

    // Handle window resize
    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      this.scale.resize(newWidth, newHeight);
      
      this.parallaxLayers.forEach(({ sprite, yOffsetMod = 0 }) => {
        const texture = this.textures.get(sprite.texture.key);
        const textureWidth = texture.source[0].width;
        const textureHeight = texture.source[0].height;

        const scaleX = newWidth / textureWidth;
        const scaleY = (newHeight * 1.2) / textureHeight;
        const scale = Math.max(scaleX, scaleY);

        sprite.setScale(scale);

        // Recalculate vertical position
        const scaledHeight = textureHeight * scale;
        const baseOffset = -(scaledHeight - newHeight) / 2;
        const yOffset = baseOffset + (newHeight * yOffsetMod);
        sprite.y = yOffset;
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