<template>
  <div>
    <div class="checklist">
      <p class="tips">为进一步提高工会会员对节日慰问品福利的满意度，2019年度“五一”节日慰问品将采取A、B套餐的发放形式，每位会员须在规定的时间内任意选择A、B套餐其中之一作为节日慰问品，选择后不得更换，公司工会将根据选择数量进行备货并发放。</p>
      <p class="tips">套餐选择起止时间:2019年4月23日——4月25日24点。</p>
      <group title="请选择你所期望的套餐">
        <radio
          :options="options"
          v-model="answer"
        ></radio>
      </group>
      <!-- <div
        v-for="item in options"
        :key="item.id"
        style="margin:25px 10px;"
      >
        <p>{{item.value}}</p>
        <img
          :src="item.url"
          :alt="item.value"
          style="width:100%;margin:6px 0;"
        >
      </div> -->
      <div class="submit">
        <x-button
          :disabled="isChoose||submitting||answer<0"
          type="primary"
          @click.native="submit"
        >{{isChoose?'已选择':'提交'}}</x-button>
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
    Checklist
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ""
      },
      options: [],
      answer: -1,
      isChoose: false,
      submitting: false
    };
  },
  computed: {
    ...mapState(["sport"])
  },
  methods: {
    submit: async function() {
      this.submitting = true;
      let method = this.isChoose ? "setCbpcCakeMain" : "addCbpcCakeMain";
      let {
        data: [{ affected_rows }]
      } = await db[method]({
        uid: this.sport.uid,
        cake_id: this.answer
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
      let { data } = await db.getCbpcCakeList();
      this.options = data.map(({ id: key, cake_name: value, url }) => ({
        key,
        value,
        url
      }));

      // 是否已选择
      let res = await db.getCbpcCakeMain(this.sport.uid);
      if (res.rows > 0) {
        this.isChoose = true;
        let cake_id = res.data[0].cake_id;
        this.answer = cake_id;
      }

      // let people_num = Math.max(data[0].people_num,data[1].people_num);
    }
  },
  mounted() {
    if (!this.sport.isLogin) {
      this.$router.push("/");
      return;
    }
    this.init();
  }
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
