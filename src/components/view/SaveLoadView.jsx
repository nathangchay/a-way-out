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

function SaveLoadView() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [lastSaved, setLastSaved] = useState('');
  const [confirmLoginOpen, setConfirmLoginOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [confirmLoadOpen, setConfirmLoadOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const attemptSave = () => {
    setSnackbarMessage('attempting to save data...');
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
    setSnackbarMessage('attempting to load data...');
    setSnackbarOpen(true);

    loadData().then((res) => {
      if (typeof (res) === 'string') {
        setSnackbarMessage(res);
      } else {
        setSnackbarMessage(res.msg);

        dispatch(replaceActionLog({ newState: res.actionLog }));
        dispatch(replaceInventory({ newState: res.inventory }));
      }

      setSnackbarOpen(true);
    });
  };

  const attemptLogin = () => {
    login()
      .then((res) => {
        const { email } = res.user;

        setSnackbarMessage(`successfully signed in as ${email}!`);
        setSnackbarOpen(true);

        setCurrentUserEmail(email);
      })
      .catch((error) => {
        setSnackbarMessage(`error during login: ${error.code}`);
        setSnackbarOpen(true);
      });
  };

  const attemptLogout = () => {
    logout()
      .then(() => {
        setSnackbarMessage('successfully logged out!');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage(`error during logout: ${error.code}`);
        setSnackbarOpen(true);
      });
  };

  const onSaveLoadButtonClick = (action) => {
    if (!getUser()) {
      return;
    }

    if (action === 's') {
      setConfirmSaveOpen(true);
    } else {
      setConfirmLoadOpen(true);
    }
  };

  const onSaveLoadTextClick = () => {
    if (!getUser()) {
      setConfirmLoginOpen(true);
    } else {
      setConfirmLogoutOpen(true);
    }
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
      <Button raised label="save" onClick={() => onSaveLoadButtonClick('s')} />
      <Button raised label="load" style={{ marginLeft: 10 }} onClick={() => onSaveLoadButtonClick('l')} />
    </div>
  );

  return (
    <div className="save-load-container">
      <a href className="save-load-text-container" onClick={onSaveLoadTextClick}>
        <Typography use="caption">{currentUserEmail !== '' ? `logged in as ${currentUserEmail}` : 'not logged in'}</Typography>
        <Typography use="caption">{`last saved: ${lastSaved === '' ? 'never' : lastSaved}`}</Typography>
      </a>

      {currentUserEmail !== '' ? saveLoadButtons : null}

      <Dialog open={confirmLoginOpen} onClose={() => setConfirmLoginOpen(false)}>
        <DialogTitle>please log in</DialogTitle>
        <DialogContent>
          in order to save or load your data, you must log in with a google account
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" isDefaultAction style={{ color: '#282c34' }}>cancel</DialogButton>
          <DialogButton raised action="accept" onClick={attemptLogin} style={{ backgroundColor: '#282c34', color: 'white' }}>log in</DialogButton>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmLogoutOpen} onClose={() => setConfirmLogoutOpen(false)}>
        <DialogTitle>log out</DialogTitle>
        <DialogContent>
          are you sure you would like to log out? unsaved progress will be lost
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" isDefaultAction style={{ color: '#282c34' }}>cancel</DialogButton>
          <DialogButton raised action="accept" onClick={attemptLogout} style={{ backgroundColor: '#282c34', color: 'white' }}>log out</DialogButton>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmSaveOpen} onClose={() => setConfirmSaveOpen(false)}>
        <DialogTitle>are you sure?</DialogTitle>
        <DialogContent>
          this will overwrite the progress you have stored on the server
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" isDefaultAction style={{ color: '#282c34' }}>cancel</DialogButton>
          <DialogButton raised action="accept" onClick={attemptSave} style={{ backgroundColor: '#282c34', color: 'white' }}>save</DialogButton>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmLoadOpen} onClose={() => setConfirmLoadOpen(false)}>
        <DialogTitle>are you sure?</DialogTitle>
        <DialogContent>
          this will overwrite your current progress
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" isDefaultAction style={{ color: '#282c34' }}>cancel</DialogButton>
          <DialogButton raised action="accept" onClick={attemptLoad} style={{ backgroundColor: '#282c34', color: 'white' }}>load</DialogButton>
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

export default SaveLoadView;
