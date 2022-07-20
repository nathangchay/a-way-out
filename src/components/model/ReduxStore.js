import { configureStore } from '@reduxjs/toolkit';

import InventoryReducer from './Inventory';
import ActionLogReducer from './ActionLog';
import MapReducer from './Map';
import SettingsReducer from './Settings';

const ReduxStore = configureStore({
  reducer: {
    inventory: InventoryReducer,
    actionLog: ActionLogReducer,
    map: MapReducer,
    settings: SettingsReducer,
  },
});

export default ReduxStore;
