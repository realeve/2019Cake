<template>
  <div>
    <div class="checklist" style="margin: 30px auto; width: 400px;">
      <p class="title">工会节日慰问品选择列表</p>
      <ul style="margin: 20px;">
        <li v-for="item in list" :key="item[0]">
          {{ item[0] }}: {{ item[1] }}人
        </li>
      </ul>
      <div class="submit">
        <x-button type="primary" @click.native="download"
          >下载选择详情</x-button
        >
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
import Excel from "../lib/excel";

export default {
  name: "page",
  components: {
    Group,
    Radio,
    Toast,
    XButton,
    Checker,
    CheckerItem,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      list: [],
    };
  },
  computed: {
    ...mapState(["sport"]),
  },
  methods: {
    download: async function () {
      let data = await db.getViewCbpcCakelist();
      let excel = new Excel({
        header: data.header,
        body: data.data,
        filename: data.title + moment().format("YYYYMMDD HH时"),
      });
      excel.save();
    },
    async init() {
      db.getViewCbpcCakelistCount().then((res) => {
        this.list = res.data;
      });
    },
  },
  mounted() {
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
