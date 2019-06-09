<template>
  <el-select v-model="value" placeholder="唇部彩妆">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '唇部彩妆'
        }, {
          value: '2',
          label: '光耀底妆'
        }, {
          value: '3',
          label: '面部彩妆'
        }, {
          value: '4',
          label: '眼部彩妆'
        }, 
         {
          value: '5',
          label: '产品功效'
        },
        {
          value: '6',
          label: '护理类型'
        },
        {
          value: '7',
          label: '化妆工具'
        }],
        value: ''
      }
    },
    watch:{
      value(newVal){
        this.$emit('dochange',newVal)
      }
    }
  }
</script>
