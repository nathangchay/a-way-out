import { createSlice } from '@reduxjs/toolkit';

import Logger from './Logger';

const MAX_LENGTH = 15;

const ActionLog = createSlice({
  name: 'actionLog',
  initialState: [],
  reducers: {
    addAction: (state, action) => {
      const { newAction, type } = action.payload;
      const newLogger = new Logger(type, newAction);

      if (state.length > MAX_LENGTH) {
        state.pop();
      }

      return newLogger.log(state);
    },
  },
  extraReducers: {
    'inventory/replaceData': (_, action) => {
      const { newState } = action.payload;

      return newState.actionLog;
    },
  },
});

export const { addAction, replaceActionLog } = ActionLog.actions;
export default ActionLog.reducer;
