import React, { useState } from 'react';
import { IconButton } from '@rmwc/icon-button';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogButton,
} from '@rmwc/dialog';
import { ThemeProvider } from '@rmwc/theme';
import { Switch } from '@rmwc/switch';

function SettingsController() {
  const [open, setOpen] = useState(false);

  return (
    <div className="settings-container">
      <IconButton icon={{ icon: 'settings', size: 'xlarge' }} onClick={() => setOpen(true)} />
      <ThemeProvider options={{ primary: '#282c34', secondary: '#282c34', onSurface: '#282c34' }}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Switch label="Dark theme" style={{ marginTop: 20 }} />
            <Switch label="Autosave" style={{ marginTop: 20 }} />
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
