<template>
  <div>
    <div class="checklist">
      <group title="请选择你所期望的套餐">
        <radio
          :options="options"
          v-model="answer"
        ></radio>
      </group>
      <div class="submit">
        <x-button
          :disabled="submitting||answer<0"
          type="primary"
          @click.native="submit"
        >{{isChoose?'更新':'提交'}}</x-button>
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
      this.options = data.map(({ id: key, cake_name: value }) => ({
        key,
        value
      }));

      // 是否已选择
      let res = await db.getCbpcCakeMain(this.sport.uid);
      if (res.rows > 0) {
        this.isChoose = true;
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
.submit {
  margin: 20px;
}
</style>
