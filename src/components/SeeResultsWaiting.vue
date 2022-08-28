<script setup>
defineProps({
  numberOfPlayers: Number,
  numberOfResults: Number,
});
</script>
<template>
  <h6 class="q-mb-none q-mt-lg">Waiting for everybody to play... </h6>
  <q-linear-progress size="30px"
                     :value="numberOfResults / numberOfPlayers"
                     color="primary"
                     class="q-mt-sm">
    <div class="absolute-full flex flex-center">
      <q-badge color="white"
               text-color="primary"
               :label="`${numberOfResults } / ${ numberOfPlayers }`"/>
    </div>
  </q-linear-progress>
</template>
