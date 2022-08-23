<script setup>
import { useRoute } from 'vue-router';

const capitalize = (name) => name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);

const capitalizedName = capitalize(useRoute().params.namePlayer);
</script>
<template>
  <div class="q-ma-md">
    <h5 class="q-mb-md">Hello, {{ capitalizedName }}</h5>
    <p>Make a question to your friends and to the
      <q-icon name="smart_toy"/>
      AI spy:
    </p>
    <q-input
        v-model="question"
        outlined
        autogrow
        class="q-mb-md"
    />
    <q-btn
        label="SEND"
        icon-right="send"
        color="primary"
        glossy
        outlined
    />
  </div>
</template>

<script>
export default {
  name: 'QuestionForm',
  data() {
    return {
      question: '',
    };
  },
  methods: {
    capitalize(name) {
      return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)
    },
  },
}
</script>
