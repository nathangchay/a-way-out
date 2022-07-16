import { createSlice } from '@reduxjs/toolkit';

const tiles = [
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'room1', 'room2', 'start', 'room3', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'room4', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'room5', 'room6', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
];

function getTiles() {
  return tiles;
}

const Map = createSlice({
  name: 'map',
  initialState: {
    playerCoordinate: { x: 3, y: 1 },
    rooms: {
      wall: {
        isAccessible: false, isLocked: false, isExplored: false, items: {},
      },
      start: {
        isAccessible: true,
        isLocked: false,
        isExplored: true,
        items: {
          'dirt pile': {
            duration: 1,
            reward: 'key',
            rewardQuantity: 1,
            searchesLeft: 2,
          },
        },
      },
      room1: {
        isAccessible: true, isLocked: false, isExplored: false, items: {},
      },
      room2: {
        isAccessible: true, isLocked: false, isExplored: false, items: {},
      },
      room3: {
        isAccessible: true, isLocked: false, isExplored: false, items: {},
      },
      room4: {
        isAccessible: true, isLocked: false, isExplored: false, items: {},
      },
      room5: {
        isAccessible: true, isLocked: false, isExplored: false, items: {},
      },
      room6: {
        isAccessible: true, isLocked: false, isExplored: false, items: {},
      },
    },
  },
  reducers: {
    movePlayer: (state, action) => {
      const { rooms } = state;
      const { i, j } = action.payload;

      const nextRoom = rooms[tiles[i][j]];

      if (!nextRoom.isAccessible) {
        return;
      }

      nextRoom.isExplored = true;
      state.playerCoordinate = { x: j, y: i };
    },
    decrementSearchesLeft: (state, action) => {
      const { rooms } = state;
      const { roomName, itemName } = action.payload;

      rooms[roomName].items[itemName].searchesLeft -= 1;
    },
  },
});

export const { movePlayer, decrementSearchesLeft } = Map.actions;
export { getTiles };
export default Map.reducer;
