import { createSlice } from '@reduxjs/toolkit';

const ActionLog = createSlice({
  name: 'actionLog',
  initialState: {
    log: [
      'test1',
      'test2',
      'test3',
    ],
  },
  reducers: {
    addItemFound: (state, action) => {
      const { item, quantity } = action.payload;

      state.log.push(`found ${quantity} ${item}(s)`);
    },
  },
});

export const { addItemFound } = ActionLog.actions;
export default ActionLog.reducer;
