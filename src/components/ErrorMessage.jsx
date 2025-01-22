import useGameStore from "../store/gameStore";

export default function ErrorMessage() {
  const error = useGameStore((state) => state.error);

  if (!error) return null;

  return (
    <div
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 
                    bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg 
                    transition-opacity duration-300 
                    ${error ? "opacity-100" : "opacity-0"}`}
    >
      {error}
    </div>
  );
}
