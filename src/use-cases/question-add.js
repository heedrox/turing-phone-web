import db from '../db';
import calculateAiAnswer from '../server/calculate-ai-answer';

const QuestionAdd = {
  execute: async (gameId, playerName, question) => {
    const aiAnswer = await calculateAiAnswer(question);
    await db.setQuestion(gameId, playerName, question, aiAnswer);
  },
};

export default QuestionAdd;
