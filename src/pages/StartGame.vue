<template>
  <h1>Home</h1>
  Game: {{$route.params.gameId}}
  {{gameContent}}
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
  },
};
</script>
