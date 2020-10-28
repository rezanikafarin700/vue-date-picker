import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/css',
    name: 'css',
    component: () => import('../views/css')
  },
  {
    path: '/use',
    name: 'use',
    component: () => import('../views/UseDatePicker')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test'),
    beforeEnter(to, from, next) {
      window.console.log('Salam');
      window.console.log(to);
      window.console.log(from);
      next();
    }
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('../views/Test1')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
