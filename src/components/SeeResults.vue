<script setup>
import { toRefs, computed } from 'vue';
import SeeResultsWaiting from './SeeResultsWaiting.vue';
import SeeResultsQuestion from './SeeResultsQuestion.vue';

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

const { numberOfPlayers, gameContent } = toRefs(props);

const numberOfResults = computed(() => Object.keys(gameContent.value?.results).length);

const currentState = computed(() => {
  if (!gameContent.value) return STATES.NOT_LOADED;
  if (numberOfResults.value !== numberOfPlayers.value) return STATES.WAITING_FOR_PLAYERS;
  return STATES.SEEING_RESULTS;
});

</script>
<template>
  <div>
    <SeeResultsWaiting v-if="currentState === STATES.WAITING_FOR_PLAYERS"
                       :number-of-players="numberOfPlayers" :number-of-results="numberOfResults" />
    <SeeResultsQuestion v-for="(question, authorName) in gameContent.questions"
                        :question="question"
                        :playerName="playerName"
                        :key="authorName"></SeeResultsQuestion>
  </div>
</template>
