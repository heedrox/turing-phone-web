const SERVER_URL = 'https://us-central1-turing-phone-game.cloudfunctions.net/aiTest';

const calculateAiAnswer = async (question) => {
  const response = await fetch(`${SERVER_URL}?question=${encodeURIComponent(question)}`);
  if (!response.ok) {
    throw new Error('UNKNOWN_ERROR');
  }
  const json = await response.json();
  return json.possibleAnswer;
};

export default calculateAiAnswer;
