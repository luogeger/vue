<!--
1. 立即购买的跳转需要router-link
-->
<template>
  <div class="index-wrap">
    <!-- left -->
    <div class="index-left">
      <!-- 全部产品 -->
      <div class="index-left-block">
        <h2>全部产品</h2>
        <template v-for="product in productList">
          <h3>{{product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{item.name}}</a>
              <span class="hot-tag" v-if="item.hot">hot</span>
            </li>
          </ul>
          <div class="hr" v-if="product.last"></div>
        </template>


      </div>
      <!-- 最新消息 -->
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList" class="new-item">
            <a :href="item.url">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- right -->
    <div class="index-right">
      <!-- banner -->
      <slide-show :slides="slides" :slideSpeed="slideSpeed" @sonToBaba="doSome"></slide-show>
      <!-- board   line-ladt,index-board-item.id, -->
      <div class="index-board-list">
        <div v-for="(item, index) in boardList" :class="[{'line-last': index%2 !== 0}, 'index-board-'+item.id ]" class="index-board-item">
          <div class="index-board-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
              <a :href="item.toKey" class="button">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><!-- index-wrap end -->
</template>

<script>
import slideShow from './detail/slideShow'

export default {

  methods: {
    doSome () {
      //console.log('doSomeThing');
    }
  },

  components: {
    slideShow
  },

  created () {
    this.$http.get('api/getNewsList')
    .then(
      (res) => {;
          this.newsList = res.data;
      },
      (err) => {
        console.log('error');
      }
    );
  },//created end

  data () {
    return {
      slideSpeed: 1000,
      slides: [
        {
          src: require('../assets/slideShow/b1.jpg'),
          title: '致青春',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/b2.jpg'),
          title: '新品上市',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/b3.jpg'),
          title: '今日热门',
          href: 'detail/forecast'
        },
        {
          src: require('../assets/slideShow/b4.jpg'),
          title: '0元首付',
          href: 'detail/publish'
        },
        {
          src: require('../assets/slideShow/b5.jpg'),
          title: '360疯了',
          href: 'detail/analysis'
        },
      ],
      productList: {
        pc: {
          title: 'PC产品',
          list: [
            {
              name: '数据统计',
              url: 'http://starcraft.com'
            },
            {
              name: '数据预测',
              url: 'http://warcraft.com'
            },
            {
              name: '流量分析',
              url: 'http://overwatch.com',
              hot: true
            },
            {
              name: '广告发布',
              url: 'http://hearstone.com'
            }
          ]

        },
        app: {
          title: 'APP应用产品',
          last: true,
          list: [
            {
              name: '91助手',
              url: 'http://weixin.com'
            },
            {
              name: '产品助手',
              url: 'http://twitter.com',
              hot: true
            },
            {
              name: '智能地图',
              url: 'http://maps.com'
            },
            {
              name: '团队语音',
              url: 'http://phone.com'
            }
          ]
        }
      },
      newsList: [
//        {
//          title: '财经消息',
//          url: 'http://starcraft.com'
//        },
//        {
//          title: '体育报道',
//          url: 'http://warcraft.com'
//        },
//        {
//          title: '数码信息',
//          url: 'http://overwatch.com',
//          hot: true
//        },
//        {
//          title: '房产信息',
//          url: 'http://hearstone.com'
//        }
      ],
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'car',
          toKey: 'detail/analysis',
          saleout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          id: 'earth',
          toKey: 'detail/count',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          id: 'loud',
          toKey: 'detail/forecast',
          saleout: true
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          id: 'hill',
          toKey: 'detail/publish',
          saleout: false
        }
      ],

    }
  },//data end

}
</script>

<style scoped lang="scss">
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 49.5%;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-top: 10px;

    &:nth-child(odd){
      margin-right: 1%;
    }
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag{
    background-color: #ff0000;
    color: #ffffff;
    border-radius: 4px;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;/* 文字超出用...*/
    white-space: nowrap;/* 文字不换行*/
  }

</style>
