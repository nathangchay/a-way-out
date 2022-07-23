import { configureStore } from '@reduxjs/toolkit';

import InventoryReducer from './Inventory';
import ActionLogReducer from './ActionLog';
import MapReducer from './Map';
import SettingsReducer from './Settings';
import ResearchReducer from './Research';

const ReduxStore = configureStore({
  reducer: {
    inventory: InventoryReducer,
    actionLog: ActionLogReducer,
    map: MapReducer,
    settings: SettingsReducer,
    research: ResearchReducer,
  },
});

export default ReduxStore;
