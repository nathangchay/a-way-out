import { createSlice } from '@reduxjs/toolkit';

const Inventory = createSlice({
  name: 'inventory',
  initialState: {},
  reducers: {
    addToInventory: (state, action) => {
      const { item, quantity } = action.payload;

      if (!state[item]) {
        return { ...state, [item]: quantity };
      }

      return { ...state, [item]: state[item] + quantity };
    },
    replaceInventory: (_, action) => {
      const { newState } = action.payload;

      return newState;
    },
  },
});

export const { addToInventory, replaceInventory } = Inventory.actions;
export default Inventory.reducer;
