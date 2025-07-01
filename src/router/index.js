import { createRouter, createWebHistory } from 'vue-router';
import LibrosView from '../views/LibrosView.vue'; // Renombraremos ListaDeLibros a una "vista"
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'Libros',
    component: LibrosView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;