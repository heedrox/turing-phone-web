<script setup>
defineProps({
  totalScore: Number,
});
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
          label="SEE RANKING"></q-btn>
    </div>
  </div>
</template>
