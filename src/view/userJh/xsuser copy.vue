<template>
  <div class="wrapper" ref="wrapper">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="content">
      <div class="menu-head-top50"></div>
      <div class="maincontent" id="maincontent1" style="position:relative;margin-top:0.2rem;">
        <div style="overflow:hidden;width:100%;float:left;text-align:left;">
          <h3 style="text-align:left;position:relative;padding-bottom:0.2rem;">
            <span style="line-height:1rem;display:block;">汇总销售日报</span>
            <span
              id="sobox"
              style="position:absolute;right:10px;font-size:1.1em;color:#999;width:45%;font-size:0.4rem;top:-0;line-height:1rem;"
            >
              <!-- {{value1}} -->
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="border:none;"
                :editable="false"
                :clearable="false"
                class="el-icon-arrow-down1"
              >
                <template>
                  <i class="el-icon-arrow-down"></i>
                </template>
              </el-date-picker>
            </span>
          </h3>
          <div
            class="left flex_1"
            style="width:100%;font-size:0.3rem;display:flex;padding-top:0.2rem;border-top:1px solid #f2f2f5;"
          >
            <div>
              <span class="blue">本月任务：</span>
              <span class="black">{{yuejihua}}万</span>
            </div>
            <div>
              <span class="blue">今日完成：</span>
              <span class="black">
                <span :class="yiwancheng>=0?'red':'green'">{{yiwancheng}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">截止今日应完成：</span>
              <span class="black">
                <span :class="zhijinjihua>=0?'red':'green'">{{zhijinjihua}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">实际累计完成：</span>
              <span class="black">
                <span :class="zhijinwancheng>=0?'red':'green'">{{zhijinwancheng}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">今日毛利率：</span>
              <span class="black">
                <span :class="dayTotalGrossProfit>=0?'red':'green'">{{dayTotalGrossProfit}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">累计毛利率：</span>
              <span class="black">
                <span :class="yuemaoli>=0?'red':'green'">{{yuemaoli}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">实时完成率：</span>
              <span class="black">
                <span :class="biao2>=0?'red':'green'">{{biao2}}%</span>
              </span>
            </div>
            <div>
              <span class="blue">超额/差额：</span>
              <span class="black">
                <span :class="chaoe>=0?'red':'green'">{{chaoe}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">净利：</span>
              <span class="black">
                <span :class="jingli>=0?'red':'green'">{{jingli}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">净净利：</span>
              <span class="black">
                <span :class="jingjingli>=0?'red':'green'">{{jingjingli}}万</span>
              </span>
            </div>
            <div style="color:#999999;width:100%;font-size:0.3rem;">
              <span style>
                上月环比
                <span :class="hb>=0?'red':'green'">
                  <!-- <i v-if="hb>=0" class="el-icon-top"></i>
                  <i v-if="hb<0" class="el-icon-bottom"></i>-->
                  {{hb>0?hb:-hb}}%
                </span>,去年同比
                <span :class="tb>=0?'red':'green'">
                  <!-- <i v-if="tb>=0" class="el-icon-top"></i>
                  <i v-if="tb<0" class="el-icon-bottom"></i>-->
                  {{tb>0?tb:-tb}}%
                </span>
              </span>
            </div>
            <div>
              <span class="blue">TB线索：</span>
              <span class="black">
                <span :class="TBxiansuo>=0?'red':'green'">{{TBxiansuo}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月开标：</span>
              <span class="black">
                <span :class="kaibiao>=0?'red':'green'">{{kaibiao}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月中标：</span>
              <span class="black">
                <span :class="zhongbiao>=0?'red':'green'">{{zhongbiao}}万</span>
              </span>
            </div>
            <div>
              <span class="blue">本月丢标：</span>
              <span class="black">
                <span :class="totalLoseTenderMoney>=0?'red':'green'">{{totalLoseTenderMoney}}万</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="(item,index) in tabdata1"
        :key="index"
        class="wztabs_details xstabs_details tabs_details border_bf0f0f0"
      >
        <div class="padd_b12 border_bf0f0f0">
          <div class="tabs_thr paddb3">
            <h3>{{item.departmentName}}</h3>
            <span class="tabs_four_c">NO.{{item.saleNo}}</span>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月任务：
              <span>{{item.departmentLevel}}</span>
            </p>
            <div class="tabs_four_d">
              <div v-if="item.saleNo<=4">
                <img
                  class="tabs_ld_img"
                  v-for="(itemNo,len2) in 4-item.saleNo"
                  :key="len2"
                  :src="hua"
                />
                <img class="tabs_ld_img" :src="zan" />
              </div>
              <div v-if="item.saleNo<=7&&item.saleNo>4">
                <img
                  class="tabs_ld_img"
                  v-for="(itemNo,len2) in 8-item.saleNo"
                  :key="len2"
                  :src="xiao"
                />
              </div>
              <div v-if="item.saleNo>7">
                <img class="tabs_ld_img" :src="ku" />
                <img v-if="item.saleNo>9&&item.saleNo<=11" class="tabs_ld_img" :src="ku" />
                <span v-if="item.saleNo>11&&item.saleNo<=15">
                  <img class="tabs_ld_img" v-for="(itemNo,len2) in 2" :key="len2" :src="ku" />
                </span>
              </div>
            </div>
          </div>
          <div class="tabs_four mart8">
            <p class="tabs_four_a">
              本月已完成：
              <span>{{item.finishMoney}}</span>
            </p>
          </div>
        </div>
        <div class="padd_bt12">
          <div class="usertabspc tabs_four wztabs_pc_all">
            <p class="tabs_four_a mart8">
              标准销售额：
              <span class="color333">{{item.standardFinishMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              实时完成率：
              <span class="color333">{{item.finishRate.split('/')[0]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              今日完成：
              <span class="color333">{{item.dayMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              环比：
              <span :class="item.monthCompare>0?'rate_red':'rate_green'">{{item.monthCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              累计毛利率：
              <span class="color333">{{item.grossProfit.split('/')[1]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              计划完成率：
              <span class="color333">{{item.finishRate.split('/')[1]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              今日毛利率：
              <span class="color333">{{item.grossProfit.split('/')[0]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              同比：
              <span :class="item.yearCompare>0?'rate_red':'rate_green'">{{item.yearCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              超额/差额：
              <span
                :class="item.differenceMoney>0?'rate_red':'rate_green'"
              >{{item.differenceMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              TB线索：
              <span class="color333">{{item.tbClueMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              目前中标：
              <span class="color333">{{item.getTenderMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              本月开标：
              <span class="color333">{{item.openTenderMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              丢标：
              <span class="color333">{{item.differenceMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              实际季累计完成：
              <span class="color333">{{item.finishQuarterMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              实际年累计完成：
              <span class="color333">{{item.finishYearMoney}}万</span>
            </p>
          </div>
          <div class="usertabsmobile tabs_four wztabs_pc_all">
            <p class="tabs_four_a mart8">
              标准销售额：
              <span class="color333">{{item.standardFinishMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              实时完成率：
              <span class="color333">{{item.finishRate.split('/')[0]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              今日完成：
              <span class="color333">{{item.dayMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              今日毛利率：
              <span class="color333">{{item.grossProfit.split('/')[0]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              超额/差额：
              <span
                :class="item.differenceMoney>0?'rate_red':'rate_green'"
              >{{item.differenceMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              累计毛利率：
              <span class="color333">{{item.grossProfit.split('/')[1]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              TB线索：
              <span class="color333">{{item.tbClueMoney}}万</span>
            </p>

            <p class="tabs_four_a mart8">
              计划完成率：
              <span class="color333">{{item.finishRate.split('/')[1]}}</span>
            </p>
            <p class="tabs_four_a mart8">
              本月开标：
              <span class="color333">{{item.openTenderMoney}}万</span>
            </p>
            <p class="tabs_four_a mart8">
              环比：
              <span :class="item.monthCompare>0?'rate_red':'rate_green'">{{item.monthCompare}}%</span>
            </p>
            <p class="tabs_four_a mart8">
              目前中标：
              <span class="color333">{{item.getTenderMoney}}万</span>
            </p>

            <p class="tabs_four_a mart8">
              同比：
              <span :class="item.yearCompare>0?'rate_red':'rate_green'">{{item.yearCompare}}%</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              丢标：
              <span class="color333">{{item.differenceMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              实际季累计完成：
              <span class="color333">{{item.finishQuarterMoney}}万</span>
            </p>
            <p class="tabs_four_a wztabs_pcdifmoney mart8">
              实际年累计完成：
              <span class="color333">{{item.finishYearMoney}}万</span>
            </p>
          </div>
        </div>
      </div>
      <div style="background:#f2f2f5;">
        <div
          style="border-bottom:1px solid #ccc;padding-bottom:0.3rem;margin-bottom:0.2rem;font-size:0.3rem;margin-top:0.2rem;"
          v-for="(item,index) in tabdata1"
          :key="index"
        >
          <div>
            <h3 style="text-align:left;line-height:1.2rem;background:#fff;text-indent:15px;">
              <p style="line-height:0.6rem;">{{item.customerName}}</p>
            </h3>
          </div>
          <div class="bmcontent" style="display:flex;flex-wrap:wrap;">
            <div>
              <p class="bmqb">{{item.monthMoney}}W</p>
              <p class="bmbt">本月任务</p>
            </div>
            <div @click="tankuang(item,'今日完成(万)')">
              <p class="bmqb" style="color:red;">{{item.dayMoney}}W</p>
              <p class="bmbt">今日完成</p>
            </div>
            <div>
              <p class="bmqb">{{item.monthShouldMoney}}W</p>
              <p class="bmbt">截止今日应完成</p>
            </div>
            <div>
              <p class="bmqb">{{item.finishMoney}}W</p>
              <p class="bmbt">实际累计完成</p>
            </div>
            <div @click="tankuang(item,'今日毛利率')">
              <p class="bmqb" style="color:red;">{{item.grossProfit.split('/')[0]}}</p>
              <p class="bmbt">今日毛利率</p>
            </div>
            <div>
              <p class="bmqb">{{item.grossProfit.split('/')[1]}}</p>
              <p class="bmbt">累计毛利率</p>
            </div>
            <div>
              <p class="bmqb">{{item.finishRate.split('/')[1]}}</p>
              <p class="bmbt">计划完成率</p>
            </div>
            <div>
              <p class="bmqb">{{item.finishRate.split('/')[0]}}</p>
              <p class="bmbt">实时完成率</p>
            </div>
            <div>
              <p class="bmqb">{{item.differenceMoney}}W</p>
              <p class="bmbt">超额/差额</p>
            </div>
            <div>
              <p class="bmqb">{{item.netProfit}}</p>
              <p class="bmbt">净利</p>
            </div>
            <div>
              <p class="bmqb">{{item.netsProfit}}</p>
              <p class="bmbt">净净利</p>
            </div>

            <div>
              <p class="bmqb">{{item.monthYearCompare.split('/')[0]}}</p>
              <p class="bmbt">上月环比</p>
            </div>
            <div>
              <p class="bmqb">{{item.monthYearCompare.split('/')[1]}}</p>
              <p class="bmbt">去年同比</p>
            </div>
            <div>
              <p class="bmqb">{{item.standardFinishMoney}}W</p>
              <p class="bmbt">标准销售额</p>
            </div>
            <div>
              <p class="bmqb">{{item.tbClueMoney}}W</p>
              <p class="bmbt">TB线索</p>
            </div>
            <div>
              <p class="bmqb">{{item.openTenderMoney}}W</p>
              <p class="bmbt">本月开标</p>
            </div>
            <div>
              <p class="bmqb">{{item.getTenderMoney}}W</p>
              <p class="bmbt">截止今日中标</p>
            </div>
            <div>
              <p class="bmqb">{{item.loseTenderMoney}}W</p>
              <p class="bmbt">丢标</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Addcreate></Addcreate>
  </div>
</template>

<script>
import CreateData from "@/view/userJh/xsuserdata/index";
import Addcreate from "@/components/addcreate";
import { adddata, chakehu, needdata, chabumen, chakh } from "@/api/config";
import { getisread } from "@/api/configWu";
import Head from "@/view/common/head";
export default {
  components: {
    Head,
    Addcreate
  },
  name: "index",
  data() {
    return {
      hua: require("@/assets/img/bangdan/hua.png"),
      zan: require("@/assets/img/bangdan/zan.png"),
      xiao: require("@/assets/img/bangdan/xiao.png"),
      ku: require("@/assets/img/bangdan/ku.png"),
      isread: false,
      dayTotalGrossProfit: "",
      span: 7,
      value: "",
      type: false,
      hb: "",
      tb: "",
      loadingConnecting: false,
      down: false,
      up: true,
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        textup: "上拉加载更多", // 松开立即刷新
        rotate: "" // icon-rotate
      },
      arr: [],
      jingli: 0,
      jingjingli: 0,
      tzshow: false,
      // scroll:true,
      totalnum: 1,
      pagenum: 1,
      indexnum: 1,
      urlA: "",
      nianjihua: "",
      nianleiji: "",
      nianmaoli: "",
      yuejihua: "",
      yueleiji: "",
      totalTBClueMoney: "",
      yuemaoli: "",
      act: 1,
      act1: false,
      box: "100",
      value1: "",
      totalLoseTenderMoney: "",
      state2: "",
      input10: "",
      input11: "",
      show2: false,
      biao1: 0,
      biao2: 0,
      chaoe: "",
      TBxiansuo: "",
      yiwancheng: "",
      kaibiao: "",
      zhongbiao: "",
      zhijinjihua: "",
      zhijinwancheng: "0",
      choose: {},
      tableData5: [],
      tableData6: [],
      tableData7: [],
      isshow: 1,
      su: [],
      su1: [],
      su2: [],
      initdate: "",
      tabdata1: [],
      tabdata2: [],
      tabdata3: []
    };
  },
  created() {},
  mounted() {
    this.aler();
    this.getallData();
    this.gethong();
    this.getact();
  },
  watch: {
    value1() {
      this.pagenum = 1;
      this.getallData();
    }
  },
  methods: {
    getact() {
      var lodata = JSON.parse(sessionStorage.getItem("userMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/xiaoshou1") {
          this.act = index + 1;
        }
      });
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
        this.isread = res.data.isread;
      });
    },

    returnZero(a) {
      if (a == "") {
        return -1;
      } else {
        return a;
      }
    },
    aler() {
      var type = localStorage.getItem("type");
      if (type == 3) {
        this.span = 7;
        this.type = true;
      }
      var inittime = new Date();
      function jiazero(a) {
        if (a < 10) {
          return "0" + a;
        } else {
          return a;
        }
      }
      this.initdate =
        inittime.getFullYear() +
        "-" +
        jiazero(Number(inittime.getMonth()) + 1) +
        "-" +
        jiazero(Number(inittime.getDate()));
      this.value1 = this.initdate;
    },

    getallData() {
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
      var scrollTop = document.documentElement.scrollTop;
      needdata({
        submitTime: date1,
        page: this.pagenum,
        role: ""
      })
        .then(res => {
          this.yuejihua = res.totalMthPlanMoney;
          this.totalLoseTenderMoney = res.totalLoseTenderMoney;
          this.hb = res.totalMonthCompare;
          this.tb = res.totalYearCompare;

          this.nianjihua = res.yearPlanMoney;
          this.nianleiji = res.yearFinishMoney;
          this.nianmaoli = res.yearGrossProfit;

          this.yueleiji = res.totalFinishMthMoney;
          this.yuemaoli = res.totalMthGrossProfit;
          this.biao1 = res.yearFinishRate;
          this.biao2 = res.totalFinishMthRate;
          this.yiwancheng = res.totalDayPlanMoney;
          this.zhijinjihua = res.totalMonthShouldMoney;
          this.zhijinwancheng = res.totalFinishMthMoney;
          this.chaoe = res.moneyDifference;
          this.TBxiansuo = res.totalTBClueMoney;
          this.kaibiao = res.totalOpenTenderMoney;
          this.zhongbiao = res.totalGetTenderMoney;
          this.dayTotalGrossProfit = res.dayTotalGrossProfit;

          if (this.pagenum == 1) {
            this.tabdata1 = res.saleInfoList;
          } else {
            for (var i = 0; i < res.saleInfoList.length; i++) {
              this.tabdata1.push(res.saleInfoList[i]);
            }
            document.scrollTop = scrollTop;
          }
          this.jingli = 0;
          this.jingjingli = 0;
          this.tabdata1.forEach(element => {
            this.jingli += Number(element.netProfit);
            this.jingjingli += Number(element.netsProfit);
          });
          this.jingli = this.jingli.toFixed(2);
          this.jingjingli = this.jingjingli.toFixed(2);

          if (res.saleInfoList.length > 0) {
            this.pagenum++;
          } else {
            this.pulldownTip.textup = "我是有底线的";
          }
        })
        .catch(error => {});
    },
    getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/bangdan.styl';

.xstabs_details {
  background: $colorfff;
  text-align: left;
}

.el-input__inner {
  border: none;
}

.bmqb {
  font-size: 0.3rem;
  color: black;
}

.bmbt {
  font-size: 0.26rem;
  color: #999;
  margin-top: 0.15rem;
}

.bmcontent {
  background: #fafafa;
  padding: 10px;
  font-size: 0.3rem;
}

.bmcontent > div {
  width: 33%;
  padding-bottom: 0.3rem;
}

body, html {
  background: #f2f2f5;
}

.flex_1 {
  flex-wrap: wrap;
}

.flex_1 > div {
  width: 100%;
  margin-bottom: 0.2rem;
}

.flex_1 > div > span {
  /* display: block; */
  /* width: 100%; */
}

.blue {
  color: #999;
  /* width: 30%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.3rem;
}

.black {
  color: black;
  /* width: 40%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}

.el-select-dropdown {
  width: 98%;
}

#maincontent1 p {
  padding-left: 20px;
  text-align: left;
}

#maincontent p {
  padding-left: 20px;
  text-align: left;
}

.head {
  height: 1rem;
  font-size: 0.3rem;
  line-height: 1rem;
  background: #21aefb;
  color: #fff;
}

.tap {
  font-size: 0.3rem;
  background: #21aefb;
  height: 0.7rem;
  line-height: 0.7rem;
}

.tap .act {
  background: #fff;
  color: #333;
}

.tap .act a {
  color: #333;
}

.tap a {
  color: #fff;
  text-decoration: none;
}

.maincontent {
  font-size: 0.3rem;
  /* height: 5.5rem; */
  overflow: hidden;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
}

.nianBt {
  line-height: 4.2rem;
  width: 20%;
  background: red;
  color: #fff;
}

table, tbody, thead {
  width: 100% !important;
}

.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  padding: 0;
  text-align: center;
}

.red {
  color: #f16c5d;
}

.cheng {
  color: #fe8b16;
}

/* 刷新 */
.green {
  color: green;
}

.newxin {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: none;
  color: #ccc;
  font-size: 0.24rem;
}

.bmcontent > div {
  border-bottom: 1px solid #ccc;
  padding-top: 0.2rem;
  border-right: 1px solid #ccc;
}

.bmcontent > div:nth-child(3n + 0) {
  border-right: none;
}
</style>