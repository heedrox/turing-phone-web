<script setup>
import {
  toRefs, ref, computed, defineEmits,
} from 'vue';
import prettyName from '../../lib/pretty-name';
import hashString from '../../lib/hash-string';

const emit = defineEmits(['answerSelected']);

const props = defineProps({
  playerName: String,
  question: Object,
  gameId: String,
  numberOfPlayers: Number,
});
const { question } = toRefs(props);

const selectedAnswer = ref(null);

const sendAnswer = async (answer) => {
  emit('answerSelected', { question: question.value, answer });
  selectedAnswer.value = answer;
};

const byPredefinedOrder = (a, b) => hashString(a.answer) - hashString(b.answer);
const clone = (o) => JSON.parse(JSON.stringify(o));

const possibleAnswersSorted = computed(() => (question.value
  ? clone(question.value.possibleAnswers).sort(byPredefinedOrder)
  : []));

const isSameAnswer = (a, b) => {
  if (!a || !b) return false;
  if (a.fromAi && b.fromAi) return true;
  if ((a.fromAi && !b.fromAi) || (!a.fromAi && b.fromAi)) return false;
  return (a.playerName === b.playerName);
};

</script>
<template>
  <q-card class="q-mt-md" flat bordered>
    <q-card-section class="q-pa-md card-title" separator>
      <p class="q-mb-none"><b>{{prettyName(question.playerName)}}:</b> {{question.question}}</p>
      </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">
      <q-list separator>
        <q-item clickable v-for="answer in possibleAnswersSorted" @click="sendAnswer(answer)"
        :key="answer" :class="{'bg-green-1': isSameAnswer(selectedAnswer, answer)}">
          <q-item-section><div>- {{answer.answer}}
            <q-badge class="q-ma-xs"
                     v-if="isSameAnswer(selectedAnswer, answer)"
                     color="primary"
                     :floating="false"
                     label="you"></q-badge>
          </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style lang="sass">
.card-title
  background-color: $primary-light
</style>
