// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue          from 'vue'
import App          from './App'
import VRouter      from 'vue-router'
import Vuex         from 'vuex'
import Apple        from './components/Apple'
import Banana       from './components/Banana'
import BananaYellow from './components/bananaYellow'
import BananaGreen  from './components/bananaGreen'
import Init         from './assets/css/init.less'

Vue.config.productionTip = false;

Vue.use(VRouter);
Vue.use(Vuex);

//router
let router = new VRouter({
    mode: 'history',//没有hash
    routes: [

      {
        path:'/apple',
        component:Apple
      },
      {
        path:'/banana',
        component:Banana,
        children: [
          {
            path: 'yellow',
            component: BananaYellow
          },
          {
            path: 'green',
            component: BananaGreen
          }
        ]
      },
    ]
});

//store
let store = new Vuex.Store({
    state: {
      totalPrice: 1
    },
    getters: {
      getTotal (state) {
        if(state.totalPrice < 0){
          state.totalPrice = 0;
        }
        return state.totalPrice;
      }
    },
    mutations: {
      increment (state, price) {
        state.totalPrice += price;
      },
      decrement (state, price) {
        state.totalPrice -= price;
      }
    },
    actions: {
      increase (context, price) {
        context.commit('increment', price)
      }
    }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
