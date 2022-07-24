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
      'map movement': {
        unlocked: false,
        curLevel: 1,
        costPerLevel: [100, 200, 300],
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
  reducers: {
    purchaseUpgrade: (state, action) => {
      const { researchPoints } = state;
      const { type, upgradeName } = action.payload;
      const upgrade = state[type][upgradeName];
      const cost = upgrade.costPerLevel[upgrade.curLevel - 1];

      if (researchPoints >= cost) {
        state.researchPoints -= cost;
        upgrade.curLevel += 1;
      }
    },
    awardResearchPoints: (state, action) => {
      const { amount } = action.payload;

      state.researchPoints += amount;
    },
  },
  extraReducers: {
    'inventory/replaceData': (_, action) => {
      const { newState } = action.payload;

      return newState.research;
    },
  },
});

export const { purchaseUpgrade, awardResearchPoints } = Research.actions;
export default Research.reducer;
