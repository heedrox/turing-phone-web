import {
  collection, query, limit, doc, getDoc,
} from 'firebase/firestore/lite';
import { db } from './firebase/index';

const init = async () => {
  await query(collection(db, 'cities'), limit(2));
};

const getGame = async (gameId) => {
  const theDoc = await doc(db, 'games', gameId);
  const docSnap = await getDoc(theDoc);
  return docSnap.exists() ? docSnap.data() : null;
};

export default {
  init,
  getGame,
};
