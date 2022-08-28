<script setup>
import QuestionForm from '../components/QuestionForm.vue';
import QuestionsToAnswer from '../components/QuestionsToAnswer.vue';
import QuestionsDetection from '../components/QuestionsDetection.vue';
</script>

<template>
  <q-page style="max-width: 32rem; margin:auto;">
    <QuestionForm v-if="!gameReady" :playerName="playerName" :gameContent="gameContent"/>
    <QuestionsToAnswer v-if="!gameReady"
                       :playerName="playerName"
                       :numberOfPlayers="numberOfPlayers"
                       :gameContent="gameContent"/>
    <QuestionsDetection v-if="gameReady"
                        :playerName="playerName"
                        :numberOfPlayers="numberOfPlayers"
                        :gameContent="gameContent"/>
  </q-page>
</template>

<script>
import db from '../db';

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
