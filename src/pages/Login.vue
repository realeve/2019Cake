<template>
  <div class="wrapper">
    <group class="content">
      <x-input
        title="姓名"
        required
        name="username"
        v-model="sport.userName"
        placeholder="点击此处输入姓名"
      ></x-input>
      <x-input
        title="卡号"
        required
        name="usercard"
        v-model="sport.cardNo"
        placeholder="输入卡号,内退人员请输入内退"
        type="text"
      ></x-input>

      <div class="btn">
        <x-button :disabled="!shouldCommit" type="primary" @click.native="login"
          >登录</x-button
        >
      </div>
    </group>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <v-foot />
  </div>
</template>
<script>
import { XButton, XInput, Group, Toast, GroupTitle } from "vux";

import { mapState } from "vuex";
import * as db from "../lib/db";

export default {
  components: {
    XButton,
    XInput,
    Group,
    Toast,
    GroupTitle,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
        valid: true,
      },
    };
  },
  computed: {
    ...mapState(["sport", "userInfo"]),
    shouldCommit() {
      return this.sport.userName != "" && this.sport.cardNo != "";
    },
    sport: {
      get() {
        return this.$store.state.sport;
      },
      set(val) {
        this.$store.commit("setSport", val);
      },
    },
  },
  methods: {
    jump(router) {
      this.$router.push(router);
    },
    loadUserInfo() {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo == null) {
        return;
      }
      userInfo = JSON.parse(userInfo);
      this.sport = {
        userName: userInfo.user_name,
        cardNo: userInfo.user_id,
      };
    },
    login: async function () {
      let params = {
        usercard: this.sport.cardNo,
        username: this.sport.userName,
      };

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          user_name: params.username,
          user_id: params.usercard,
        })
      );

      let { data } = await db.getCbpcCake(params);

      if (data.length === 0) {
        this.toast.show = true;
        this.toast.msg = "登录失败";
        return;
      }
      let obj = data[0];

      this.sport.isLogin = true;
      this.sport.uid = obj.uid;

      if (this.sport.name.includes("慰问品")) {
        this.jump("paper");
      } else {
        this.jump("papercake");
      }
    },
  },
  mounted() {
    document.title = "登录";
    this.loadUserInfo();

    db.getCbpcCakeDesc().then((res) => {
      if (res.is_end == 1) {
        this.jump("end");
      }
    });
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  font-size: 13pt;
  color: #233;
  width: 100%;
  justify-content: center;
  .title {
    font-size: 22pt;
  }
}

.btn {
  width: 80%;
  margin: 60px auto;
}
</style>
