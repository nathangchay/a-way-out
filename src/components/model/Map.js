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
        isAccessible: false,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
      start: {
        isAccessible: true,
        isLocked: false,
        isExplored: true,
        isExplorable: true,
        isLit: false,
        searchables: {
          cabinet: {
            duration: 1,
            inDark: false,
            rewards: {
              flashlight: {
                type: 'k',
                data: {
                  chargesLeft: 0,
                },
                left: 1,
              },
              battery: {
                type: 'r',
                quantity: 1,
                left: 1,
              },
            },
          },
          'dirt pile': {
            duration: 1,
            inDark: true,
            rewards: {
              key: {
                type: 'r',
                quantity: 1,
                left: 1,
              },
            },
          },
        },
      },
      room1: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
      room2: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
      room3: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
      room4: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
      room5: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
      room6: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
        litSearchables: {},
      },
    },
  },
  reducers: {
    movePlayer: (state, action) => {
      const { rooms } = state;
      const { i, j } = action.payload;

      rooms[tiles[i][j]].isExplored = true;
      state.playerCoordinate = { x: j, y: i };
    },
    decrementSearchesLeft: (state, action) => {
      const { rooms } = state;
      const { roomName, searchableName, rewardName } = action.payload;

      let { left } = rooms[roomName].searchables[searchableName].rewards[rewardName];

      left -= 1;

      if (left <= 0) {
        delete rooms[roomName].searchables[searchableName].rewards[rewardName];
      }
    },
    replaceMap: (_, action) => {
      const { newState } = action.payload;

      return newState;
    },
  },
  extraReducers: {
    'inventory/_useKeyItem': (state, action) => {
      const { itemAction } = action.payload;

      if (itemAction === 'flashlight/use') {
        const { rooms } = state;
        const { x, y } = state.playerCoordinate;
        const adjacentRooms = [
          rooms[tiles[y + 1][x]],
          rooms[tiles[y - 1][x]],
          rooms[tiles[y][x + 1]],
          rooms[tiles[y][x - 1]],
        ];

        adjacentRooms.forEach((room) => {
          room.isExplorable = room.isAccessible;
        });

        rooms[tiles[y][x]].isLit = true;
      }
    },
  },
});

export const { movePlayer, decrementSearchesLeft, replaceMap } = Map.actions;
export { getTiles };
export default Map.reducer;
