<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <q-page style="max-width: 32rem; margin:auto;">
    <h6 class="q-mb-none q-mt-lg">{{  route.params.gameId  }}</h6>

  </q-page>
</template>
