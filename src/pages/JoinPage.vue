<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import db from '../db';
import hash from '../lib/hash';
import prettyName from '../lib/pretty-name';

const route = useRoute();
const router = useRouter();
const name = ref('');
const pin = ref('');
const game = ref({});

onMounted(async () => {
  const { gameId } = route.params;
  game.value = await db.getGame(gameId);
  db.onGameChange(gameId, (gameContent) => {
    game.value = gameContent;
  });
});

const players = computed(() => {
  if (game.value.players) {
    return game.value.players.map((p) => prettyName(p)).join(', ');
  }
  return '-';
});

const numPlayers = computed(() => {
  if (game.value.players) {
    return game.value.players.length;
  }
  return '0';
});

const join = async () => {
  const { gameId } = route.params;
  if (game.value.hashPin !== hash(pin.value)) {
    // eslint-disable-next-line no-alert
    alert('PIN does not match');
    return;
  }
  if (!name.value) return;
  if (game.value.players?.map((x) => x.toLowerCase()).includes(name.value.toLowerCase())) {
    router.push(`/game/${gameId}/${name.value}/start`);
    return;
  }
  await db.addPlayer(gameId, name.value, numPlayers.value);
  router.push(`/game/${gameId}/${name.value}/start`);
};
</script>
<template>
  <q-page class="q-px-md" style="max-width: 32rem; margin:auto;">
    <h6 class="q-mb-none q-mt-lg">Code: {{  route.params.gameId  }}</h6>
    <p>To enter in the game, enter your name and the PIN.</p>
    <q-input required class="q-mb-md" v-model="name" outlined label="Enter your name"
             :rules="[val => !!val || 'Field is required']"></q-input>
    <q-input required class="q-mb-md" v-model="pin" outlined label="4 digit PIN"
             mask="####" maxlength="4" type="number"
             :rules="[val => !!val || 'Field is required',
             val => val.length === 4 || 'PIN must be 4 digits']"></q-input>
    <p>Current players ({{numPlayers}}): {{ players }}</p>
    <div class="text-center q-mt-lg">
      <q-btn
          type="submit"
          label="JOIN"
          icon-right="keyboard_double_arrow_right"
          color="primary"
          @click="join"
          glossy
          outlined
      />
    </div>

  </q-page>
</template>
