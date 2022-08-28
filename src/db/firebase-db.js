import {
  doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion,
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
  return docSnap.exists() ? docSnap.data() : defaultDataIfNotExists;
};

const onGameChange = (gameId, callback) => {
  onSnapshot(doc(db, 'games', gameId), (theDoc) => {
    callback(theDoc.data());
  });
};

const setQuestion = async (gameId, playerName, question, aiAnswer) => {
  const theDoc = await doc(db, `games/${gameId}`);
  await updateDoc(theDoc, {
    [`questions.${playerName}`]: {
      playerName,
      question,
      possibleAnswers: [
        { fromAi: true, fromPlayer: false, answer: aiAnswer },
      ],
    },
  });
};

const setAnswer = async (gameId, playerName, playerOfQuestion, playerAnswer) => {
  const theDoc = await doc(db, `games/${gameId}`);
  await updateDoc(theDoc, {
    [`questions.${playerOfQuestion}.possibleAnswers`]: arrayUnion({
      answer: playerAnswer,
      fromAi: false,
      fromPlayer: true,
      playerName,
    }),
  });
};

const setResults = async (gameId, playerName, selectedAnswers) => {
  const theDoc = await doc(db, `games/${gameId}`);
  await updateDoc(theDoc, {
    [`results.${playerName}`]: {
      selectedAnswers,
      playerName,
    },
  });
};

const setScore = async (gameId, playerName, totalScore) => {
  const theDoc = await doc(db, `games/${gameId}`);
  await updateDoc(theDoc, {
    [`scores.${playerName}`]: totalScore,
  });
};

const restart = async (gameId, numberOfPlayers) => {
  const theDoc = await doc(db, `games/${gameId}`);
  await setDoc(theDoc, {
    gameId,
    numberOfPlayers,
  });
};
export default {
  init,
  getGame,
  onGameChange,
  setQuestion,
  setAnswer,
  setResults,
  setScore,
  restart,
};
