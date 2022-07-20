import { configureStore } from '@reduxjs/toolkit';

import InventoryReducer, { _useKeyItem } from './Inventory';
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

ReduxStore.dispatch(_useKeyItem({}));

export default ReduxStore;
