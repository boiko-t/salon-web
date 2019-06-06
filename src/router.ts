import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';
import Notifications from './views/Notifications.vue';
import Categories from './views/Categories.vue';
import CategoryDetails from './views/CategoryDetails.vue';
import CategoryCreate from './views/CategoryCreate.vue';
import ProductDetails from './views/ProductDetails.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/categories/:id',
      name: 'category',
      component: CategoryDetails,
    },
    {
      path: '/categories/:id/:edit',
      name: 'category',
      component: CategoryDetails,
    },
    {
      path: '/new-category',
      name: 'new-category',
      component: CategoryCreate,
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductDetails,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
  ],
});
