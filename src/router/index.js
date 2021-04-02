import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: function (resolve) {
        require(["../pages/Login.vue"], resolve);
      },
    },
    {
      path: "/paper",
      component: function (resolve) {
        require(["../pages/Paper.vue"], resolve);
      },
    },
    {
      path: "/score",
      component: function (resolve) {
        require(["../pages/score.vue"], resolve);
      },
    },
    {
      path: "/pay",
      component: function (resolve) {
        require(["../pages/Pay.vue"], resolve);
      },
    },
    {
      path: "/user",
      component: function (resolve) {
        require(["../pages/UserInfo.vue"], resolve);
      },
    },
    {
      path: "/end",
      component: function (resolve) {
        require(["../pages/end.vue"], resolve);
      },
    },
  ],
});
