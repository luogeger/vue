import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Layout from './components/layout'
import IndexPage from './pages/index'

Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    }
  ]
});

new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
});
