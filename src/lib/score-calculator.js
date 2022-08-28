const selectedAnswer = (question, playerName, results) => {
  const author = question.playerName;
  return results[playerName].selectedAnswers[author];
};

const allPlayers = (results) => Object.keys(results);

const isSameAnswer = (a, b) => a.answer === b.answer && a.playerName === b.playerName;
const answerOfPlayerForQuestion = (player, qtn, results) => results[player]
  .selectedAnswers[qtn.playerName];

const playersWhoAnswered = (answer, question, results) => allPlayers(results).map((player) => ({
  player,
  itsAnswer: answerOfPlayerForQuestion(player, question, results),
}))
  .filter(({ itsAnswer }) => isSameAnswer(itsAnswer, answer))
  .map((res) => res.player);

const numberOfPlayersWhoSelectedAnswerFrom = (question, playerName, results) => {
  const createdAnswerOfPlayer = question.possibleAnswers
    .find((pa) => pa.fromPlayer && pa.playerName === playerName);
  return playersWhoAnswered(createdAnswerOfPlayer, question, results)
    .filter((p) => p !== playerName).length;
};

const getPointsForSelectedAnswer = (question, playerName, results) => (
  selectedAnswer(question, playerName, results).fromAi ? 20 : -20
);

const getPointsForOthersInQuestion = (question, playerName, results) => (
  numberOfPlayersWhoSelectedAnswerFrom(question, playerName, results) * 5
);

const getScoreForQuestion = (question, playerName, results) => (
  getPointsForSelectedAnswer(question, playerName, results)
  + getPointsForOthersInQuestion(question, playerName, results)
);

export {
  getPointsForSelectedAnswer,
  getPointsForOthersInQuestion,
  numberOfPlayersWhoSelectedAnswerFrom,
  getScoreForQuestion,
};
