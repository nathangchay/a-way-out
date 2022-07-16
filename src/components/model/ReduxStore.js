import { configureStore } from '@reduxjs/toolkit';

import InventoryReducer from './Inventory';
import ActionLogReducer from './ActionLog';
import MapReducer from './Map';

const ReduxStore = configureStore({
  reducer: {
    inventory: InventoryReducer,
    actionLog: ActionLogReducer,
    map: MapReducer,
  },
});

export default ReduxStore;
