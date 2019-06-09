<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header :span="24">

      </el-header>
      <!-- 侧边框 -->
      <el-aside :span='4'>
        
      </el-aside>
      <!-- 主体 -->
      <el-main :span='20'>

      </el-main>
      <!-- 底部 -->
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
    
  }
}
</script>
<style scoped>
body{
  margin: 0;
  padding: 0;
}
.el-container{
  height: 600px;
}
.el-aside{
  height: 100%;
  background: cornflowerblue;
}
.el-header{
  background: #000;
}
</style>
