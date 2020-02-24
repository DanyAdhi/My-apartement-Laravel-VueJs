import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ListingPage from '../components/ListingPage.vue';
import HomePage from '../components/HomePage.vue';

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/listing', component: ListingPage, name:'listing' },
    { path: '/listing/:listing', component: ListingPage, name:'listing' },
    { path: '/home', component: HomePage, name: 'home' },
  ]
});