<template>
  <div class="temp-box">
    <div class="btn">
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="ghost">Ghost</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="info">Info</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>

      <br><br><br>
      <Icon type="checkmark" />
      <Icon type="calendar"></Icon>
    </div>

    <br>
    <Table width="750" border :columns="columns2" :data="data3"></Table>

    <br>
    <div class="temp">
      temp.css
    </div>

    <br>
    <div class="data-box">
      <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
    </div>

    <br>
    <div class="data-box">
      <DatePicker type="daterange" placement="bottom-end" placeholder="选择一个区间" style="width: 200px"></DatePicker>
    </div>
  </div><!-- /end -->
</template>
<script>
  import { Table,Button} from 'iview';

  export default {
    components: {
      Button,
      Table
    },

    created () {
        console.log(this)
    },

    data () {
      return {
        columns2: [
          {
            title: 'Name',
            key: 'name',
            width: 100,
            fixed: 'left'
          },
          {
            title: 'Age',
            key: 'age',
            width: 100
          },
          {
            title: 'Province',
            key: 'province',
            width: 100
          },
          {
            title: 'City',
            key: 'city',
            width: 100
          },
          {
            title: 'Address',
            key: 'address',
            width: 200
          },
          {
            title: 'Postcode',
            key: 'zip',
            width: 100
          },
          {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, 'Edit')
              ]);
            }
          }
        ],
        data3: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            province: 'America',
            city: 'New York',
            zip: 100000
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'Washington, D.C. No. 1 Lake Park',
            province: 'America',
            city: 'Washington, D.C.',
            zip: 100000
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            province: 'Australian',
            city: 'Sydney',
            zip: 100000
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
        ]
      }
    }
  }// export


</script>
<style scoped>

</style>
