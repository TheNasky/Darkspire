export const NODE_TYPES = {
  START: {
    id: 'START',
    icon: '🏠',
    label: 'Starting Point',
    color: 'emerald'
  },
  COMBAT_BOSS: {
    id: 'COMBAT_BOSS',
    icon: '💀',
    label: 'Boss Battle',
    color: 'red'
  },
  COMBAT_EASY: {
    id: 'COMBAT_EASY',
    icon: '⚔️',
    label: 'Easy Combat',
    color: 'blue'
  },
  EMPTY: {
    id: 'EMPTY',
    icon: '➡️',
    label: 'Path',
    color: 'gray'
  },
  LOOT_SMALL: {
    id: 'LOOT_SMALL',
    icon: '💎',
    label: 'Small Treasure',
    color: 'amber'
  },
  LOOT_MEDIUM: {
    id: 'LOOT_MEDIUM',
    icon: '💎',
    label: 'Medium Treasure',
    color: 'amber'
  },
  LOOT_LARGE: {
    id: 'LOOT_LARGE',
    icon: '💎',
    label: 'Large Treasure',
    color: 'amber'
  },
  CURIO_SMALL: {
    id: 'CURIO_SMALL',
    icon: '❓',
    label: 'Small Curio',
    color: 'purple'
  },
  CURIO_BIG: {
    id: 'CURIO_BIG',
    icon: '❓',
    label: 'Large Curio',
    color: 'purple'
  }
};

export const NODE_COLORS = {
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    hover: 'hover:bg-emerald-500/30',
    text: 'text-emerald-700'
  },
  red: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    hover: 'hover:bg-red-500/30',
    text: 'text-red-700'
  },
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    hover: 'hover:bg-blue-500/30',
    text: 'text-blue-700'
  },
  gray: {
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30',
    hover: 'hover:bg-gray-500/30',
    text: 'text-gray-700'
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    hover: 'hover:bg-amber-500/30',
    text: 'text-amber-700'
  }
}; 