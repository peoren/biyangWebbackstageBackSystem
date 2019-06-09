<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <login v-if='isLogin != "true"'/>
    <about v-if='isLogin == "true"'/>
  </div>
</template>
<script>
import about from '@/views/About.vue'
import home from '@/views/Home.vue'
import login from '@/views/login/login.vue'
import '@/components/reset.css'
export default {
  data() {
    return {
      isLogin:sessionStorage.getItem('isLogin')
    }
  },
  created() {
    console.log(this.isLogin)
  },
  beforeCreate() {
      // sessionStorage.setItem('isLogin','true')
  },
  components:{
      about,
      home,
      login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* switch */

.switch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  /*打开时文字位置设置*/
  .switch .el-switch__label--right {
    z-index: 1;
   right: -3px;
 }
 /*关闭时文字位置设置*/
 .switch .el-switch__label--left {
   z-index: 1;
   left: 19px;
    color: #fff;
 }
 /*显示文字*/
 .switch .el-switch__label.is-active {
   display: block;
    color: #fff;
 }
 .switch.el-switch .el-switch__core,
 .el-switch .el-switch__label {
   width: 55px !important;
    color: #fff;
 }

</style>
