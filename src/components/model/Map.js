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
      },
      start: {
        isAccessible: true,
        isLocked: false,
        isExplored: true,
        isExplorable: true,
        isLit: false,
        searchables: {
          cabinet: {
            duration: 5,
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
            duration: 2,
            inDark: true,
            rewards: {
              key: {
                type: 'r',
                quantity: 1,
                left: 2,
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
        searchables: {
          locker: {
            duration: 2,
            inDark: false,
            rewards: {
              key: {
                type: 'r',
                quantity: 1,
                left: 1,
              },
              penny: {
                type: 'r',
                quantity: 1,
                left: 100,
              },
            },
          },
        },
      },
      room2: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
      },
      room3: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
      },
      room4: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
      },
      room5: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
      },
      room6: {
        isAccessible: true,
        isLocked: false,
        isExplored: false,
        isExplorable: false,
        isLit: false,
        searchables: {},
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

      const reward = rooms[roomName].searchables[searchableName].rewards[rewardName];

      reward.left -= 1;

      if (reward.left <= 0) {
        delete rooms[roomName].searchables[searchableName].rewards[rewardName];
      }
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
    'inventory/replaceData': (_, action) => {
      const { newState } = action.payload;

      return newState.map;
    },
  },
});

export const { movePlayer, decrementSearchesLeft, replaceMap } = Map.actions;
export { getTiles };
export default Map.reducer;
