import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, setDoc, getDoc,
} from 'firebase/firestore';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
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

async function saveData(data) {
  try {
    await setDoc(doc(db, 'users', auth.currentUser.email), {
      data,
    });
  } catch (error) {
    return `error during save: ${error.code}`;
  }

  return 'save success!';
}

async function loadData() {
  let loadedDoc;

  try {
    loadedDoc = await getDoc(doc(db, 'users', auth.currentUser.email));
  } catch (error) {
    return `error during load: ${error.code}`;
  }

  if (!loadedDoc.exists()) {
    return `error during load: no save data found for ${auth.currentUser.email}`;
  }

  return { msg: 'load success!', loadedDoc };
}

function signIn() {
  return signInWithPopup(auth, provider);
}

function getUser() {
  return auth.currentUser;
}

function onAuthUpdate(callback) {
  return onAuthStateChanged(auth, callback);
}

export {
  saveData, loadData, signIn, getUser, onAuthUpdate,
};
