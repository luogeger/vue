/**
 * Created by luogege on 2017.04.12.
 */
var vm = new Vue({
    el: '#app',

    data: {
        //asd: 'luoxiaoqing',
        productList: [],
        checkBgcAllFlage: false,//全选框状态切换
        totalMoney: 0,//总金额联动
        delFlag: false,//对话框，弹出层状态切换
        delItem: "",//存储要删除的item的临时变量
    },//data end

    filters: {
        formatMoney: function (value){
            return "￥" + value;
        }
    },//filters end


    mounted: function (){
        this.carView();
    },

    methods: {
        carView: function (){
            var _this = this;
            //this.asd = 'luogeger';
            this.$http.get('tsconfig.json').then(function (res){
                _this.productList = res.body.result.list;
            });
        },
        //商品的增加，减少
        changeMoney: function (item, type){
            if(type > 0){
                item.productQuentity++;
            }
            else{

                if(item.productQuentity < 2){
                    item.productQuentity = 1;
                }
                else{
                    item.productQuentity--;
                }
            };
            this.calcTotalPrice();
        },
        //单个商品被选中的状态切换
        selectCheckBgc: function (item){
            if(typeof item.CheckBgcFlag == 'undefined'){
                Vue.set(item, 'CheckBgcFlag', true);
            }
            else{
                item.CheckBgcFlag = !item.CheckBgcFlag;
            };
            this.calcTotalPrice();
        },
        //全选，取消全选的切换，以及联动商品列表
        selectCheckBgcAll: function (flag){
            this.checkBgcAllFlage = flag;
            this.productList.forEach(function (value, index){
                if(typeof value.CheckBgcFlagm == 'undefined'){
                    Vue.set(value, 'CheckBgcFlag', flag)
                }
                else{
                    value.CheckBgcFlagm = flag;
                }
            });
            this.calcTotalPrice();
        },
        //计算总金额
        calcTotalPrice: function (){
            this.totalMoney = 0;
            var _this = this;
            this.productList.forEach(function (value, index){
                if(value.CheckBgcFlag){//单个商品，只有被选中才需要计算价格
                    _this.totalMoney += value.productQuentity * value.productPrice;
                }
            })
        },
        //点击删除按钮获取当前商品
        delId: function (item){
            this.delFlag = !this.delFlag;
            this.delItem = item;//把获取到要删除的单品，存储起来，在用原生js进行删除

        },
        //点击YES， 确认删除
        delConfirm: function (){
            var index = this.productList.indexOf(this.delItem);
            this.productList.splice(index, 1);
            this.delFlag = !this.delFlag;
            this.calcTotalPrice();
        }
    },//methods end


});
//ready: function (){}, 生命周期的一部分，在实例化创建完成以后，默认查询某一个方法；
// Vue.filter(); 全局的过滤器
Vue.filter('money', function (value, type ){
    return value + type;
});