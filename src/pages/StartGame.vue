<script setup>
import QuestionForm from '../components/QuestionForm.vue';
import QuestionsToAnswer from '../components/QuestionsToAnswer.vue';
</script>

<template>
  <q-page >
    <QuestionForm :playerName="playerName" :gameContent="gameContent" />
    <QuestionsToAnswer :playerName="playerName"
                       :numberOfPlayers="numberOfPlayers"
                       :gameContent="gameContent" />
  </q-page>
</template>

<script>
import db from '../db';

export default {
  name: 'StartGame',
  data() {
    return {
      gameContent: {
        type: Object,
      },
      playerName: '',
      numberOfPlayers: 0,
    };
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
