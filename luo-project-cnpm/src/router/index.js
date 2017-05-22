import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
//import Luo from '@/components/Luo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    //{
    //  path: '/',
    //  name: 'Luo',
    //  component: Luo
    //},
  ]
})
