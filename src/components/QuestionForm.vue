<script setup>
import { ref, toRefs, computed } from 'vue';
import QuestionAdd from '../use-cases/question-add';

const capitalize = (name) => name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);

const props = defineProps({
  playerName: String,
  gameContent: Object,
});
const { playerName, gameContent } = toRefs(props);

const capitalizedName = computed(() => capitalize(playerName.value));

const question = ref('');

const sendQuestion = async () => {
  await QuestionAdd.execute(gameContent.value.gameId, playerName.value, question.value);
};
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
        @click="sendQuestion"
        glossy
        outlined
    />
  </div>
</template>
