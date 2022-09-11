<script setup>
import { ref } from 'vue';

const code = ref('');
const numberOfPlayers = ref(null);
const lang = ref('en');
const names = ref(['', '', '', '', '', '', '', '', '', '']);

</script>
<template>
  <q-page style="max-width: 32rem; margin:auto;">
    <h6 class="q-mb-none q-mt-lg">Configure your settings</h6>
    <p>Enter the following info to generate links for all players. </p>
    <q-input class="q-mb-md" v-model="code" outlined label="Enter the code"></q-input>
    <q-select class="q-mb-md" label="Number of players"
              :options="[1,2,3,4,5,6,7,8,9,10]"
              outlined v-model="numberOfPlayers">
    </q-select>
    <q-select class="q-mb-md" label="Language" outlined :model-value="lang"
    :options="['en', 'es']"></q-select>
    <h6 class="q-mb-none q-mt-lg">Players name and links</h6>
    <p>Enter a name for each player and that will provide
      a link for each. Press over the link to copy it. </p>
    <div v-for="num in Array.from(Array(numberOfPlayers).keys())" :key="num">
      <q-input class="q-mb-md" outlined :label="`Player ${num + 1}`" v-model="names[num]"></q-input>
      <p v-if="names[num]">
        https://turing-phone-game.web.app/game/{{code}}/{{names[num]}}/start
      </p>
    </div>
  </q-page>
</template>
