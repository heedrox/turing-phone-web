<script setup>
import { computed, ref, toRefs } from 'vue';
import db from '../db';
import { getScoreForQuestion } from '../lib/score-calculator';

const props = defineProps({
  playerName: String,
  numberOfPlayers: Number,
  gameContent: Object,
});

const { gameContent, playerName } = toRefs(props);

const totalScore = computed(() => Object.values(gameContent.value.questions)
  .map((q) => getScoreForQuestion(q, playerName.value, gameContent.value.results))
  .reduce((partialSum, a) => partialSum + a, 0));

const seeRanking = async () => {
  await db.setScore(gameContent.value.gameId, playerName.value, totalScore.value);
};

const showDialog = ref(false);
</script>
<template>
  <div class="row q-pt-lg ">
    <div class="col">
      <p class="text-bold q-ma-none q-pa-none q-mt-sm" style="size: 1.5rem;">
        Your score: {{ totalScore }} pts.
      </p>
    </div>
    <div class="col text-right">
      <q-btn
          outline
          color="primary"
          icon-right="emoji_events"
          label="SEE RANKING"
          @click="showDialog = true"></q-btn>
    </div>
    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <p class="q-ml-sm">
            <b>WAIT!</b> Make sure you have checked all this information, because you
          cannot go back. Are you sure?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Continue" color="primary" @click="seeRanking" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
