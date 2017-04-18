/**
 * Created by luogege on 2017.04.12.
 */
var vm = new Vue({
    el: '#app',

    data: {
        //asd: 'luoxiaoqing',
        productList: [],
        checkBgcAllFlage: false,
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

            }
        },
        selectCheckBgc: function (item){
            if(typeof item.CheckBgcFlag == 'undefined'){
                Vue.set(item, 'CheckBgcFlag', true);
            }
            else{
                item.CheckBgcFlag = !item.CheckBgcFlag;
            }
        },
        selectCheckBgcAll: function (flag){
            this.checkBgcAllFlage = flag;
            this.productList.forEach(function (value, index){
                if(typeof value.CheckBgcFlagm == 'undefined'){
                    Vue.set(value, 'CheckBgcFlag', flag)
                }
                else{
                    value.CheckBgcFlagm = flag;
                }
            })
        }
    },//methods end


});
//ready: function (){}, 生命周期的一部分，在实例化创建完成以后，默认查询某一个方法；
// Vue.filter(); 全局的过滤器
Vue.filter('money', function (value, type ){
    return value + type;
});