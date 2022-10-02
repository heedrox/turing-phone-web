<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const start = () => {
  router.push(`/2p/${route.params.gameId}/start`);
};

</script>
<template>
  <q-page style="max-width: 32rem; margin:auto;">
    <div class="q-ma-md" style="line-height: 2em; font-size:1.1em;">
      <h6>Hello,</h6>
      <p>You have been recruited to detect AI bots between humans.
        You will test two subjects: an AI and a human.
        Make questions, analyze their answers and unmask the AI.
      </p>
      <p><b>But beware!</b> The are rumours that some rebel humans want
        to hack the system trying to mimic AIs behaviour.</p>
      <p>You must find out who is the AI and who is the human. Do not fail,
        or our civilization might collapse by the hands of this so called "rebels".</p>
      <div class="text-center">
        <q-btn
            class="q-mt-lg"
            label="START"
            color="primary"
            @click="start"
            glossy
            outlined
        />
      </div>
    </div>
  </q-page>
</template>
