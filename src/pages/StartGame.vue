<script setup>
import QuestionForm from '../components/QuestionForm.vue';
</script>

<template>
  <q-page >
    <QuestionForm :playerName="playerName" :gameContent="gameContent"/>
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
    };
  },
  async mounted() {
    const gameId = this.$route.params.gameId.toLowerCase();
    this.playerName = this.$route.params.playerName;
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
