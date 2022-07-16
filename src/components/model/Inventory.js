import { createSlice } from '@reduxjs/toolkit';

const Inventory = createSlice({
  name: 'inventory',
  initialState: {
    keyItems: {},
    resources: {},
  },
  reducers: {
    addResource: (state, action) => {
      const { item, quantity } = action.payload;

      if (!state.resources[item]) {
        state.resources[item] = quantity;
      } else {
        state.resources[item] += quantity;
      }
    },
    addKeyItem: (state, action) => {
      const { item, data } = action.payload;

      state.keyItems[item] = data;
    },
    _useKeyItem: (state, action) => {
      const { itemAction } = action.payload;

      if (itemAction === 'flashlight/use') {
        const { flashlight } = state.keyItems;

        if (flashlight.chargesLeft > 0) {
          flashlight.chargesLeft -= 1;
        }
      } else if (itemAction === 'flashlight/recharge') {
        const { resources } = state;

        if (resources.battery) {
          resources.battery -= 1;
          state.keyItems.flashlight.chargesLeft = 5;
        }
      }
    },
    replaceInventory: (_, action) => {
      const { newState } = action.payload;

      return newState;
    },
  },
});

export const {
  addResource, addKeyItem, _useKeyItem, replaceInventory,
} = Inventory.actions;
export default Inventory.reducer;
