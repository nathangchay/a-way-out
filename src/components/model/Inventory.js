import { createSlice } from '@reduxjs/toolkit';

const Inventory = createSlice({
  name: 'inventory',
  initialState: {
    key: 0,
    coin: 10,
  },
  reducers: {
    addToInventory: (state, action) => {
      const { item, quantity } = action.payload;

      if (!state[item]) {
        return { ...state, [item]: quantity };
      }

      return { ...state, [item]: state[item] + quantity };
    },
  },
});

export const { addToInventory } = Inventory.actions;
export default Inventory.reducer;
