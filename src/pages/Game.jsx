import { useEffect, useRef } from "react";
import MainMenu from "./MainMenu";
import Stage from "./Stage";
import useGameStore from "../store/gameStore";

export default function Game() {
  const { initGame, destroyGame, isLoaded, currentScene } = useGameStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initGame();
      initialized.current = true;
    }

    return () => {
      destroyGame();
      initialized.current = false;
    };
  }, []);

  const renderUI = () => {
    switch(currentScene) {
      case 'MainMenuBackground':
        return <MainMenu />;
      case 'StageBackground':
        return <Stage />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <div id="game-container" className="fixed inset-0 overflow-hidden game-container">
      {isLoaded && renderUI()}
    </div>
  );
}
