<template>
    <div id="add">
       
       
        <header>
            编辑分类
        </header>
        <div>
            <div class="name">
                <span>分类名称：</span>
                <input v-model="classify" type="text">
                
            </div>
            
            <div class="name">
                <span>英语名称：</span>
                <input v-model="Ename"  type="text">
                
            </div>
            

            <div class="uplode" >
               <el-upload  
                    :on-change="onchange"
                    class="upload-demo"
                    drag
                    :auto-upload="false"
                    :show-file-list="false"
                    :limit='5'
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div  class="el-upload__text">点击更改图片</div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </div>
            <div id="preview" :style="{backgroundImage:'url('+this.cname+')'}"></div>
            <div>
                 <el-button @click="toback">返回</el-button>
                <el-button @click="upload" type="primary" >确认修改</el-button>
            </div>
            
           
        </div>
       
    </div>
    
</template>
<style scoped>
    #preview {
      width: 350px;
      height: 160px;
      background-size: cover;
      margin: 10px 0  20px 0;
    }
    .uplode{
      background-size:cover;   
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
        cname:'',
        image:'',
      };
    },
    created(){
        var infor =this.$route.params.id;
         this.$http.get('/classify/getclassifybysecondlevel?secondlevelId='+infor)
         .then(res=>{
             console.log(res.data)
             this.classify=res.data.data.secondlevelName;
             this.Ename=res.data.data.secondlevelEname;
             this.image=res.data.data.secondlevelPic;  
            this.cname=res.data.data.secondlevelPic;
         })
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
                  secondlevelId:this.$route.params.id,
                //    userToken:'1234',
                   secondlevelName:this.classify,
                   secondlevelEname:this.Ename,
                   secondlevelPic:this.cname,

                })
      this.$http.post('/classify/modifyclassify',postData)
      .then(res=>{
          if(res.data.code==1){
               this.$message({
            type: 'success',
            message: '修改成功!'
               })
                this.$router.push("/classify/")
          }
      })
    }
    }
  }
</script>