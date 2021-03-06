import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

//
import Layout from './components/layout'
import IndexPage from './pages/index'
// detail 以及 4个子路由
import DetailPage from './pages/detail'
import DetailAnalysis from './pages/detail/analysis'
import DetailCount from './pages/detail/count'
import DetailForecast from './pages/detail/forecast'
import DetailPublish from './pages/detail/publish'
import temp from './assets/css/temp.css'



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      redirect:'/detail/forecast',
      component: DetailPage,
      children: [
        {
          path: 'analysis',
          component: DetailAnalysis
        },
        {
          path: 'count',
          component: DetailCount
        },
        {
          path: 'forecast',
          component: DetailForecast
        },
        {
          path: 'publish',
          component: DetailPublish
        },
      ]
    }
  ]
});

new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
});
