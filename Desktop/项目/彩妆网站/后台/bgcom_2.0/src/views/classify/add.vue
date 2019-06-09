<template>
    <div id="add">
       
       
        <header>
            添加分类
        </header>
        <div>
            <div class="name">
                <span>分类名称：</span>
                <input v-model="classify" type="text">
                
            </div>
            
            <div class="name">
                <span>英语名称：</span>
                <input v-model="Ename"   type="text">
                
            </div>
            

            <div class="uplode">
               <el-upload 
                    :on-change="onchange"
                    class="upload-demo"
                    drag
                    :show-file-list="false"
                     :auto-upload="false"
                    :limit='1'
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击上传图片</div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </div>
            <div v-if="this.flage!=0" id="preview" :style="{backgroundImage:'url('+this.cname+')'}"></div>
            <div>
                 <el-button @click="toback">返回</el-button>
                <el-button @click="upload" type="primary" >新建分类</el-button>
            </div>
            
           
        </div>
       
    </div>
    
</template>
<style scoped>
    #preview {
      width: 350px;
      height: 160px;
      background-size: cover;
      margin: 10px 0  20px  0;
    }
    header {
        font-size: 18px;
        margin:20px 0 ;
    }
    #add {
        text-align: left;
    }
    .uplode{
           margin :20px 0 
    }
    .name {
        margin-top: 20px;
    }
    input {
        width: 160px;
        height: 30px;
        border-radius: 5px;
        border:1px solid #333;
        padding-left: 10px; 
        margin: 0 20px 0 0 ;
    }
  
</style>
<script>
  export default {
    data() {
      return {
        imageUrl: '',
        classify:'',
        Ename:'',
       flage:0,
        cname:'',
      };
    },
    methods: {
        onchange(file){
            this.param = new FormData()
            
            this.param.append('file', file.raw, file.name)
            // console.log(this.param)
            this.upData()
        },
        toback(){
            this.$router.push("/classify/")
        },
     
       upData() {
      var _that = this;
      this.$http
        .post("/upload", this.param)
        .then(res => {
            this.flage++;
          this.cname=res.data.data
            console.log(this.cname)
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
        });
    },
    upload(){
    let postData = this.$qs.stringify({
                  firstlevelId:this.$route.params.id,
                //    userToken:'1234',
                   secondlevelName:this.classify,
                   secondlevelEname:this.Ename,
                   secondlevelPic:this.cname,

                })
      this.$http.post('/classify/addclassify',postData)
      .then(res=>{
          if(res.data.code==1){
               this.$message({
            type: 'success',
            message: '增加成功!'
               })
               this.$router.push("/classify/")
          }
      })
    }
    }
  }
</script>