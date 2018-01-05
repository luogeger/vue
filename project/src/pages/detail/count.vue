<template>
  <div class="aaaa">
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="ghost">Ghost</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>



</template>
<script>
  import { Button} from 'iview';

  export default {
    components: {
      Button,
    },
    created () {
        console.log(this.$el)
    }
  }


</script>
<style scoped>

</style>
