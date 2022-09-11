<script setup>
import { toRefs, ref, watch } from 'vue';
import prettyName from '../../lib/pretty-name';
import db from '../../db/index';

const props = defineProps({
  playerName: String,
  question: Object,
  gameId: String,
  numberOfPlayers: Number,
});
const { playerName, question, gameId } = toRefs(props);

const answer = ref('');
const isAnswered = ref(false);

const sendAnswer = async () => {
  if (!answer.value) return;
  await db.setAnswer(gameId.value, playerName.value, question.value.playerName, answer.value);
};

watch(question, (questionModified) => {
  const byPlayerName = (name) => (pa) => (pa.fromPlayer && pa.playerName === name);
  const myAnswer = questionModified.possibleAnswers
    ? questionModified.possibleAnswers.find(byPlayerName(playerName.value))
    : null;
  isAnswered.value = !!myAnswer;
  if (isAnswered.value) {
    answer.value = myAnswer.answer;
  }
});
</script>
<template>
  <q-card class="q-mt-md" flat bordered :class="{'bg-green-1': isAnswered }">
    <q-card-section class="q-pa-md">
      <p class="q-mb-none"><b>{{prettyName(question.playerName)}}:</b> {{question.question}}</p>
      <p class="q-mt-md q-mb-none" v-if="isAnswered"><b>You: </b> {{answer}}</p>
      <q-input
          v-if="!isAnswered"
          v-model="answer"
               label="Your answer:"
               :dense="false"
      />

    </q-card-section>
    <q-card-actions vertical v-if="!isAnswered">
      <q-btn
          label="SEND ANSWER"
          icon-right="send"
          color="primary"
          @click="sendAnswer"
          flat
      />
    </q-card-actions>

    <q-linear-progress size="3px"
                       :value="(question?.possibleAnswers?.length) / (numberOfPlayers + 1)"
                       color="green"
                       class="q-mt-sm">

    </q-linear-progress>
    <div class="absolute-bottom-right q-mb-xs q-mr-xs">
      <q-badge color="white"
               text-color="green"
               :label="`${question?.possibleAnswers?.length} / ${numberOfPlayers + 1}`"/>
    </div>
  </q-card>
</template>
