<template>
  <div class="box">
    <p>{{asd}}</p>
    <p v-text="price"></p>
    <button @click="add">增加</button>
    <button @click="sub">减少</button>
  </div>
</template>
<script>
export default {
  name: 'box',
  data () {
    return {
      asd: 'increment',
      price: 5,
    }
  },
  methods: {
    add () {
      //this.$store.commit('increment', this.price);
      this.$store.dispatch('increase', this.price);
    },
    sub () {
      this.$store.commit('decrement', this.price)
    },
  }
}
</script>
<style scoped>
.box{
  border: 1px solid red;
}
</style>
