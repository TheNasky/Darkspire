import { create } from 'zustand';
import Phaser from 'phaser';
import MainMenuBackground from "../game/scenes/MainMenuBackground";
import StageBackground from "../game/scenes/StageBackground";
import VillageBackground from "../game/scenes/VillageBackground";

const useGameStore = create((set, get) => ({
  game: null,
  currentScene: 'MainMenuBackground',
  isLoaded: false,

  initGame: () => {
    if (!get().game) {
      const config = {
        type: Phaser.AUTO,
        parent: "game-container",
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "#0A0B0F",
        pixelArt: true,
        roundPixels: true,
        antialias: false,
        crisp: true,
        scale: {
          mode: Phaser.Scale.RESIZE,
          width: window.innerWidth,
          height: window.innerHeight,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          expandParent: true,
          autoRound: true
        },
        scene: [MainMenuBackground, StageBackground, VillageBackground],
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
      };

      const game = new Phaser.Game(config);

      game.scene.start('MainMenuBackground');

      // Handle resize events at the game level
      window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
      });

      window.addEventListener('fullscreenchange', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
      });

      game.events.once('ready', () => {
        set({ isLoaded: true });
      });

      game.events.on('changeScene', (sceneName, sceneData) => {
        const currentScene = get().currentScene;
        game.scene.stop(currentScene);
        
        if (sceneData?.name === 'Village') {
          game.scene.start('VillageBackground');
          set({ currentScene: 'VillageBackground' });
        } else {
          game.scene.start(sceneName, sceneData);
          set({ currentScene: sceneName });
        }
      });

      set({ game });
    }
  },

  destroyGame: () => {
    const game = get().game;
    if (game) {
      // Remove event listeners
      window.removeEventListener('resize', () => {});
      window.removeEventListener('fullscreenchange', () => {});
      game.destroy(true);
      set({ game: null, isLoaded: false });
    }
  },

  // Add other game-related state here
  currentStage: null,
  setCurrentStage: (stage) => set({ currentStage: stage }),
}));

export default useGameStore;