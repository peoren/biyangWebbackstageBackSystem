<template>
    <div :style="'height:' + height + 'px'" class="login">
    <el-container :style="'height:' + height + 'px'">
        <el-main>
            <h1>肌肤之钥后台管理系统</h1>
            <p>Cle De Peau Background Management System</p>
            <div class="from">
                <!-- 账号 -->
                <el-input
                placeholder="请输入账号"
                prefix-icon="el-icon-firstshoujihao"
                v-model="username"
                @blur="testphone"
                >
                </el-input>
                <p v-if="phoneIs" class="error">请输入正确账号</p>
                <!-- 密码 -->
                <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-firstpassword"
                v-model="userpass"
                 show-password class="password"  @blur="testpass">
                </el-input>
                <p v-if="passIs" class="error">请输入正确密码</p>
                <!-- 验证码 -->
                <div class="testCode clear">
                  <input type="text" value="" placeholder="请输入验证码" class="code" @focus="focusInput" @blur="outInput" :class="{onfocus:inputfocus}"
                  v-model="code" 
                  >
                  <canvas id="canvas" style="width:100px;height:40px;" ref="canvas" @click="changecode"></canvas>
                </div>
                <p v-if="codeIs" class="error">请输入正确验证码</p>
                <el-button type="primary" @click="login">登录</el-button>
            </div>
            
        </el-main>
        <el-footer>
            <p>
                <span>帮助</span>
                <span>隐私</span>
                <span>条款</span>
            </p>
            <p>版权所有@2019肌肤之钥后台管理系统版权所有</p>
        </el-footer>
    </el-container>
    </div>
</template>
<style scoped>
    .login {
        background: #eee;
    }
   .el-container{
       background: #eee;
   }
   .el-main{
       padding-top: 100px;
       font-size: 16px;
       color: #409EFF;
   }
   .el-main h1{
       font-size: 36px;
       color: #409EFF;
   }
   .from{
       /* border-radius: 10px; */
       box-sizing: border-box;
       width: 350px;
       margin: 40px auto 0;
       padding:  40px 30px;
       background: #fff;
       box-shadow: 0 0 8px #ccc;
   }
   .password{
       margin-top: 20px;
   }
   .testCode{
       height: 40px;
       margin-top: 20px;
   }
   .testCode input::placeholder{
       color: #bbb;
       font-size: 14px;
   }
   #canvas {
       float: right;
       /* vertical-align: middle; */
        box-sizing: border-box;
        border: 1px solid #ddd;
        cursor: pointer;
        background: #fff;
        border-radius: 3px;
    }
    .code{
        float: left;
        width: 180px;
        height: 40px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        outline: none;
        border-radius: 3px;
        padding-left: 20px;
    }
    .onfocus{
        border: 1px solid #409EFF;
        }
    /* .code:hover{
         border: 1px solid #bbb;
    } */
    .el-button{
        margin-top: 30px;
        width: 100%;
    }
    .error{
        text-align: left;
        font-size: 12px;
        color: #F56C6C;
    }
    .el-footer p:first-child span{
        padding: 0 20px;
        font-size: 12px;
        color: #999;
    }
    .el-footer p:last-child{
        font-size: 12px;
        color: #999;
    }
</style>
<script>
export default {
    name:'login',
    data(){
        return{
            inputfocus:false,
            phoneIs:false,
            passIs:false,
            codeIs:false,
            username:'',
            userpass:'',
            code:'',
            show_num:[],
            height:''
        }
    },
    methods:{
        draw:function(show_num){
       var canvas_width=this.$refs.canvas.width;
        var canvas_height=this.$refs.canvas.height;
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        
        for (let i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 30 + i * 60;//文字在canvas上的x坐标
            var y = 80 + Math.random() * 16;//文字在canvas上的y坐标
            context.font = "bold 100px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = this.randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (let i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            let x = Math.random() * canvas_width;
            let y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
        },
        randomColor:function(){
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        changecode:function(){
            this.draw(this.show_num);
        },
        focusInput:function(){
           this.inputfocus=true;
        },
        outInput:function(){
            this.inputfocus=false;
            
            
        },
        testphone:function(){
            if(this.username==''){
                this.phoneIs=true
            }else{
                this.phoneIs=false
            }
        },
        testpass:function(){
            if(this.userpass==''){
                this.passIs=true
            }else{
                this.passIs=false
            }
        },
        login:function(){
            var val = this.code.toLowerCase();
            var num = this.show_num.join("");
            if(val==''){
                this.codeIs=true
            }else if(val == num){
                this.codeIs=false
                if(this.userpass && this.username){
                    console.log(1);
                    
                    //  /* 获取参数 */
                        let that = this
                    //     let userToken = sessionStorage.getItem('user_id'),
                        // let productId=this.$store.state.detail.data.product.productId;
                        let username=that.username,
                            userpass=that.userpass; 
                        let postData = this.$qs.stringify({
                                adminName:username,
                                adminPwd:userpass
                            })
                        this.$http.post('/login/adminLogin',postData)
                        .then(res =>{
                            console.log(res)
                            if(res.data.code==0){
                                /* 0代表没有收藏 */
                            }else if(res.data.code==1){
                                console.log('res');
                                this.$router.push('/goodsmagement')
                                sessionStorage.setItem('user_id',res.data.data.adminToken);
                                sessionStorage.setItem('isLogin','true');
                                location.reload()
                                // this.$router.push('/goodsmagement')
                            }else{
                                /* 服务器报错 */
                                this.$message.error('账号或密码错误！');
                            }
                        })
                        .catch(err => {
                                console.log(err,'错误') 
                        }) 

                }else{
                    this.testphone()
                    this.testpass()
                }
            }else{
                this.codeIs=true
            }
        }
    },
    mounted:function(){
          this.draw(this.show_num);
    },
    created() {
            this.height = document.documentElement.clientHeight
    },
    beforeCreate() {
        // sessionStorage.removeItem('isLogin')
    },
    watch: {

    }
}
</script>


