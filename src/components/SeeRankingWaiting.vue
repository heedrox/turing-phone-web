<script setup>
defineProps({
  numberOfScores: Number,
  numberOfPlayers: Number,
});

</script>
<template>
  <h6 class="q-mb-none q-mt-lg">Waiting for everybody... </h6>
  <q-linear-progress size="30px"
                     :value="numberOfScores / numberOfPlayers"
                     color="primary"
                     class="q-mt-sm">
    <div class="absolute-full flex flex-center">
      <q-badge color="white"
               text-color="primary"
               :label="`${numberOfScores } / ${ numberOfPlayers }`"/>
    </div>
  </q-linear-progress>
</template>
