import { create } from 'zustand';
import Phaser from 'phaser';
import MainMenuBackground from "../game/scenes/MainMenuBackground";
import StageBackground from "../game/scenes/StageBackground";

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
        scene: [MainMenuBackground, StageBackground],
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

      game.events.once('ready', () => {
        set({ isLoaded: true });
      });

      game.events.on('changeScene', (sceneName, sceneData) => {
        const currentScene = get().currentScene;
        game.scene.stop(currentScene);
        game.scene.start(sceneName, sceneData);
        set({ currentScene: sceneName });
      });

      set({ game });
    }
  },

  destroyGame: () => {
    const game = get().game;
    if (game) {
      game.destroy(true);
      set({ game: null, isLoaded: false });
    }
  },

  // Add other game-related state here
  currentStage: null,
  setCurrentStage: (stage) => set({ currentStage: stage }),
}));

export default useGameStore;