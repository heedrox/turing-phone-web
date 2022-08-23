import db from '../db';

const QuestionAdd = {
  execute: async (gameId, playerName, question) => {
    await db.setQuestion(gameId, playerName, question);
  },
};

export default QuestionAdd;
