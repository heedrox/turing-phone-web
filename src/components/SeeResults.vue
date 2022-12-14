<script setup>
import { toRefs, computed } from 'vue';
import SeeResultsWaiting from './SeeResultsWaiting.vue';
import SeeResultsQuestion from './SeeResultsQuestion.vue';
import SeeResultsMyScore from './SeeResultsMyScore.vue';
import SeeRanking from './SeeRanking.vue';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  WAITING_FOR_PLAYERS: 'WAITING_FOR_PLAYERS',
  SEEING_RESULTS: 'SEEING_RESULTS',
  SEEING_RANKING: 'SEING_RANKING',
};

const props = defineProps({
  playerName: String,
  numberOfPlayers: Number,
  gameContent: Object,
});

const { playerName, numberOfPlayers, gameContent } = toRefs(props);

const numberOfResults = computed(() => Object.keys(gameContent.value?.results).length);
const sortedQuestions = computed(() => {
  const byTimestamp = (a, b) => (a.created ? a.created.toMillis() : 0)
      - (b.created ? b.created.toMillis() : 0);
  return Object.values(gameContent.value.questions).sort(byTimestamp);
});

const currentState = computed(() => {
  if (!gameContent.value) return STATES.NOT_LOADED;
  if (numberOfResults.value !== numberOfPlayers.value) return STATES.WAITING_FOR_PLAYERS;
  if (!gameContent.value.scores) return STATES.SEEING_RESULTS;
  if (typeof gameContent.value?.scores[playerName.value] === 'undefined') return STATES.SEEING_RESULTS;
  return STATES.SEEING_RANKING;
});
</script>
<template>
  <div>
    <SeeResultsWaiting v-if="currentState === STATES.WAITING_FOR_PLAYERS"
                       :number-of-players="numberOfPlayers" :number-of-results="numberOfResults" />
    <SeeResultsMyScore v-if="currentState === STATES.SEEING_RESULTS"
                       :player-name="playerName"
                       :game-content="gameContent"
                       :number-of-players="numberOfPlayers"
                       ></SeeResultsMyScore>
    <SeeResultsQuestion v-for="question in
    (currentState === STATES.SEEING_RESULTS ? sortedQuestions : [])"
                        :question="question"
                        :player-name="playerName"
                        :results="gameContent.results"
                        :key="question.playerName"></SeeResultsQuestion>
    <SeeRanking v-if="currentState === STATES.SEEING_RANKING"
                :player-name="playerName"
                :game-content="gameContent"
                :number-of-players="numberOfPlayers"
    ></SeeRanking>
  </div>
</template>
