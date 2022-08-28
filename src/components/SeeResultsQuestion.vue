<script setup>
import { computed, toRefs } from 'vue';
import prettyName from '../lib/pretty-name';
import shuffle from '../lib/shuffle';

const props = defineProps({
  playerName: String,
  authorName: String,
  question: Object,
  results: Object,
});
const { question, results, playerName } = toRefs(props);

const allPlayers = computed(() => Object.keys(results.value));

const selectedAnswer = computed(() => {
  const author = question.value.playerName;
  return results.value[playerName.value].selectedAnswers[author];
});

const possibleAnswersRandom = computed(() => (question.value
  ? shuffle(question.value.possibleAnswers)
  : []));

const isSelected = (answer) => (selectedAnswer.value.answer === answer.answer
    && selectedAnswer.value.playerName === answer.playerName);

const answerOfPlayerForQuestion = (player, qtn) => results.value[player]
  .selectedAnswers[qtn.playerName];

const isSameAnswer = (a, b) => a.answer === b.answer && a.playerName === b.playerName;

const playersWhoAnswered = (answer) => allPlayers.value.map((player) => ({
  player,
  itsAnswer: answerOfPlayerForQuestion(player, question.value),
}))
  .filter(({ itsAnswer }) => isSameAnswer(itsAnswer, answer))
  .map((res) => res.player);

const getClass = (answer) => {
  if (!isSelected(answer)) return '';
  if (answer.fromAi) return 'bg-green-1';
  return 'bg-red-2';
};
</script>
<template>
  <q-card class="q-mt-md" flat bordered>
    <q-card-section class="q-pa-md card-title" separator>
      <p class="q-mb-none"><b>{{ prettyName(question.playerName) }}:</b> {{ question.question }}</p>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-pa-none">
      <q-list separator>
        <q-item v-for="answer in possibleAnswersRandom"
                :key="answer" :class="getClass(answer)">
          <q-item-section>
            <div>
              <span class="text-red-8" v-if="answer.fromPlayer">
                {{prettyName(answer.playerName)}}
              </span>
              <span class="text-green-8" v-if="answer.fromAi"><q-icon name="smart_toy"/></span>
              <span class="text-grey-6"> - </span>
              {{ answer.answer }}
              <q-badge v-for="player in playersWhoAnswered(answer)"
                       class="q-ma-xs"
                       :color="(player === playerName)? 'primary' : 'secondary'"
                       :floating="false"
                       :label="prettyName(player)"
                       :key="`${answer.answer}_${player}`"
              >
              </q-badge>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section class="bg-grey-2 q-pt-sm q-pb-sm text-caption">
      <span v-if="selectedAnswer.fromAi">Correct answer +10</span>
      <span v-if="selectedAnswer.fromPlayer">Wrong answer -10</span>

    </q-card-section>
  </q-card>
</template>