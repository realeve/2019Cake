<template>
  <div style="background:#fff; width:800px; margin:10px auto;">
    <div class="checklist" style="margin: 40px auto; width: 800px;">
      <p class="title">(已领取：{{result.choised}},未领取：{{result.not_choise}})</p>
 
      <x-button @click.native="download" style="margin:10px 0 30px; width:200px">下载未领取人员</x-button>
    </div>
    <div class="alignRow">
      <div>
        <div style="width:320px">
          <x-input
            style="background:#f7f7f7;"
            v-model="card"
            title="卡号"
            placeholder="点击此处刷卡或输入卡号"
            ref="cardno"
          />
          <x-input
            v-show="isproxy"
            style="background:#f7f7f7;"
            v-model="proxy_card"
            title="代领人卡号"
            placeholder="点击此处刷卡或输入卡号"
            ref="proxycard"
          />
          <x-button type="primary" @click.native="showProxy" style="margin:10px 0 30px;">为他人代领</x-button>
        </div>
        <div class="card" v-for="item in list" :key="item.id">
          <div class="row">序号：{{item.id}}</div>
          <div class="row">卡号：{{item.cardno}}</div>
          <div class="row">姓名：{{item.username}}</div>
          <div class="row">部门：{{item.deptname}}</div>
          <div class="row">性别：{{item.sex}}</div>
          <div class="row">型号：{{item.remark}}</div>
          <div class="row">尺码：{{item.remark2}}</div>
          <div
            class="row"
            :class="(!item.receive_time || item.receive_time.length===0)?'green':'red'"
          >领取状态：{{(!item.receive_time || item.receive_time.length===0)?'未领取':'已领取'}}</div>
          <div
            class="row"
            v-show="item.receive_time"
            :class="{red:item.receive_time}"
          >领取时间：{{item.receive_time}}</div>
          <div
            class="row"
            v-show="item.receive_time"
            :class="{red:item.receive_time}"
          >领取卡号：{{item.proxy}}</div>
          <x-button
            v-show="list.length>1"
            type="primary"
            @click.native="receive(item.id)"
            style="margin:10px 0;"
          >手动领取</x-button>
        </div>
      </div>
      <div style="margin-left:100px;margin-top:75px;">
        <p style="font-size:20px">领取结果</p>
        <div class="card" v-for="item in list2" :key="item.id">
          <div class="row">序号：{{item.id}}</div>
          <div class="row">卡号：{{item.cardno}}</div>
          <div class="row">姓名：{{item.username}}</div>
          <div class="row">部门：{{item.deptname}}</div>
          <div class="row">性别：{{item.sex}}</div>
          <div class="row">型号：{{item.remark}}</div>
          <div class="row">尺码：{{item.remark2}}</div>
          <div class="row" :class="{red:item.receive_time}">领取时间：{{item.receive_time}}</div>
          <div class="row" :class="{red:item.receive_time}">领取卡号：{{item.proxy}}</div>
        </div>
      </div>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
  </div>
</template>
<script>
import { Toast, XButton, Group, XInput } from "vux";

import { mapState } from "vuex";
import util from "../lib/common";
import moment from "moment";
import * as db from "../lib/db";
import Excel from "../lib/excel";

export default {
  name: "page",
  components: {
    Group,
    Toast,
    XButton,
    XInput,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      list: [],
      list2: [],
      result: { choised: 0, not_choise: 0 },
      card: "",
      isproxy: false,
      proxy_card: "",
    };
  },
  watch: {
    card(val) {
      if (val.length < 11) {
        return;
      }
      this.loadChoise();
    },
    proxy_card(val) {
      if (val.length < 5) {
        return;
      }
      this.loadChoise();
    },
  },
  methods: {
    showProxy() {
      this.isproxy = true;
      this.proxy_card = "";
      this.$refs.proxycard.focus();
    },
    loadChoise: async function () {
      this.list = [];
      let { data } = await db.getCbpcCake2020(this.card);
      if (data.length === 0) {
        this.toast = {
          show: true,
          msg: "用户信息查询失败",
        };
        return;
      }
      this.list = data;
      if (data.length === 1) {
        if (data[0].proxy && data[0].proxy.length > 0) {
          return;
        }
        this.receive(data[0].id);
      }
    },
    loadResult: async function () {
      this.list2 = [];
      let { data } = await db.getCbpcCake2020(this.card);
      if (data.length === 0) {
        this.toast = {
          show: true,
          msg: "用户信息查询失败",
        };
        return;
      }
      this.list2 = data;
    },
    receive(_id) {
      db.setCbpcCake2020({
        proxy: this.isproxy ? this.proxy_card : this.card,
        _id,
      }).then((res) => {
        this.toast = {
          show: true,
          msg: res.data[0].affected_rows == 0 ? "领取失败" : "领取成功",
        };
        this.loadResult();
        this.card = "";
        this.$refs.cardno.focus();

        this.isproxy = false;
        this.proxy_card = "";
        this.init()
      });
    },
    download: async function () {
      let data = await db.getCbpcCake2020Unchoise();
      let excel = new Excel({
        header: data.header,
        body: data.data,
        filename: data.title + moment().format("YYYYMMDD HH时"),
      });
      excel.save();
    },
    async init() {
      db.getCbpcCake2020Choice().then((res) => {
        this.result = res.data[0];
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang="less">
.title {
  color: #222;
  font-size: 24px;
  margin: 10px 0 -10px 10px;
}
.card {
  width: 300px;
  margin-top: 20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 8px 0px #dbdada;
  cursor: pointer;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px dashed #eaeaea;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background: #e0faff;
    }
  }
}
.alignRow {
  display: flex;
  flex-direction: row;
}
.red {
  background-color: rgb(248, 176, 182);
}
.green {
  background-color: rgb(176, 248, 182);
}
</style>
