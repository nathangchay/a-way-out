import { configureStore } from '@reduxjs/toolkit';

import InventoryReducer from './Inventory';
import ActionLogReducer from './ActionLog';

const ReduxStore = configureStore({
  reducer: {
    inventory: InventoryReducer,
    actionLog: ActionLogReducer,
  },
});

export default ReduxStore;
