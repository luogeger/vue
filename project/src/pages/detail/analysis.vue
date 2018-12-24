<template>
  <div class="sales-board">

    <div class="sales-board-intro">
      <h2>流量分析</h2>
      <p>123是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    </div><!-- /介绍 -->

    <div class="sales-board-form">

      <div class="sales-board-line">
        <div class="sales-board-line-left"> 购买数量： </div>
        <div class="sales-board-line-right">
          <v-counter @on-change="onParamChange('buyNum',$event)"></v-counter>
        </div>
      </div><!-- /购买数量 -->

      <div class="sales-board-line">
        <div class="sales-board-line-left"> 产品类型： </div>
        <div class="sales-board-line-right">
          <v-selection @on-change="onParamChange('buyType',$event)" :selections="productTypes" ></v-selection>
        </div>
      </div><!-- /产品类型 -->

      <div class="sales-board-line">
        <div class="sales-board-line-left"> 有效时间： </div>
        <div class="sales-board-line-right">
          <v-choose @on-change="onParamChange('buyPeriod', $event)" :validPeriod="validPeriod"></v-choose>
        </div>
      </div><!-- /有效时间 -->

      <div class="sales-board-line">
        <div class="sales-board-line-left"> 产品版本： </div>
        <div class="sales-board-line-right">
          <v-multiple @on-change="onParamChange('buyVersions', $event)" :checkbox="versions"></v-multiple>
        </div>
      </div><!-- /产品版本 -->

      <div class="sales-board-line">
        <div class="sales-board-line-left"> 总价： </div>
        <div class="sales-board-line-right"> {{totalPrice}}元 </div>
      </div><!-- /总价 -->

      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
        <div class="sales-board-line-right">
          <div class="button" @click="buyNow">
            立即购买
          </div>
        </div>
      </div><!-- /立即购买 -->
    </div><!-- / 选择产品 -->

    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

      <h3>用户行为指标</h3>
      <ul>
        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
        <li>用户在网站的停留时间；</li>
        <li>用户来源网站（也叫“引导网站”）；</li>
        <li>用户所使用的搜索引擎及其关键词；</li>
        <li>在不同时段的用户访问量情况等。</li>
      </ul>

      <h3>浏览网站方式</h3>
      <ul>
        <li>用户上网设备类型</li>
        <li>用户浏览器的名称和版本</li>
        <li>访问者电脑分辨率显示模式</li>
        <li>用户所使用的操作系统名称和版本</li>
        <li>用户所在地理区域分布状况等</li>
      </ul>
    </div><!-- /产品说明 -->

    <my-dialog :is-show="isShow" @on-close="isHide">
      <table class="buy-dialog-table">
      <tr>
        <th>购买数量</th>
        <th>产品类型</th>
        <th>有效时间</th>
        <th>产品版本</th>
        <th>总价</th>
      </tr>
      <tr>
        <td>{{buyNum}}</td>
        <td>{{buyType.label}}</td>
        <td>{{buyPeriod.label}}</td>
        <td>
          <span v-for="item in buyVersions">{{item.label}} &nbsp;</span>
        </td>
        <td>{{totalPrice}}</td>
      </tr>
    </table>
      <h3 class="buy-dialog-title">请选择银行</h3>
      <banks @on-change="chooseBank"></banks>
      <div class="button buy-dialog-btn" @click="confirmBuy"> 确认购买 </div>
    </my-dialog><!-- /确认购买 dialog -->

    <!-- 这里的 :is-show -->
    <check-order :is-show-check='isShowDialogCheck' >
    </check-order>





  </div><!-- /end -->
</template>
<script>
import VCounter       from '../../components/base/counter'
import VSelection     from '../../components/base/selection'
import VChoose        from '../../components/base/radio'
import VMultiple      from '../../components/base/checkBox'
import Banks          from '../../components/base/chooseBanks'
import CheckOrder     from '../../components/base/checkOrder'
import Dialog         from '../../components/dialog'
import _              from 'lodash'
//
export default {
  components: {
    VSelection,
    VChoose,
    VMultiple,
    VCounter,
    myDialog: Dialog,
    Banks,
    CheckOrder,
  },

  data () {
    return {
      // 请求价格，传递到后端的参数，
      buyNum: 0,
      buyType: {},
      buyPeriod: {},
      buyVersions: [],

      isShow: false,
      totalPrice: 0,
      bankID: null,

      isShowDialogCheck: true,// 确认购买的dialog

      productTypes: [
        {
          label: '入门级别',
          value: 0
        },
        {
          label: '中级版本',
          value: 1
        },
        {
          label: '高级版本',
          value: 2
        },
      ],// 产品类型

      validPeriod: [
        {
          label: '6个月',
          value: 0
        },
        {
          label: '9个月',
          value: 1
        },
        {
          label: '12个月',
          value: 2
        },
      ],// 有效时间

      versions: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        },
        {
          label: '基础版',
          value: 3
        },
      ],// 产品版本
    }
  },// data

  created (){

  },// created

  mounted (){

    this.buyNum         = 1;
    this.buyType        = this.productTypes[0];
    this.buyVersions    = [this.versions[1]];
    this.buyPeriod      = this.validPeriod[1];
    this.totalPrice     = 99;
  },// mounted

  methods: {
    ontest (attr, val) {
      this[attr] = val;
      console.log(attr, this[attr])
    },// test

    onParamChange (attr, val) {
      this[attr] = val;
      this.getPrice();

    },//

    getPrice () {
      let versionsArr = _.map(this.buyVersions, (item) => {
          return item.value;
      })

      let reqParams = {
          buyNum:   this.buyNum,
          buyType:  this.buyType.label,
          period:   this.buyPeriod.label,
          versions: versionsArr.join(','), //this.versions还需要_.map()方法处理一下
      }
      console.log(reqParams)

      this.$http.post('/api/getPrice', reqParams).then(
        (res) => {
          this.totalPrice = res.body.amount;
        },
        (err) => {
          console.log(err)
        }
      )
    },//

    buyNow () {
      this.isShow = true;
    },//

    isHide () {
      this.isShow = false;
    },//

    chooseBank (bankObj) {
      this.bankID = bankObj.id;
    },// 选择银行

    confirmBuy () {
      let versionsArr = _.map(this.buyVersions, (item) => {
        return item.value;
      })

      let reqParams = {
        buyNum: this.buyNum,
        buyType: this.buyType.label,
        period: this.buyPeriod.label,
        versions: versionsArr.join(','), //this.versions还需要_.map()方法处理一下
        bankID: this.bankID,
      }

      this.$http
        .post('/api/createOrder', reqParams)
        .then((res) => {
          console.log(res.body.orderId);
        },
        (err) => {
          console.log(err);
        })

    },// 确认购买

  },// methods

}// end
</script>

<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }
  .buy-dialog-btn {
    margin-top: 20px;
  }
  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .buy-dialog-table td,
  .buy-dialog-table th{
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }
  .buy-dialog-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
  }
</style>
