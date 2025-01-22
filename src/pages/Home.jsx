import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-accent-emerald to-accent-cyan text-transparent bg-clip-text">
        Darkspire Chronicles: Greyholt
      </h1>

      <p className="text-gray-400 max-w-md mb-8">
        Enter a world of strategic combat and epic battles. Choose your character, join the
        arena, and prove your tactical prowess in turn-based combat.
      </p>

      <button
        onClick={() => navigate("/game")}
        className="px-8 py-3 text-lg font-medium text-white bg-accent-emerald 
                     rounded-lg hover:bg-primary-dark transition-colors
                     shadow-lg shadow-accent-emerald/20"
      >
        Start Game
      </button>
    </div>
  );
}
