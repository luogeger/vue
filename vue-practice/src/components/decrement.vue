<template>
  <div class="box">
    <p>{{asd}}</p>
    <p>{{price}}</p>
    <button @click="add">增加</button>
    <button @click="sub">减少</button>
  </div>

</template>
<script>
export default {
  name: 'box',
  data () {
    return {
      asd: 'decrement',
      price: 10
    }
  },
  methods: {
    add () {
      this.$store.commit('increment', this.price)
    },
    sub () {
      this.$store.commit('decrement', this.price)
    },
  }
};

</script>
<style scoped>
.box{
  border: 1px solid blue;
}
</style>
