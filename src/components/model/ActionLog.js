import { createSlice } from '@reduxjs/toolkit';

import Logger from './Logger';

const MAX_LENGTH = 15;
const introStory = { text: 'STORY: You awaken in a dark room with no windows. After waiting for your eyes to adjust, you notice a cabinet in the corner', type: 'story' };

const ActionLog = createSlice({
  name: 'actionLog',
  initialState: [introStory],
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
