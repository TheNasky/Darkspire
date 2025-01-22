import { useEffect, useState } from "react";
import Phaser from "phaser";
import MainMenuBackground from "../game/scenes/MainMenuBackground";
import MainMenu from "./MainMenu";

export default function Game() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "game-container",
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#0A0B0F",
      scene: [MainMenuBackground],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    // Wait for the scene to be created before showing UI
    game.events.once('ready', () => {
      setIsLoaded(true);
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="game-container" className="fixed inset-0 overflow-hidden game-container">
      {isLoaded && <MainMenu />}
    </div>
  );
}
