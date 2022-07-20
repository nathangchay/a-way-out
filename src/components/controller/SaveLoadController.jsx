import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@rmwc/button';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogButton,
} from '@rmwc/dialog';
import { Snackbar } from '@rmwc/snackbar';
import { Typography } from '@rmwc/typography';

import {
  saveData, loadData, getLastSaved, login, logout, getUser, onAuthUpdate,
} from '../model/SaveLoad';
import { replaceActionLog } from '../model/ActionLog';
import { replaceInventory } from '../model/Inventory';
import { replaceMap } from '../model/Map';

function SaveLoadController() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [lastSaved, setLastSaved] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [dialogAcceptFunc, setDialogAcceptFunc] = useState(() => {});
  const [dialogAcceptText, setDialogAcceptText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const attemptSave = () => {
    setSnackbarMessage('Attempting to save data...');
    setSnackbarOpen(true);

    saveData(data).then((res) => {
      if (typeof (res) === 'string') {
        setSnackbarMessage(res);
      } else {
        setLastSaved(res.lastSaved);
        setSnackbarMessage(res.msg);
      }

      setSnackbarOpen(true);
    });
  };

  const attemptLoad = () => {
    setSnackbarMessage('Attempting to load data...');
    setSnackbarOpen(true);

    loadData().then((res) => {
      if (typeof (res) === 'string') {
        setSnackbarMessage(res);
      } else {
        setSnackbarMessage(res.msg);

        dispatch(replaceActionLog({ newState: res.actionLog }));
        dispatch(replaceInventory({ newState: res.inventory }));
        dispatch(replaceMap({ newState: res.map }));
      }

      setSnackbarOpen(true);
    });
  };

  const attemptLogin = () => {
    login()
      .then((res) => {
        const { email } = res.user;

        setSnackbarMessage(`Successfully signed in as ${email}!`);
        setSnackbarOpen(true);

        setCurrentUserEmail(email);
      })
      .catch((error) => {
        setSnackbarMessage(`Error during login: ${error.code}`);
        setSnackbarOpen(true);
      });
  };

  const attemptLogout = () => {
    logout()
      .then(() => {
        setSnackbarMessage('Successfully logged out!');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage(`Error during logout: ${error.code}`);
        setSnackbarOpen(true);
      });
  };

  const onSaveLoadButtonClick = (action) => {
    if (!getUser()) {
      return;
    }

    setDialogTitle('Are you sure?');

    if (action === 's') {
      setDialogContent('This will overwrite the progress you have stored on the server');
      setDialogAcceptFunc(() => attemptSave);
      setDialogAcceptText('Save');
    } else {
      setDialogContent('This will overwrite your current progress');
      setDialogAcceptFunc(() => attemptLoad);
      setDialogAcceptText('Load');
    }

    setDialogOpen(true);
  };

  const onSaveLoadTextClick = () => {
    if (!getUser()) {
      setDialogTitle('Please log in');
      setDialogContent('In order to save or load your data, you must log in with a Google account');
      setDialogAcceptFunc(() => attemptLogin);
      setDialogAcceptText('Log in');
    } else {
      setDialogTitle('Log out');
      setDialogContent('Are you sure you would like to log out? Unsaved progress will be lost');
      setDialogAcceptFunc(() => attemptLogout);
      setDialogAcceptText('Log out');
    }

    setDialogOpen(true);
  };

  useEffect(() => {
    onAuthUpdate(() => {
      const user = getUser();

      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail('');
      }

      getLastSaved().then((res) => {
        setLastSaved(res);
      });
    });
  }, []);

  const saveLoadButtons = (
    <div className="save-load-buttons-container">
      <Button raised label="Save" onClick={() => onSaveLoadButtonClick('s')} />
      <Button raised label="Load" style={{ marginLeft: 10 }} onClick={() => onSaveLoadButtonClick('l')} />
    </div>
  );

  return (
    <div className="save-load-container">
      <a href className="save-load-text-container" onClick={onSaveLoadTextClick}>
        <Typography use="caption">{currentUserEmail !== '' ? `Logged in as ${currentUserEmail}` : 'Not logged in'}</Typography>
        <Typography use="caption">{`Last saved: ${lastSaved === '' ? 'Never' : lastSaved}`}</Typography>
      </a>

      {currentUserEmail !== '' ? saveLoadButtons : null}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <DialogButton action="close" isDefaultAction style={{ color: '#282c34' }}>Cancel</DialogButton>
          <DialogButton raised action="accept" onClick={dialogAcceptFunc} style={{ backgroundColor: '#282c34', color: 'white' }}>{dialogAcceptText}</DialogButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        dismissesOnAction
      />
    </div>
  );
}

export default SaveLoadController;
