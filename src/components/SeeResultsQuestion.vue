<script setup>
import { computed, toRefs } from 'vue';
import prettyName from '../lib/pretty-name';
import { getScoreForQuestion, numberOfPlayersWhoSelectedAnswerFrom } from '../lib/score-calculator';
import hashString from '../lib/hash-string';
import clone from '../lib/clone';

const isSameAnswer = (a, b) => a.answer === b.answer && a.playerName === b.playerName;

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

const isSelected = (answer) => isSameAnswer(selectedAnswer.value, answer);

const answerOfPlayerForQuestion = (player, qtn) => results.value[player]
  .selectedAnswers[qtn.playerName];

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

const numberOfPlayersWhoSelectedMyAnswer = () => (
  numberOfPlayersWhoSelectedAnswerFrom(question.value, playerName.value, results.value)
);

const scoreOfCurrentQuestion = computed(() => (
  getScoreForQuestion(question.value, playerName.value, results.value)
));

const byPredefinedOrder = (a, b) => hashString(a.answer) - hashString(b.answer);

const possibleAnswersSorted = computed(() => (question.value
  ? clone(question.value.possibleAnswers).sort(byPredefinedOrder)
  : []));

</script>
<template>
  <q-card class="q-mt-md" flat bordered>
    <q-card-section class="q-pa-md card-title" separator>
      <p class="q-mb-none"><b>{{ prettyName(question.playerName) }}:</b> {{ question.question }}</p>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-pa-none">
      <q-list separator>
        <q-item v-for="answer in possibleAnswersSorted"
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
      <p class="q-mb-none" v-if="selectedAnswer.fromAi">Points for correct answer: +20 pts.</p>
      <p class="q-mb-none" v-if="selectedAnswer.fromPlayer">Points for wrong answer: -20 pts.</p>
      <p class="q-ma-none">Points from players that chose your answer:
        +{{numberOfPlayersWhoSelectedMyAnswer() * 5}} pts
        <span class="text-grey-8">({{numberOfPlayersWhoSelectedMyAnswer()}} players)</span>
        </p>
      <p class="absolute-right q-ma-md text-bold" style="font-size:1rem">
        <span v-if="scoreOfCurrentQuestion>0"> + </span>
        <span v-if="scoreOfCurrentQuestion<0"> - </span>
        {{Math.abs(scoreOfCurrentQuestion)}}</p>
    </q-card-section>
  </q-card>
</template>
