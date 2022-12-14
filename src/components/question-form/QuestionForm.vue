<script setup>
import {
  ref, toRefs, computed, watch,
} from 'vue';
import QuestionAdd from '../../use-cases/question-add';
import prettyName from '../../lib/pretty-name';
import QuestionsAddedProgressBar from './QuestionsAddedProgressBar.vue';

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  NOT_SENT: 'NOT_SENT',
  SENDING: 'SENDING',
  SENT: 'SENT',
};

const playerMadeQuestion = (game, playerName) => game
    && game.questions
    && game.questions[playerName]
    && game.questions[playerName].question;

const getState = (game, playerName) => {
  if (!game || !game.gameId) return STATES.NOT_LOADED;
  if (playerMadeQuestion(game, playerName)) {
    return STATES.SENT;
  }
  return STATES.NOT_SENT;
};

const props = defineProps({
  playerName: String,
  gameContent: Object,
});
const { playerName, gameContent } = toRefs(props);

const capitalizedName = computed(() => prettyName(playerName.value));

const question = ref('');
const currentState = computed(() => (
  getState(gameContent.value, playerName.value)
));

const sendQuestion = async () => {
  if (question.value.trim() === '') return;
  await QuestionAdd.execute(
    gameContent.value.gameId,
    playerName.value,
    question.value,
    gameContent.value.lang,
  );
};

watch(gameContent, (newGameContent) => {
  if (playerMadeQuestion(newGameContent, playerName.value)) {
    question.value = newGameContent.questions[playerName.value].question;
  }
});

</script>
<template>
  <div class="q-ma-md">
    <div v-if="currentState === STATES.NOT_LOADED">Loading</div>
    <div v-else>
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
          required
          autofocus
          :rules="[val => !!val || 'Field is required']"
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
      <QuestionsAddedProgressBar :game-content="gameContent" />
    </div>
  </div>
</template>
