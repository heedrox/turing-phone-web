<template>
  <router-view/>
</template>

<script>
import db from './db/index';

export default {
  name: 'App',
  async mounted() {
    await db.init();
  },
};
</script>
