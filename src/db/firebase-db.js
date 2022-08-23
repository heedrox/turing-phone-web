import {
  doc, getDoc, setDoc, onSnapshot,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase/index';
import config from './firebase/config';

const init = async () => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, config.custom.auth.email, config.custom.auth.password);
};

const getGame = async (gameId, defaultDataIfNotExists = {}) => {
  const theDoc = await doc(db, 'games', gameId);
  const docSnap = await getDoc(theDoc);
  if (!docSnap.exists()) {
    await setDoc(theDoc, defaultDataIfNotExists);
  }
  return docSnap.exists() ? docSnap.data() : null;
};

const onGameChange = (gameId, callback) => {
  onSnapshot(doc(db, 'games', gameId), (theDoc) => {
    callback(theDoc.data());
  });
};

const setQuestion = async (gameId, playerName, question) => {
  const theDoc = await doc(db, `games/${gameId}/questions`, playerName)
  await setDoc(theDoc, {
    playerName,
    question,
    possibleAnswers: [],
  });
};

export default {
  init,
  getGame,
  onGameChange,
  setQuestion,
};
