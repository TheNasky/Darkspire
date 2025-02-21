import { create } from 'zustand';

const useMapStore = create((set, get) => ({
  mapData: null,
  gridNodes: {},
  gridPaths: {},
  characterPosition: null,
  
  setMapData: (data) => {
    if (!data) return;
    
    const nodes = {};
    const paths = {};
    
    // Convert arrays to objects for O(1) lookup
    data.grid.nodes.forEach(node => {
      nodes[`${node.position.x},${node.position.y}`] = node;
    });
    
    data.grid.paths.forEach(path => {
      paths[`${path.position.x},${path.position.y}`] = path;
    });
    
    set({
      mapData: data,
      gridNodes: nodes,
      gridPaths: paths,
      characterPosition: data.match.characterPositions[0]?.position || null
    });
  },
  
  updateCell: (position, updates) => {
    const key = `${position.x},${position.y}`;
    set(state => ({
      gridNodes: {
        ...state.gridNodes,
        [key]: { ...state.gridNodes[key], ...updates }
      }
    }));
  }
}));

// Selector functions to help prevent unnecessary rerenders
export const selectGridNodes = (state) => state.gridNodes;
export const selectGridPaths = (state) => state.gridPaths;
export const selectCharacterPosition = (state) => state.characterPosition;

export default useMapStore;