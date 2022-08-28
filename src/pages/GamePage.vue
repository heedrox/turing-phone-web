<script setup>
import QuestionForm from '../components/QuestionForm.vue';
import QuestionsToAnswer from '../components/QuestionsToAnswer.vue';
import QuestionsDetection from '../components/QuestionsDetection.vue';
import SeeResults from '../components/SeeResults.vue';
</script>

<template>
  <q-page style="max-width: 32rem; margin:auto;">
    <div v-if="currentState === STATES.NOT_LOADED">Loading...</div>
    <QuestionForm v-if="currentState === STATES.ADDING_ANSWERS"
                  playerName="playerName"
                  :gameContent="gameContent"/>
    <QuestionsToAnswer  v-if="currentState === STATES.ADDING_ANSWERS"
                       :playerName="playerName"
                       :numberOfPlayers="numberOfPlayers"
                       :gameContent="gameContent"/>
    <QuestionsDetection  v-if="currentState === STATES.READY_TO_PLAY"
                        :playerName="playerName"
                        :numberOfPlayers="numberOfPlayers"
                        :gameContent="gameContent"/>
    <SeeResults v-if="currentState === STATES.SEEING_RESULTS"
                :playerName="playerName"
                :numberOfPlayers="numberOfPlayers"
                :gameContent="gameContent"></SeeResults>
  </q-page>
</template>

<script>
import db from '../db';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  ADDING_ANSWERS: 'ADDING_ANSWERS',
  READY_TO_PLAY: 'READY_TO_PLAY',
  SEEING_RESULTS: 'SEEING_RESULTS',
};

export default {
  name: 'GamePage',
  data() {
    return {
      gameContent: {
        type: Object,
      },
      playerName: '',
      numberOfPlayers: 0,
    };
  },
  computed: {
    numbersOfQuestionsMade() {
      return ((this.gameContent && this.gameContent.questions)
        ? Object.keys(this.gameContent?.questions).length
        : 0);
    },
    allQuestionsMade() {
      return this.numbersOfQuestionsMade === this.numberOfPlayers;
    },
    allQuestionsAnswered() {
      const possibleQuestions = this.gameContent?.questions ? this.gameContent.questions : [];
      const questions = Object.values(possibleQuestions);
      const byComplete = (q) => q.possibleAnswers.length === (this.numberOfPlayers + 1);
      const numQuestionsComplete = questions.filter(byComplete).length;
      return numQuestionsComplete === this.numberOfPlayers;
    },
    gameReady() {
      return this.allQuestionsAnswered && this.allQuestionsMade;
    },
    resultsSent() {
      return this.gameContent
          && this.gameContent.results
          && this.gameContent.results[this.playerName];
    },
    currentState() {
      if (!this.gameContent?.gameId) return STATES.NOT_LOADED;
      if (!this.gameReady) return STATES.ADDING_ANSWERS;
      if (!this.resultsSent) return STATES.READY_TO_PLAY;
      return STATES.SEEING_RESULTS;
    },
  },
  async mounted() {
    const gameId = this.$route.params.gameId.toLowerCase();
    this.playerName = this.$route.params.playerName;
    this.numberOfPlayers = parseInt(this.$route.params.numberOfPlayers, 10);
    this.gameContent = await db.getGame(gameId, {
      gameId,
      numberOfPlayers: this.$route.params.numberOfPlayers,
    });
    db.onGameChange(gameId, (gameContent) => {
      this.gameContent = gameContent;
    });
  },
};
</script>
