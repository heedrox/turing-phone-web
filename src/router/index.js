import { createRouter, createWebHistory } from 'vue-router';
import StartGame from '../pages/GamePage.vue';
import HomePage from '../pages/HomePage.vue';
import CodePage from '../pages/CodePage.vue';
import JoinPage from '../pages/JoinPage.vue';
import TesterPageIntro from '../pages/2p/TesterPageIntro.vue';
import TesterPageGame from '../pages/2p/TesterPageGame.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CodePage },
  { path: '/game/:gameId', component: JoinPage, name: 'JoinPage' },
  { path: '/game/:gameId/:playerName/start', component: StartGame },
  { path: '/2p/:gameId/tester', component: TesterPageIntro },
  { path: '/2p/:gameId/tester/start', component: TesterPageGame },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
