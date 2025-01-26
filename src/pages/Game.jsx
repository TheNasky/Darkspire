import { useEffect, useState } from "react";
import Phaser from "phaser";
import MainMenuBackground from "../game/scenes/MainMenuBackground";
import StageScene from "../game/scenes/StageScene";
import MainMenu from "./MainMenu";

let game; // Singleton game instance

export default function Game() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScene, setCurrentScene] = useState('menu');

  useEffect(() => {
    if (!game) {
      const config = {
        type: Phaser.AUTO,
        parent: "game-container",
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "#0A0B0F",
        scene: [MainMenuBackground, StageScene],
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
      };

      game = new Phaser.Game(config);

      // Wait for the scene to be created before showing UI
      game.events.once('ready', () => {
        setIsLoaded(true);
      });

      // Listen for scene changes
      game.events.on('changeScene', (sceneName) => {
        setCurrentScene(sceneName);
      });
    }

    return () => {
      game?.destroy(true);
      game = null;
    };
  }, []);

  const renderUI = () => {
    switch(currentScene) {
      case 'menu':
        return <MainMenu />;
      case 'adventure':
        return <Stage config={STAGE_CONFIGS.TUTORIAL} mode="map" />;
      default:
        return null;
    }
  };

  return (
    <div id="game-container" className="fixed inset-0 overflow-hidden game-container">
      {isLoaded && renderUI()}
    </div>
  );
}
