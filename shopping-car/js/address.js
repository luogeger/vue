/**
 * Created by luogege on 2017.05.05.
 */
new Vue({
    el: '.container',
    data: {
        addressList: [],
        addressListLength: 3,
        currentIndex: 0,
    },
    mounted: function (){//钩子函数，声明周期
        this.$nextTick(function (){
            this.fetchAddredd();//调用默认方法
        })
    },
    computed: {
      filterAddress: function (){
          return this.addressList.slice(0, this.addressListLength);
      }
    },
    methods: {
        fetchAddredd: function (){
            var _this = this;
            this.$http.get('data/address.json').then(function (resp){
                var res = resp.data;
                if(res.status == '0'){
                    this.addressList = res.result;
                    console.info(this.addressList);
                }
            })
        },
        changeAddressListLength: function (){
            this.addressListLength = this.addressList.length;
        },
        setDefault: function (addressID){
            this.addressList.forEach(function (item, index){
                if(item.addressID == addressID){
                    item.idDefault = true;
                }
                else{
                    item.idDefault = false;
                }
            });
        },
    }
});