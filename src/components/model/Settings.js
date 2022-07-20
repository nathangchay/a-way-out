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
  extraReducers: {
    'inventory/replaceData': (_, action) => {
      const { newState } = action.payload;

      return newState.settings;
    },
  },
});

export const { toggleSetting } = Settings.actions;
export default Settings.reducer;
