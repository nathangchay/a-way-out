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
      const { itemAction, data } = action.payload;

      if (itemAction === 'flashlight/use') {
        const { flashlight } = state.keyItems;

        if (flashlight.chargesLeft > 0) {
          flashlight.chargesLeft -= 1;
        }
      } else if (itemAction === 'flashlight/recharge') {
        const { maxCapacity } = data;
        const { resources } = state;

        if (resources.battery) {
          resources.battery -= 1;
          state.keyItems.flashlight.chargesLeft = maxCapacity;

          if (resources.battery <= 0) {
            delete resources.battery;
          }
        }
      }
    },
    replaceData: (_, action) => {
      const { newState } = action.payload;

      return newState.inventory;
    },
  },
});

export const {
  addResource, addKeyItem, _useKeyItem, replaceData,
} = Inventory.actions;
export default Inventory.reducer;
