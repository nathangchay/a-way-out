import { createSlice } from '@reduxjs/toolkit';

const Research = createSlice({
  name: 'research',
  initialState: {
    researchPoints: 0,
    generalResearch: {
      'search speed': {
        unlocked: true,
        curLevel: 1,
        costPerLevel: [10, 30, 70, 100],
      },
    },
    keyItemUpgrades: {
      'flashlight capacity': {
        associatedItem: 'flashlight',
        curLevel: 1,
        costPerLevel: [50, 100],
      },
    },
  },
  reducers: {},
  extraReducers: {
    'inventory/replaceData': (_, action) => {
      const { newState } = action.payload;

      return newState.research;
    },
  },
});

export default Research.reducer;
