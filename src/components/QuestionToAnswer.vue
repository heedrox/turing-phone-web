<script setup>
import { toRefs } from 'vue';
import prettyName from '../lib/pretty-name';

const props = defineProps({
  playerName: String,
  question: Object,
});
const { question } = toRefs(props);

</script>
<template>
  <q-card class="q-mt-md" flat bordered>
    <q-card-section class="q-pa-md">
      <q-input v-model="text"
               :label="question.question"
               :dense="false"
               :hint="`from ${prettyName(question.playerName)}
               ${question.playerName === playerName?'(you)':''}`" />
      <q-btn
          label="SEND ANSWER"
          icon-right="send"
          color="primary"
          @click="sendQuestion"
          glossy
          outlined
          class="q-mt-md"
      />
    </q-card-section>
  </q-card>
</template>
