<script setup>
import QuestionForm from '../components/QuestionForm.vue';
</script>

<template>
  <q-page >
    <QuestionForm />
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
    };
  },
  async mounted() {
    const gameId = this.$route.params.gameId.toLowerCase();
    this.gameContent = await db.getGame(gameId);
    db.onGameChange(gameId, (gameContent) => {
      this.gameContent = gameContent;
    });
  },
};
</script>
