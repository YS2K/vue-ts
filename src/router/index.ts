import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter);


const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import( '@/views/home/home.vue'),
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
