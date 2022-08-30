<script setup>
import img from '../assets/turing-phone-lite.jpg';
</script>
<template>
  <q-page>
    <div style="max-width: 32rem; margin:auto;">
      <q-img
          class="full-width" :src="img"
          fit="cover"
          :ratio="25/9"
      >
      </q-img>
      <p class="q-mt-lg q-mx-md">A game to play with friends,
        in which you have to find who the AI is.</p>
      <ol>
        <li>Each player makes a question.</li>
        <li>Everybody answers each of these questions.</li>
        <li>A hidden AI spy will also answer each of the questions.</li>
        <li>Can you guess who is the AI in every question?</li>
        <li>Points are given per correct answer,
          and per friend who thought your answer was from the AI.</li>
      </ol>
      <div class="text-center">
        <q-btn color="primary" href="https://forms.gle/Y2k5TzqELiP37Gps5" target="_blank">JOIN THE BETA</q-btn>
      </div>
      <p></p>
    </div>
  </q-page>
</template>

<style lang="css">
li { margin-bottom: 1rem; }
</style>
