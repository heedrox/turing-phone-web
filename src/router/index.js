import { createRouter, createWebHistory } from 'vue-router';
import StartGame from '../pages/GamePage.vue';
import HomePage from '../pages/HomePage.vue';
import CodePage from '../pages/CodePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/enter-code', component: CodePage },
  { path: '/game/:gameId/:playerName/start', component: StartGame },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
