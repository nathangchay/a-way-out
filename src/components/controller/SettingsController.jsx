import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@rmwc/icon-button';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogButton,
} from '@rmwc/dialog';
import { ThemeProvider } from '@rmwc/theme';
import { Switch } from '@rmwc/switch';

import { toggleSetting } from '../model/Settings';

function SettingsController() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const [open, setOpen] = useState(false);

  const onToggle = (setting) => {
    dispatch(toggleSetting({ setting }));
  };

  return (
    <div className="settings-container">
      <IconButton icon={{ icon: 'settings', size: 'xlarge' }} onClick={() => setOpen(true)} />
      <ThemeProvider options={{ primary: '#282c34', secondary: '#282c34', onSurface: '#282c34' }}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Switch label="Dark theme" checked={settings.darkTheme} onChange={() => onToggle('darkTheme')} style={{ marginTop: 20, color: '#282c34' }} />
            <Switch label="Autosave" checked={settings.autosave} onChange={() => onToggle('autosave')} style={{ marginTop: 20, color: '#282c34' }} />
          </DialogContent>
          <DialogActions>
            <DialogButton action="close">close</DialogButton>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default SettingsController;
