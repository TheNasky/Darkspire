import { useEffect, useReducer, useCallback, memo } from "react";
import useGameStore from "../store/gameStore";
import BattleGrid from "../components/BattleGrid";
import PlayerHUD from "../components/match/PlayerHUD";
import CharacterSprite from "../components/CharacterSprite";

// Animation state machine
const ANIMATIONS = {
  IDLE: {
    name: 'idle',
    duration: 0,
    next: 'idle'
  },
  WALK: {
    name: 'walk',
    duration: 1000,
    next: 'idle'
  },
  SHOOT: {
    name: 'shoot',
    duration: 700,
    next: 'idle'
  }
};

// Memoized character component
const Character = memo(({ position, action }) => {
  console.log('Character render:', { action, position });
  return (
    <div 
      className="absolute transition-all duration-[1000ms] ease-in-out"
      style={{
        left: `${position.col * 10}%`,
        top: `${position.row * 10}%`,
        width: '10%',
        height: '10%',
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute transform scale-[2]">
          <CharacterSprite
            characterId="wizard"
            action={action}
            size="3rem"
            shadow={2}
          />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.position.row === nextProps.position.row &&
         prevProps.position.col === nextProps.position.col &&
         prevProps.action === nextProps.action;
});

// Action types
const ACTIONS = {
  MOVE: 'MOVE',
  SET_ACTION: 'SET_ACTION',
  COMPLETE_MOVEMENT: 'COMPLETE_MOVEMENT'
};

// Reducer
function characterReducer(state, action) {
  console.log('Reducer:', { type: action.type, payload: action.payload });
  
  switch (action.type) {
    case ACTIONS.MOVE:
      return {
        ...state,
        position: action.payload,
        action: ANIMATIONS.WALK.name,
        isMoving: true
      };
    case ACTIONS.SET_ACTION:
      return {
        ...state,
        action: action.payload
      };
    case ACTIONS.COMPLETE_MOVEMENT:
      return {
        ...state,
        action: ANIMATIONS.IDLE.name,
        isMoving: false
      };
    default:
      return state;
  }
}

export default function Combat() {
  const [state, dispatch] = useReducer(characterReducer, {
    position: { row: 5, col: 5 },
    action: ANIMATIONS.IDLE.name,
    isMoving: false
  });
  
  console.log('Combat render:', state);

  const handleMovement = useCallback((newPosition) => {
    if (!state.isMoving && (
      newPosition.row !== state.position.row || 
      newPosition.col !== state.position.col
    )) {
      console.log('Movement:', { from: state.position, to: newPosition });
      dispatch({ type: ACTIONS.MOVE, payload: newPosition });
      
      setTimeout(() => {
        dispatch({ type: ACTIONS.COMPLETE_MOVEMENT });
      }, ANIMATIONS.WALK.duration);
    }
  }, [state.isMoving, state.position]);

  const handleAttack = useCallback(() => {
    if (!state.isMoving) {
      dispatch({ type: ACTIONS.SET_ACTION, payload: ANIMATIONS.SHOOT.name });
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_ACTION, payload: ANIMATIONS.IDLE.name });
      }, ANIMATIONS.SHOOT.duration);
    }
  }, [state.isMoving]);

  useEffect(() => {
    const game = useGameStore.getState().game;
    if (game) {
      game.events.emit('changeScene', 'StageBackground', { 
        biome: 'FOREST',
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (state.isMoving) return;

      let newPosition = { ...state.position };
      
      switch(e.key.toLowerCase()) {
        case 'w':
          newPosition.row = Math.max(0, state.position.row - 1);
          break;
        case 's':
          newPosition.row = Math.min(9, state.position.row + 1);
          break;
        case 'a':
          newPosition.col = Math.max(0, state.position.col - 1);
          break;
        case 'd':
          newPosition.col = Math.min(9, state.position.col + 1);
          break;
        case ' ':
          handleAttack();
          return;
        default:
          return;
      }

      handleMovement(newPosition);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.position, state.isMoving, handleMovement, handleAttack]);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <BattleGrid gridSize={{ rows: 10, cols: 10 }}>
            <Character position={state.position} action={state.action} />
          </BattleGrid>
        </div>
      </div>

      <PlayerHUD />

      <div className="absolute top-4 right-4 bg-black/50 text-white/80 p-4 rounded-lg text-sm">
        <p>WASD - Move</p>
        <p>Space - Attack</p>
      </div>
    </div>
  );
} 