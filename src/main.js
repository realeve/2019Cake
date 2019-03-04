import Vue from 'vue';
import App from './App';

import store from './store';
import router from './router';

import { WechatPlugin, ToastPlugin } from 'vux';
Vue.use(WechatPlugin);

Vue.use(ToastPlugin);

import VFoot from './components/Copyright.vue';
Vue.component('v-foot', VFoot);

router.beforeEach(function(to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  });
  next();
});

router.afterEach(function(to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  });
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
