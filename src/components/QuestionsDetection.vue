<script setup>
import {
  ref, toRefs, watch, computed,
} from 'vue';
import QuestionToDetect from './QuestionToDetect.vue';
import db from '../db/index';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  LOADED: 'LOADED',
  SENDING: 'SENDING',
};

const getState = (game) => {
  if (!game || !game.gameId) return STATES.NOT_LOADED;
  return STATES.LOADED;
};

const props = defineProps({
  playerName: String,
  numberOfPlayers: Number,
  gameContent: Object,
});
const { playerName, numberOfPlayers, gameContent } = toRefs(props);

const currentState = ref(STATES.NOT_LOADED);
const selectedAnswers = ref({});

watch(gameContent, (newGameContent) => {
  currentState.value = getState(newGameContent);
});
const answerSelected = ({ question, answer }) => {
  selectedAnswers.value[question.playerName] = answer;
};
const allAnswered = computed(
  () => (Object.keys(selectedAnswers.value).length === numberOfPlayers.value)
               && (currentState.value === STATES.LOADED),
);

const confirmAnswers = async () => {
  currentState.value = STATES.SENDING;
  await db.setResults(gameContent.value.gameId, playerName.value, selectedAnswers.value);
  currentState.value = STATES.SENT;
};
</script>
<template>
  <div class="q-ma-md">

    <h6 class="q-mb-none q-mt-lg">Who's the <q-icon name="smart_toy"/> AI spy?</h6>
    <QuestionToDetect
        v-for="(question, player) in (gameContent.questions)"
        :question="question"
        :playerName="playerName"
        :gameId="gameContent.gameId"
        :number-of-players="numberOfPlayers"
        @answerSelected="answerSelected"
        :key="player">
      {{ question.question }}
    </QuestionToDetect>
    <q-btn color="primary"
           v-if="currentState !== STATES.SENT"
           :disabled="!allAnswered"
           class="full-width q-mt-lg"
           label="CONFIRM ALL ANSWERS"
           @click="confirmAnswers"
           icon-right="send" />
  </div>
</template>
