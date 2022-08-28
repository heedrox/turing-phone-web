<script setup>
import {
  toRefs, ref, computed, defineEmits,
} from 'vue';
import prettyName from '../lib/pretty-name';
import shuffle from '../lib/shuffle';

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

const possibleAnswersRandom = computed(() => (question.value
  ? shuffle(question.value.possibleAnswers)
  : []));

</script>
<template>
  <q-card class="q-mt-md" flat bordered>
    <q-card-section class="q-pa-md card-title" separator>
      <p class="q-mb-none"><b>{{prettyName(question.playerName)}}:</b> {{question.question}}</p>
      </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">
      <q-list separator>
        <q-item clickable v-for="answer in possibleAnswersRandom" @click="sendAnswer(answer)"
        :key="answer" :class="{'bg-green-1': (selectedAnswer === answer)}">
          <q-item-section><div>- {{answer.answer}}
            <q-badge class="q-ma-xs"
                     v-if="selectedAnswer === answer"
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
