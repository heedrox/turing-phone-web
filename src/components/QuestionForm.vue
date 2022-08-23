<script setup>
import { ref, toRefs, computed } from 'vue';
import QuestionAdd from '../use-cases/question-add';

const STATES = {
  NOT_SENT: 'NOT_SENT',
  SENDING: 'SENDING',
  SENT: 'SENT',
};

const capitalize = (name) => name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
const getState = (game, playerName) => {
  if (game.questions && game.questions[playerName] && (game.questions[playerName].length > 0)) {
    return STATES.SENT;
  }
  return STATES.NOT_SENT;
};

const props = defineProps({
  playerName: String,
  gameContent: Object,
});
const { playerName, gameContent } = toRefs(props);

const capitalizedName = computed(() => capitalize(playerName.value));

const question = ref('');
const currentState = ref(STATES.NOT_SENT);

const sendQuestion = async () => {
  currentState.value = STATES.SENDING;
  await QuestionAdd.execute(gameContent.value.gameId, playerName.value, question.value);
  currentState.value = STATES.SENT;
};

currentState.value = getState(gameContent.value, playerName.value);
</script>
<template>
  <div class="q-ma-md">
    <h5 class="q-mb-md">Hello, {{ capitalizedName }}</h5>
    <p v-if="currentState === STATES.NOT_SENT">Make a question to your friends and to the
      <q-icon name="smart_toy"/>
      AI spy:
    </p>
    <p v-if="currentState !== STATES.NOT_SENT">This is your question:
    </p>

    <q-input
        v-model="question"
        outlined
        autogrow
        class="q-mb-md"
        :readonly="currentState !== STATES.NOT_SENT"
    />
    <q-btn
        label="SEND"
        icon-right="send"
        color="primary"
        @click="sendQuestion"
        glossy
        outlined
        v-if="currentState === STATES.NOT_SENT"
    />
  </div>
</template>
