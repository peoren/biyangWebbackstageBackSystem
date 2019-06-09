<template>
  <div id="classify">
    <div>
      <header>
        分类管理
      </header>
     <div class="sel clear">
       <p class="left">一级分类:</p>
       <selectC class="left"  @dochange='dochange'/>
        
        <div   @click='toadd' class="right btn"> 添加二级分类</div>
        
     </div>
    </div>
     <div class="tableC">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="secondlevel_name"
            label="二级分类"
            width="250">
          </el-table-column>
           <el-table-column
            prop="secondlevel_ename"
            label="英语名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="proNum"
            label="商品数量"
            width="250">
          </el-table-column>
         
           <el-table-column label="操作">

            <template slot-scope="scope">
               <el-button
                size="medium "
                type="text"
                @click="todlter(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="medium "
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                
               
            </template>
             </el-table-column>
        </el-table>
     </div>
  </div>
</template>
<script>
import selectC from '@/views/classify/select.vue'

export default {
  components:{
      selectC,
    
  },
  data() {
      return {
        page:1,
        tableData: []
      }
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        // console.log(this.tableData[index].secondlevel_id);
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get('/classify/delclassify?levelId='+this.tableData[index].secondlevel_id+'&firstLevelId='+this.page)
         .then(res=>{
           console.log(res.data)
           if(res.data.code==-1){
             
          this.$message({
            type: 'info',
            message: '当前分类下还有商品'
          });          
       
           
           }else {
             this.tableData=[];
              for(var i=0;i<res.data.data[0].proNumList.length;i++){
                this.tableData.push(res.data.data[0].proNumList[i])
              }
             this.$message({
            type: 'success',
            message: '删除成功!'
          });
           }
         })
        
         
        })
         .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        // 
      },
      toadd(){
        // console.log('ddd')
         this.$router.push("/classifyadd/" + this.page)
      },
      todlter(index, row) {
        var secid= this.tableData[index].secondlevel_id
        console.log(secid)
        this.$router.push("/classifydlter/" + secid)
      },
      dochange(data){
        this.page=data;
        this.$http.get('/classify/getclassifybyfirstlevel?firstLevelId='+this.page)
        .then(res=>{
          this.tableData=[];
        
        for(var i=0;i<res.data.data[0].proNumList.length;i++){
          this.tableData.push(res.data.data[0].proNumList[i])
        }
        // console.log(this.masgs)
      })
      }
    },
    created(){
    
      this.$http.get('/classify/getclassifybyfirstlevel?firstLevelId='+this.page)
      .then(res=>{
       console.log(res.data)
         for(var i=0;i<res.data.data[0].proNumList.length;i++){
          this.tableData.push(res.data.data[0].proNumList[i])
        }
        // console.log(this.masgs)
      })
    }
}
</script>
<style scoped>
/* button {
  height: 20px;
 
} */
.btn {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: white;
  border-radius: 5px;
  background: #409eff;
  cursor: pointer;
}
.right {
  float: right;
}
.tableC {
  text-align: center;
}
.sel {
  height: 40px;
  padding:20px;
  background: #f5f5f5; 
}
.sel p {
  line-height: 40px;
  margin-right:20px; 
}

  #classify {
    
    height: 100%;
    text-align: left;
  }
  header {
    height: 32px;
    line-height: 32px;
    padding-left:10px; 
  }
  ul {
    margin:  0 auto;
  }
  li {
    list-style: none;
    display: inline-block;
    width: 16.6%;
    height: 40px;
    background:white ;
    text-align: center;
    line-height: 40px;
  }
  a {
    color: #333;
    text-decoration: none;
  }
  * {
    margin: 0;
    padding: 0;
}
.clear::after {
    display: table;
    content: '';
    clear: both;
}
.left {
  float: left;
}
</style>
