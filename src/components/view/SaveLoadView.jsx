import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@rmwc/button';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogButton,
} from '@rmwc/dialog';
import { Snackbar } from '@rmwc/snackbar';
import { Typography } from '@rmwc/typography';

import {
  saveData, loadData, signIn, getUser, onAuthUpdate,
} from '../model/SaveLoad';
import { replaceActionLog } from '../model/ActionLog';
import { replaceInventory } from '../model/Inventory';

function SaveLoadView() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [confirmSignInOpen, setConfirmSignInOpen] = useState(false);
  const [confirmLoadOpen, setConfirmLoadOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const attemptSave = () => {
    setSnackbarMessage('attempting to save data...');
    setSnackbarOpen(true);

    saveData(data).then((res) => {
      setSnackbarMessage(res);
      setSnackbarOpen(true);
    });
  };

  const attemptLoad = () => {
    setSnackbarMessage('attempting to load data...');
    setSnackbarOpen(true);

    loadData().then((res) => {
      if (typeof (res) === 'string') {
        setSnackbarMessage(res);
        setSnackbarOpen(true);
      } else {
        const loadedData = res.loadedDoc.data().data;

        setSnackbarMessage(res.msg);
        setSnackbarOpen(true);

        dispatch(replaceActionLog({ newState: loadedData.actionLog }));
        dispatch(replaceInventory({ newState: loadedData.inventory }));
      }
    });
  };

  const attemptSignIn = () => {
    signIn()
      .then((res) => {
        const { email } = res.user;

        setSnackbarMessage(`successfully signed in as ${email}`);
        setSnackbarOpen(true);

        setCurrentUserEmail(email);
      })
      .catch((error) => {
        setSnackbarMessage(`error during sign in: ${error.code}`);
        setSnackbarOpen(true);
      });
  };

  const onSaveLoadClick = (action) => {
    if (!getUser()) {
      setConfirmSignInOpen(true);
    } else if (action === 's') {
      attemptSave();
    } else {
      setConfirmLoadOpen(true);
    }
  };

  useEffect(() => {
    onAuthUpdate(() => {
      const user = getUser();

      console.log('auth update');

      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail('');
      }
    });
  });

  return (
    <div className="save-load-container">
      <Typography use="caption">{currentUserEmail !== '' ? `logged in as ${currentUserEmail}` : 'not logged in'}</Typography>
      <div className="save-load-buttons-container">
        <Button raised label="save" onClick={() => onSaveLoadClick('s')} />
        <Button raised label="load" style={{ marginLeft: 10 }} onClick={() => onSaveLoadClick('l')} />
      </div>

      <Dialog open={confirmSignInOpen} onClose={() => setConfirmSignInOpen(false)}>
        <DialogTitle>please sign in</DialogTitle>
        <DialogContent>
          in order to save or load your data, you must sign in with a google account
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" isDefaultAction style={{ color: '#282c34' }}>cancel</DialogButton>
          <DialogButton raised action="accept" onClick={attemptSignIn} style={{ backgroundColor: '#282c34', color: 'white' }}>sign in</DialogButton>
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
