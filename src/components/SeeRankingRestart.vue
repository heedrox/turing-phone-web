<script setup>
import { ref, toRefs } from 'vue';
import db from '../db/index';

const props = defineProps({
  gameContent: Object,
});

const { gameContent } = toRefs(props);

const showDialog = ref(false);

const restart = () => {
  db.restart(gameContent.value.gameId, gameContent.value.numberOfPlayers, gameContent.value.lang);
};

</script>
<template>
  <div class="text-center q-ma-lg">
    <q-btn outline color="primary" label="START ANOTHER ONE" icon-right="add_ic_call"
    @click="showDialog = true"></q-btn>
  </div>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <p class="q-ml-sm">
          This will restart game immediately for all players.
        Make sure they have already see the ranking. Continue?</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Continue" color="primary" @click="restart" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>
