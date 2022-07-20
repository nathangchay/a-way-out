import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, setDoc, getDoc,
} from 'firebase/firestore';
import {
  getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8Xtngm_iFsu5PJIANlk9hDtAweY6g3Bg',
  authDomain: 'a-way-out-85a6c.firebaseapp.com',
  projectId: 'a-way-out-85a6c',
  storageBucket: 'a-way-out-85a6c.appspot.com',
  messagingSenderId: '428838676893',
  appId: '1:428838676893:web:1dac2accadd0b105ef6774',
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const db = getFirestore();
const auth = getAuth();

function getCurrentDateTime() {
  const currentDate = new Date();

  const date = currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const month = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const minutes = currentDate.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const seconds = currentDate.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  const formattedDate = `${date}/${month}/${year} @ ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

async function saveData(data, auto) {
  const lastSaved = getCurrentDateTime();

  try {
    await setDoc(doc(db, 'users', auth.currentUser.email), {
      ...data,
      lastSaved,
    });
  } catch (error) {
    console.log(error);
    console.log(data);
    return `Error during save: ${error.code}`;
  }

  return { msg: `${auto ? 'Autosave' : 'Save'} success!`, lastSaved };
}

async function loadData() {
  let loadedDoc;

  try {
    loadedDoc = await getDoc(doc(db, 'users', auth.currentUser.email));
  } catch (error) {
    return `Error during load: ${error.code}`;
  }

  if (!loadedDoc.exists()) {
    return `Error during load: No save data found for ${auth.currentUser.email}`;
  }

  return { msg: 'Load success!', data: loadedDoc.data() };
}

async function getLastSaved() {
  let lastSaved = 'Never';

  await loadData().then((res) => {
    if (typeof (res) !== 'string') {
      lastSaved = res.data.lastSaved;
    }
  });

  return lastSaved;
}

function login() {
  return signInWithPopup(auth, provider);
}

function logout() {
  return signOut(auth);
}

function getUser() {
  return auth.currentUser;
}

function onAuthUpdate(callback) {
  return onAuthStateChanged(auth, callback);
}

export {
  saveData, loadData, getLastSaved, login, logout, getUser, onAuthUpdate,
};
