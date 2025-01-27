import { useEffect } from "react";
import MainMenu from "./MainMenu";
import Stage from "./Stage";
import useGameStore from "../store/gameStore";

export default function Game() {
  const { initGame, destroyGame, isLoaded, currentScene } = useGameStore();

  useEffect(() => {
    initGame();
    return () => destroyGame();
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
