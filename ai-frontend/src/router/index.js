import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CreateForm from '../views/CreateForm.vue'
import MyForms from '../views/MyForms.vue'
import ResultPage from '../views/ResultPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import FullScreenForm from '../components/FullScreenForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/create-form',
    name: 'CreateForm',
    component: CreateForm
  },
  {
    path: '/my-forms',
    name: 'MyForms',
    component: MyForms
  },
  {
    path: '/results/:id',
    name: 'ResultPage',
    component: ResultPage
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  },
  {
    path: '/fullscreen-form/:id',
    name: 'FullScreenForm',
    component: FullScreenForm
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
