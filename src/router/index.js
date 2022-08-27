import { createRouter, createWebHistory } from 'vue-router';
import StartGame from '../pages/GamePage.vue';
import HomePage from '../pages/HomePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/game/:gameId/:numberOfPlayers/player/:playerNumber/:playerName/start', component: StartGame },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
