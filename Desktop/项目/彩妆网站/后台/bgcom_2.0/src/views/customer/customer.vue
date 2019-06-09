<template>
  <div>
    <div class="manage">
      <span>客户管理</span>
    </div>

    <div class="search">
      <div class="block time1">
        <span class="demonstration" style="margin-left:5px">电话号码:</span>
        <el-input @keydown.enter.native="search" v-model="input" placeholder="请输入电话号码" style="width:220px"></el-input>
        <el-button class="se" type="" @click="search">搜索</el-button>
      </div>
    </div>

    <div style="width:100%;height:20px;background:#f5f5f5;margin-bottom:20px"></div>

    <el-table :data="pageInfo" border style="width: 100%">
      <el-table-column prop="userName" label="会员名称" min-width="15%"></el-table-column>
      <el-table-column prop="userSex" label="会员性别" min-width="15%"></el-table-column>
      <el-table-column prop="userPhone" label="电话号码" min-width="15%"></el-table-column>
      <el-table-column prop="userEmail" label="电子邮件" min-width="15%"></el-table-column>
      <el-table-column prop="userIntegral" label="会员积分" min-width="15%"></el-table-column>
      <el-table-column prop="userBrith" label="生日时间" min-width="15%"></el-table-column>
    </el-table>

    <div class="block page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="pages*10"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    this.getdata()
  },
  methods:{
      search(){
        var that = this
        if(this.input == '') {
            this.$http.get("/orders/selectallusers?pageNum=1")
          .then(function(res) {
            if (res.data.code == 1) {
              console.log(res.data.data.pageInfo)
            that.pageInfo = res.data.data.pageInfo
            that.pages =  res.data.data.pages
            } else {
            }
          })
          .catch(err => {
            console.log(err, "错误");
          });
          return 
        }
        // console.log(this.input)
        this.$http.get("/orders/subyuserphone?userPhone=" + this.input)
         .then(function(res) {
          if (res.data.code == 1) {
            console.log(res.data.data)
           that.pages = res.data.data.pages
           that.pageInfo = res.data.data.pageInfo
          } else {
          }
        })
        .catch(err => {
          console.log(err, "错误");
        });

      },
      handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let that = this
          this.$http.get("/orders/selectallusers?pageNum=" + val)
         .then(function(res) {
          if (res.data.code == 1) {
            console.log(res.data.data.pageInfo)
           that.pageInfo = res.data.data.pageInfo
           that.pages =  res.data.data.pages
          } else {
          }
        })
        .catch(err => {
          console.log(err, "错误");
        });
      },
    getdata(){
      let that = this
      //    let postData = this.$qs.stringify({
      //     pageNum:val
      // })
        this.$http.get("/orders/selectallusers?pageNum=1")
         .then(function(res) {
          if (res.data.code == 1) {
            console.log(res.data.data.pageInfo)
           that.pageInfo = res.data.data.pageInfo
           that.pages =  res.data.data.pages
          } else {
          }
        })
        .catch(err => {
          console.log(err, "错误");
        });
    }
  },
  
    


  data() {
    return {
      pageInfo:[],
      currentPage4:1,
      pageNum:1,
      pages:'',
      // msg: [
      //   {
      //     name: "小红",
      //     sex: "男",
      //     phone: "2323",
      //     email: "sfsfwf",
      //     points: "100",
      //     birthday: "1996-05-02"
      //   },
      //   {
      //     name: "小红",
      //     sex: "男",
      //     phone: "2323",
      //     email: "sfsfwf",
      //     points: "100",
      //     birthday: "1996-05-02"
      //   },
      //   {
      //     name: "小红",
      //     sex: "女",
      //     phone: "2323",
      //     email: "sfsfwf",
      //     points: "100",
      //     birthday: "1996-05-02"
      //   }
      // ],
      input: "",
    
    };
  }
};
</script>
<style scoped>
.manage {
  text-align: left;
  padding: 0 0 20px 10px;
  background: #f5f5f5;
}
.search {
  margin: 20px;
}
.time1 {
  text-align: left;
  margin-left: 0;
  margin-bottom: 20px;
  min-width: 320px;
}
.time2 {
  width: 320px;
  margin-left: 0;
  margin-bottom: 20px;
}
.demonstration {
  margin-right: 20px;
}
button {
  border-radius: 3px;
  padding: 0 12px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  border-width: 1px;
  background: none;
  margin-right: 5px;
}
.detail {
  background: #b3c0d1;
  color: #fff;
}
.page {
  margin-top: 20px;
}
.se{
  margin-left: 20px;
  background: #b3c0d1
}
</style>

