<template>
  <el-container :style="'height:' + height + 'px; border: 1px solid #eee;'">
    <el-aside
      width="210px"
      :height="height + 'px'"
      style="background-color: rgb(255, 255, 255);margin-top:60px;"
    >
      <el-menu :default-openeds="[]">
        <router-link to="/account" tag='span'>
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-message"></i>账号管理
          </template>
        </el-menu-item>
        </router-link>
        <router-link to="/customer" tag='span'>
        <el-menu-item index="2">
          <template slot="title">
            
            <i class="el-icon-menu"></i>客户管理
            
          </template>
        </el-menu-item>
        </router-link>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>商品管理
          </template>
          <el-menu-item index="3-1">
            <template slot="title">
              <router-link to="/goodsmagement" tag='span'>
              所有商品
              </router-link>
              </template>
          </el-menu-item>
          <el-menu-item index="3-2">
            <template slot="title">
              <router-link to="/goodsadd" tag='span'>
              增加商品
              </router-link>
              </template>
          </el-menu-item>

        </el-submenu>
        <router-link to="/classify" tag='span'>
        <el-menu-item index="4">
          <template slot="title">
            
            <i class="el-icon-menu"></i>分类管理
            
          </template>
        </el-menu-item>
        </router-link>
        <router-link to="/order" tag='span'>
          <el-menu-item index="5">
            <template slot="title">
              
              <i class="el-icon-message"></i>订单管理
              
            </template>
          </el-menu-item>
        </router-link>
        <!-- <router-link to="/home" tag='span'>
        <el-menu-item index="7">
          <template slot="title">
            
            <i class="el-icon-message"></i>首页管理
            
          </template>
        </el-menu-item>
        </router-link> -->
        <router-link to="/chart" tag='span'>
        <el-menu-item index="8">
          <template slot="title">
            
            <i class="el-icon-message"></i>报表管理
            
          </template>
        </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div style="height:60px; background-color:#B3C0D1; z-index:999;" id="head"></div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view to='/goodsmagement'/>
       
      </el-main>
    </el-container>

  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: rgb(51, 48, 48);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      height:'',
      tableData: Array(20).fill(item),
      isCollapse: true,
      openFlag: true,
      demo: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        }
      ],
      // // 分页数据
      //  currentPage: 1,//当前页
      //  total: 200,//总条数数
      //  pageSize: 10,//每页条数
      // // 表格数据
      // tableData: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }]
    }
  },
  created() {
    this.height = document.documentElement.clientHeight
    
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // drawLine() {
    //   // 获取dom结构
    //   let myChart = this.$echarts.init(document.getElementById("myChart"));
    //   var option = {
    //     title: {
    //       text: "ECharts 入门示例"
    //     },
    //     tooltip: {},
    //     legend: {
    //       data: ["销量"]
    //     },
    //     xAxis: {
    //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "销量",
    //         type: "bar",
    //         data: [5, 20, 36, 10, 10, 20]
    //       }
    //     ]
    //   };

    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    // },
    // 分页
    // handleCurrentChange(val){
    //   console.log(val,'handleCurrentChange');
      
    // }
  },
  mounted() {
    // this.drawLine();
  }
};
</script>
<style scoped>
#head {
  position: absolute;
  left: -210px;
  width: 210px;
}
.el-header {
  position: relative;
}
</style>
