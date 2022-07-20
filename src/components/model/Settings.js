import { createSlice } from '@reduxjs/toolkit';

const Settings = createSlice({
  name: 'settings',
  initialState: {
    darkTheme: true,
    autosave: false,
  },
  reducers: {
    toggleSetting: (state, action) => {
      const { setting } = action.payload;

      if (setting in state) {
        state[setting] = !state[setting];
      }
    },
  },
});

export const { toggleSetting } = Settings.actions;
export default Settings.reducer;
