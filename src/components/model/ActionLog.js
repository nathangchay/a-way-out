import { createSlice } from '@reduxjs/toolkit';

const MAX_LENGTH = 15;

const ActionLog = createSlice({
  name: 'actionLog',
  initialState: [],
  reducers: {
    addAction: (state, action) => {
      const { newAction } = action.payload;
      if (state.length > MAX_LENGTH) {
        state.pop();
      }

      state.unshift(newAction);
    },
    replaceActionLog: (_, action) => {
      const { newState } = action.payload;

      return newState;
    },
  },
});

export const { addAction, replaceActionLog } = ActionLog.actions;
export default ActionLog.reducer;
