<template>
  <div>
    <div class="checklist">
      <p class="tips" v-html="title" />

      <group title>
        <radio
          :options="options"
          v-model="answer"
          :disabled="isChoose || submitting"
        ></radio>
      </group>
      <div class="submit">
        <x-button
          :disabled="isChoose || submitting || answer < 0"
          type="primary"
          @click.native="submit"
          >{{ isChoose ? "已选择" : "提交" }}</x-button
        >

        <x-button
          v-if="['李宾', '黄夏玢'].includes(sport.userName)"
          @click.native="jump"
        >
          查看选择结果
        </x-button>
      </div>
      <div
        v-show="isChoose"
        style="
          width: 100%;
          text-align: center;
          margin-top: 50px;
          font-size: 80px;
        "
      >
        <p style="font-size: 15px;">您已选择</p>
        {{ ["A", "B"][answer - 1] }}
        <span style="font-size: 15px;">套餐</span>
      </div>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
  </div>
</template>
<script>
import { Toast, XButton, Checklist, Group, Radio } from "vux";

import { mapState } from "vuex";
import util from "../lib/common";
import moment from "moment";
import * as db from "../lib/db";

export default {
  name: "page",
  components: {
    Group,
    Radio,
    Toast,
    XButton,
    Checklist,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      options: [],
      answer: -1,
      isChoose: false,
      submitting: false,
      title: "",
    };
  },
  computed: {
    ...mapState(["sport"]),
  },
  methods: {
    submit: async function () {
      this.submitting = true;
      let method = this.isChoose ? "setCbpcCakeMain" : "addCbpcCakeMain";
      let {
        data: [{ affected_rows }],
      } = await db[method]({
        uid: this.sport.uid,
        cake_id: this.answer,
      });
      if (affected_rows > 0) {
        this.toast = { show: true, msg: "提交成功" };
        this.isChoose = true;
      } else {
        this.toast = { show: true, msg: "提交失败" };
      }
      this.submitting = false;
      this.init();
    },
    async init() {
      db.getCbpcCakeDesc().then((title) => {
        this.title = title;
      });
      let { data } = await db.getCbpcCakeList();
      this.options = data.map(({ id: key, cake_name: value, url }) => ({
        key,
        value,
        url,
      }));

      // 是否已选择
      let res = await db.getCbpcCakeMain(this.sport.uid);
      if (res.rows > 0) {
        this.isChoose = true;
        let cake_id = res.data[0].cake_id;
        this.answer = cake_id;
      }

      // let people_num = Math.max(data[0].people_num,data[1].people_num);
    },
    jump() {
      this.$router.push("score");
    },
  },
  mounted() {
    if (!this.sport.isLogin) {
      this.$router.push("/");
      return;
    }
    console.log(this.sport);
    this.init();
  },
};
</script>
<style scoped lang="less">
.checklist {
  .submit {
    margin: 20px;
  }
  .tips {
    padding: 10px;
    text-indent: 2em;
  }
  .title {
    color: #686868;
    font-size: 18px;
    margin: 10px 0 -10px 10px;
  }
}
</style>
