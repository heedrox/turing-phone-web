<script setup>
import {
  ref, toRefs, watch, computed,
} from 'vue';
import QuestionToAnswer from './QuestionToAnswer.vue';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  LOADED: 'LOADED',
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
const numberOfQuestionsSent = computed(() => (
  (gameContent && gameContent.value && gameContent.value.questions)
    ? Object.keys(gameContent.value.questions).length
    : 0
));

const sortedQuestions = computed(() => {
  const byTimestamp = (a, b) => (a.created ? a.created.toMillis() : 0)
      - (b.created ? b.created.toMillis() : 0);
  return Object.values(gameContent.value.questions).sort(byTimestamp);
});

watch(gameContent, (newGameContent) => {
  currentState.value = getState(newGameContent);
});
</script>
<template>
  <div class="q-ma-md">
    <div v-if="currentState === STATES.LOADED">
      <q-linear-progress size="30px"
                         :value="numberOfQuestionsSent / numberOfPlayers"
                         color="primary"
                         class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="white"
                   text-color="primary"
                   :label="`Total questions sent:
                   ${numberOfQuestionsSent } / ${ numberOfPlayers }`"/>
        </div>
      </q-linear-progress>
      <div v-if="numberOfQuestionsSent > 0">
        <h6 class="q-mb-none q-mt-lg">Answer these questions:</h6>
        <QuestionToAnswer
            v-for="question in sortedQuestions"
            :question="question"
            :playerName="playerName"
            :gameId="gameContent.gameId"
            :number-of-players="numberOfPlayers"
            :key="question.playerName"
        />
      </div>
    </div>
  </div>
</template>
