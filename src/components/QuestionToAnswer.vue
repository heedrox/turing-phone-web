<script setup>
import { toRefs, ref, watch } from 'vue';
import prettyName from '../lib/pretty-name';
import db from '../db/index';

const props = defineProps({
  playerName: String,
  question: Object,
  gameId: String,
});
const { playerName, question, gameId } = toRefs(props);

const answer = ref('');
const isAnswered = ref(false);

const sendAnswer = async () => {
  await db.setAnswer(gameId.value, playerName.value, question.value.playerName, answer.value);
};

watch(question, (questionModified) => {
  const byPlayerName = (name) => (pa) => pa.fromPlayer && pa.playerName === name;
  const myAnswer = questionModified.possibleAnswers
    ? questionModified.possibleAnswers.find(byPlayerName(playerName))
    : null;
  isAnswered.value = !!myAnswer;
});
</script>
<template>
  <q-card class="q-mt-md" flat bordered>
    <q-card-section class="q-pa-md">
      <q-input v-model="answer"
               :label="question.question"
               :dense="false"
               :hint="`from ${prettyName(question.playerName)}
               ${question.playerName === playerName?'(you)':''}`" />
      <q-btn
          label="SEND ANSWER"
          icon-right="send"
          color="primary"
          @click="sendAnswer"
          glossy
          outlined
          class="q-mt-md"
      />
    </q-card-section>
  </q-card>
</template>
