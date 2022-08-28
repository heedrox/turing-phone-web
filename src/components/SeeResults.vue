<script setup>
import { toRefs, computed } from 'vue';
import SeeResultsWaiting from './SeeResultsWaiting.vue';
import SeeResultsQuestion from './SeeResultsQuestion.vue';
import SeeResultsMyScore from './SeeResultsMyScore.vue';
import { getScoreForQuestion } from '../lib/score-calculator';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  WAITING_FOR_PLAYERS: 'WAITING_FOR_PLAYERS',
  SEEING_RESULTS: 'SEEING_RESULTS',
};

const props = defineProps({
  playerName: String,
  numberOfPlayers: Number,
  gameContent: Object,
});

const { playerName, numberOfPlayers, gameContent } = toRefs(props);

const numberOfResults = computed(() => Object.keys(gameContent.value?.results).length);

const currentState = computed(() => {
  if (!gameContent.value) return STATES.NOT_LOADED;
  if (numberOfResults.value !== numberOfPlayers.value) return STATES.WAITING_FOR_PLAYERS;
  return STATES.SEEING_RESULTS;
});

const totalScore = computed(() => Object.values(gameContent.value.questions)
  .map((q) => getScoreForQuestion(q, playerName.value, gameContent.value.results))
  .reduce((partialSum, a) => partialSum + a, 0));
</script>
<template>
  <div>
    <SeeResultsWaiting v-if="currentState === STATES.WAITING_FOR_PLAYERS"
                       :number-of-players="numberOfPlayers" :number-of-results="numberOfResults" />
    <SeeResultsMyScore v-if="currentState === STATES.SEEING_RESULTS"
                       :total-score="totalScore"></SeeResultsMyScore>
    <div>
      <q-btn class="text-center" v-if="currentState === STATES.SEEING_RESULTS"
             icon-right="emoji_events"
      label="SEE RANKING"></q-btn>
    </div>
    <SeeResultsQuestion v-for="(question, authorName) in gameContent.questions"
                        :question="question"
                        :playerName="playerName"
                        :results="gameContent.results"
                        :key="authorName"></SeeResultsQuestion>
  </div>
</template>
