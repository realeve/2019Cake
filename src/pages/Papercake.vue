<template>
  <div>
    <div class="checklist">
      <p class="title">2019年是否继续沿用元祖蛋糕？</p>
      <group>
        <radio
          :options="options"
          v-model="answer"
        ></radio>
      </group>
      <div v-show="answer==1">
        <p style="margin:10px 0 5px 5px;">请选择不满意的原因：</p>
        <checker
          v-model="reasonList"
          type="checkbox"
          default-item-class="demo1-item"
          selected-item-class="demo1-item-selected"
        >
          <checker-item
            v-for="(name) in reasons"
            :key="name"
            :value="name"
          >{{name}}</checker-item>
        </checker>
      </div>
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
import { Toast, XButton, Group, Radio, Checker, CheckerItem } from "vux";

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
    Checker,
    CheckerItem
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ""
      },
      options: [{ key: 0, value: "是" }, { key: 1, value: "否" }],
      answer: -1,
      isChoose: false,
      submitting: false,
      reasonList: [],
      reasons: [
        "价格贵",
        "种类少",
        "口感不好",
        "服务态度不好",
        "配送速度慢",
        "其它"
      ]
    };
  },
  computed: {
    ...mapState(["sport"])
  },
  watch: {
    answer(val) {
      if (val == 0) {
        this.reasonList = [];
      }
    }
  },
  methods: {
    submit: async function() {
      this.submitting = true;
      let method = this.isChoose ? "setCbpcCakeVote" : "addCbpcCakeVote";
      let {
        data: [{ affected_rows }]
      } = await db[method]({
        uid: this.sport.uid,
        vote_id: this.answer,
        remark: this.reasonList.join(",")
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
      let { data } = await db.getCbpcCakeVoteList();
      if (data.length > 0) {
        let option = this.options;
        data.forEach(item => {
          if (item.vote_id == 0) {
            option[0].value = `是(${item.vote_num}人)`;
          } else {
            option[1].value = `否(${item.vote_num}人)`;
          }
        });
        this.options = option;
      }

      // 是否已选择
      let res = await db.getCbpcCakeVote(this.sport.uid);
      if (res.rows > 0) {
        this.isChoose = true;
        let { vote_id, remark } = res.data[0];
        this.answer = vote_id;
        this.reasonList = ("" + remark).split(",");
      }
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

  .demo1-item-selected {
    border: 1px solid #ff402c !important;
  }
  .demo1-item {
    border: 1px solid #b2b2b2;
    padding: 5px 15px;
    margin: 3px;
  }
  .title {
    color: #686868;
    font-size: 18px;
    margin: 10px 0 -10px 10px;
  }
}
</style>
