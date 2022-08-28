<script setup>
import { computed, toRefs } from 'vue';
import prettyName from '../lib/pretty-name';
import SeeRankingWaiting from './SeeRankingWaiting.vue';
import SeeRankingRestart from './SeeRankingRestart.vue';

const STATES = {
  WAITING_FOR_PLAYERS: 'WAITING_FOR_PLAYERS',
  SEEING_RANKING: 'SEEING_RANKING',
};

const props = defineProps({
  playerName: String,
  numberOfPlayers: Number,
  gameContent: Object,
});

const { numberOfPlayers, gameContent } = toRefs(props);

const numberOfScores = computed(() => Object.keys(gameContent.value?.scores
  ? gameContent.value?.scores
  : []).length);

const currentState = computed(() => {
  if (!numberOfPlayers.value) return STATES.WAITING_FOR_PLAYERS;
  if (numberOfScores.value < numberOfPlayers.value) return STATES.WAITING_FOR_PLAYERS;
  return STATES.SEEING_RANKING;
});

const ranking = computed(() => {
  const byScore = (a, b) => b.score - a.score;
  return Object.keys(gameContent.value.scores)
    .map((player) => ({ player, score: gameContent.value.scores[player] }))
    .sort(byScore);
});
</script>
<template>
  <SeeRankingWaiting v-if="currentState === STATES.WAITING_FOR_PLAYERS"
                     :number-of-players="numberOfPlayers" :number-of-scores="numberOfScores"/>
  <q-card class="q-mt-lg" v-if="currentState === STATES.SEEING_RANKING">
    <q-markup-table>
      <thead>
      <tr>
        <th class="text-center">Pos.</th>
        <th class="text-left">Player</th>
        <th class="text-right">Score</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rank, idx) in ranking" :key="idx" :class="{ 'text-bold bg-green-1': idx === 0}">
        <td class="text-center">{{ idx + 1}}</td>
        <td class="text-left">{{ prettyName(rank.player) }}</td>
        <td class="text-right">{{ rank.score }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </q-card>
  <SeeRankingRestart v-if="currentState === STATES.SEEING_RANKING"
                     :game-content="gameContent"></SeeRankingRestart>
</template>
