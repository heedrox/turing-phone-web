<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import db from '../db';
import hash from '../lib/hash';

const code = ref('');
const pin = ref('');
const lang = ref('en');
const router = useRouter();

const createCode = async () => {
  if (!code.value) return;
  if (pin.value.toString().length !== 4) return;
  const previousGame = await db.getGame(code.value, { });
  if (previousGame.gameId === code.value) {
    // eslint-disable-next-line no-alert
    alert('Code already exists, try another code');
    return;
  }
  await db.addGameId(code.value, hash(pin.value), lang.value);
  await router.push({ name: 'JoinPage', params: { gameId: code.value } });
};
</script>
<template>
  <q-page class="q-px-md" style="max-width: 32rem; margin:auto;">
    <h6 class="q-mb-none q-mt-lg">Configure your settings</h6>
    <p>Enter the following info to generate a code to play. </p>
    <q-input required class="q-mb-md" v-model="code" outlined label="Enter the code"
             :rules="[val => !!val || 'Field is required']"></q-input>
    <q-input required class="q-mb-md" v-model="pin" outlined label="4 digit PIN"
             mask="####" maxlength="4" type="number"
             :rules="[val => !!val || 'Field is required',
             val => val.length === 4 || 'PIN must be 4 digits']"></q-input>
    <q-select class="q-mb-md" label="Language" outlined v-model="lang"
    :options="['en', 'es']"></q-select>
    <div class="text-center">
    <q-btn
        type="submit"
        label="CREATE"
        icon-right="add"
        color="primary"
        @click="createCode"
        glossy
        outlined
    />
    </div>
  </q-page>
</template>
