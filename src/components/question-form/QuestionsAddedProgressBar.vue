<script setup>
import {
  ref, toRefs, watch, computed,
} from 'vue';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  LOADED: 'LOADED',
};

const getState = (game) => {
  if (!game || !game.gameId) return STATES.NOT_LOADED;
  return STATES.LOADED;
};

const props = defineProps({
  gameContent: Object,
});
const { gameContent } = toRefs(props);

const currentState = ref(STATES.NOT_LOADED);
const numberOfQuestionsSent = computed(() => (
  (gameContent && gameContent.value && gameContent.value.questions)
    ? Object.keys(gameContent.value.questions).length
    : 0
));

const numberOfPlayers = computed(() => (
  (gameContent && gameContent.value && gameContent.value.numberOfPlayers)
    ? parseInt(gameContent.value.numberOfPlayers, 10)
    : 0
));

watch(gameContent, (newGameContent) => {
  currentState.value = getState(newGameContent);
});
</script>
<template>
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
</template>
