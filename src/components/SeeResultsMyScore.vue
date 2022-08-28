<script setup>
defineProps({
  totalScore: Number,
});
</script>
<template>
  <p class="q-pa-lg text-bold text-center" style="size: 1.5rem;">
    Your score: {{ totalScore }} pts.
  </p>
</template>
