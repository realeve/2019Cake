import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: function(resolve) {
        require(['../pages/Login.vue'], resolve);
      }
    },
    {
      path: '/paper',
      component: function(resolve) {
        require(['../pages/Paper.vue'], resolve);
      }
    },
    {
      path: '/papercake',
      component: function(resolve) {
        require(['../pages/Papercake.vue'], resolve);
      }
    },
    {
      path: '/user',
      component: function(resolve) {
        require(['../pages/UserInfo.vue'], resolve);
      }
    }
  ]
});
