import { configureStore } from '@reduxjs/toolkit';

import InventoryReducer, { _useKeyItem } from './Inventory';
import ActionLogReducer from './ActionLog';
import MapReducer from './Map';

const ReduxStore = configureStore({
  reducer: {
    inventory: InventoryReducer,
    actionLog: ActionLogReducer,
    map: MapReducer,
  },
});

ReduxStore.dispatch(_useKeyItem({}));

export default ReduxStore;
