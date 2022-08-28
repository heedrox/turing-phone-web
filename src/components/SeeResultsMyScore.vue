<script setup>
import { computed, toRefs } from 'vue';
import db from '../db';
import { getScoreForQuestion } from '../lib/score-calculator';

const props = defineProps({
  playerName: String,
  numberOfPlayers: Number,
  gameContent: Object,
});

const { gameContent, playerName } = toRefs(props);

const totalScore = computed(() => Object.values(gameContent.value.questions)
  .map((q) => getScoreForQuestion(q, playerName.value, gameContent.value.results))
  .reduce((partialSum, a) => partialSum + a, 0));

const seeRanking = async () => {
  await db.setScore(gameContent.value.gameId, playerName.value, totalScore.value);
};
</script>
<template>
  <div class="row q-pt-lg ">
    <div class="col">
      <p class="text-bold q-ma-none q-pa-none q-mt-sm" style="size: 1.5rem;">
        Your score: {{ totalScore }} pts.
      </p>
    </div>
    <div class="col text-right">
      <q-btn
          outline
          color="primary"
          icon-right="emoji_events"
          label="SEE RANKING"
          @click="seeRanking"></q-btn>
    </div>
  </div>
</template>
