export type Position = {
  row: number;
  col: number;
};

export type Size = {
  width: number;
  height: number;
};

export type EntityStats = {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  stamina: number;
  maxStamina: number;
  physicalPower: number;
  spellPower: number;
  magicRegen: number;
  criticalChance: number;
  armorPen: number;
  defense: number;
};

export type Entity = {
  id: string;
  name: string;
  type: 'player' | 'enemy' | 'neutral';
  characterId: string;
  position: Position;
  size: Size;
  stats: EntityStats;
  status: {
    isStunned?: boolean;
    isRooted?: boolean;
    isSilenced?: boolean;
    effects: Array<{
      type: string;
      duration: number;
      value: number;
    }>;
  };
};

export type BattleState = {
  id: string;
  grid: {
    rows: number;
    cols: number;
    terrain: Array<{
      position: Position;
      type: 'normal' | 'difficult' | 'hazard';
      effect?: string;
    }>;
  };
  entities: Entity[];
  turn: {
    current: number;
    order: string[]; // entity IDs in turn order
    phase: 'planning' | 'execution' | 'resolution';
  };
  actions: Array<{
    entityId: string;
    type: string;
    target: Position;
    timestamp: number;
  }>;
};

export type Match = {
  id: string;
  type: 'battle' | 'event' | 'shop';
  difficulty: number;
  completed: boolean;
  rewards?: {
    gold: number;
    experience: number;
    items: string[];
  };
  battle?: BattleState;
};

export type Adventure = {
  id: string;
  name: string;
  biome: string;
  level: number;
  difficulty: 'normal' | 'hard' | 'extreme';
  progress: {
    currentMatchIndex: number;
    matches: Match[];
    completedMatches: string[];
  };
  player: {
    position: Position;
    inventory: any[];
    stats: EntityStats;
  };
}; 