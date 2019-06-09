<template>
    <div class="color">
        <div class="addcolor">
            <div class="clear">
                <p v-show="disabled" >已存在颜色</p>
                <div class="showcolorbox" v-for="(color,index) in oldData" :key="index">
                    <div  class="showcolor">
                        <span id="showcolorTitle">该色号价格：</span>
                        <span for="" class="showlabel">{{color.product_inf_price}}元</span>
                        <br>
                        <span id="showcolorTitle">添加的颜色：</span>
                        <span for="" class="showlabel">{{color.product_format}}:</span>
                        <span for="" class="showlabel">{{color.product_inf_spic}}</span>
                        <div class="colorbox" :style="{'background':color.product_inf_spic}" >

                        </div>  
                    </div>
                    <div class="imgbox">
                        <img :src="color.product_inf_bpic" alt="" >
                        <img :src="color.product_inf_fpic" alt="" >
                    </div>
                </div>
            </div>
            <p>添加颜色</p>
            <label for="getcolor" id="colorlabel">颜色:</label>
            <input type="text" class="getcolor" v-model="colorname">
            <span>:</span>
            <input type="text" class="getcolor" v-model="colorvalue">
            <div class="colorbox" :style="{'background':colorvalue}"></div>
            <div class="inputTable ch">
                <label for="goodsprice">初始价格</label>
                <input type="text" id="goodsprice" placeholder="请输入初始价格" v-model="goodsprice" @blur="checkprice">
                <label v-show="priceFlag" style="color:red">价格格式错误</label>
            </div>
            <span class="btn confrimbtn" @click="colorConfirm(colorname,colorvalue)">确认</span>
        </div>
        
        <el-upload
            class="upload-demo"
            drag
            ref="upload"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-change="onchange"
            :auto-upload="false"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" @click="btnvalueFlag>=1 ? 0 :btnvalueFlag++">{{btnvalue[btnvalueFlag]}}</div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div class="showcolorbox" v-for="(color,index) in colordata" :key="index">
            <div  class="showcolor">
                <span id="showcolorTitle">该色号价格：</span>
                <span for="" class="showlabel">{{pricedata[index]}}元</span>
                <br>
                <span id="showcolorTitle">添加的颜色：</span>
                <span for="" class="showlabel">{{color.colorname}}:</span>
                <span for="" class="showlabel">{{color.colorvalue}}</span>
                <div class="colorbox" :style="{'background':color.colorvalue}" >

                </div>
                
                <span class="btn" @click="colordel(index)">删除</span>
            </div>
            <div class="imgbox">
                <img :src="imgsrc[index*2]" alt="" >
                <img :src="imgsrc[index*2+1]" alt="" >
            </div>
        </div>
        <!-- <div class="imgbox clear">
            <img v-for="(img,index*2) in imgsrc" :src="imgsrc[index*2]" alt="" >
            <img v-for="(img,index*2+1) in imgsrc" :src="imgsrc[index*2+1]" alt="" >
        </div> -->
    </div>
</template>
<script>
export default {
    props:['firstlevel_id','secondlevel_id','clearAllFlag','oldData','disabled'],
    data:function(){
        return {
            colordata:[],
            colorvalue:'#F56c6c',
            colorname:'123',
             fileList: [],
            btnvalue:['点击上传大图','点击上传规格图'],
            btnvalueFlag:0,
            imgsrc:[],
            pricedata:[],
            goodsprice:'',
            // 价格正则
            priceFlag:false
        }
    },
    methods:{
        // 确认颜色并添加进colordata数组
        colorConfirm:function(colorname,colorvalue){
            let colornameTemp=colorname
            let colorvalueTemp=colorvalue
            let that=this
            if(!colorname || !colorvalue || !that.goodsprice || this.priceFlag)
            {
                 this.$message.error('价格或颜色数据为空或格式错误');
                return false
            }
            
            this.colordata.push({
                colorname:colornameTemp,
                colorvalue:colorvalueTemp
            })
            this.pricedata.push(that.goodsprice)
            this.colorname=''
            this.colorvalue=''
            this.goodsprice=''
        },
        // 删除按钮事件，删除颜色,价格，图片
        colordel:function(index){
            this.imgsrc.splice(index*2,2)
            this.colordata.splice(index,1)
            this.pricedata.splice(index,1)
        },
        // 图片上传函数
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            this.param.delete('file')
            // console.log(this.param);
        },
        handlePreview(file) {
            // console.log(file);
        },
        onchange(file,filesList) {
            // console.log(file);
            // console.log(this.fileList);
            // 创建临时的路径来展示图片
            // var windowURL = window.URL || window.webkitURL
            // this.src=windowURL.createObjectURL(file.raw)
            //重新写一个表单上传的方法
            this.param = new FormData()
            this.param.append('file', file.raw, file.name)
            // 当改变的时候就上传
            this.upimg(this.param) 
        },
        // 上传图片到服务器
        upimg(param){
            let that=this
            let formData=param
                this.$http
                .post("/upload", formData)
                .then(res => {
                    that.imgsrc.push(res.data.data) 
                })
                .catch(err => {
                console.log(err);
                console.log("请求失败");
                });

        },
        // 清除所有函数
        clearAll(){
            this.colordata=[]
            this.colorvalue=''
            this.colorname=''
            this.fileList= []
            this.btnvalueFlag=0
            this.imgsrc=[]
            this.pricedata=[]
            this.goodsprice=''
            this.param.delete('file')
        },
        checkprice(){
            const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
            let goodsprice=this.goodsprice
            if(!reg.test(goodsprice)){
                this.priceFlag=true
            }else{
                 this.priceFlag=false
            }
        }
        
    },
    created(){
        
    },
    watch:{
        colordata:{
            handler(val){
                // val={
                //     colorname:val[0].colorname,
                //     colorvalue:val[0].colorvalue
                // }
                // console.log(val);
                this.$emit('getpricedata',this.pricedata)
                this.$emit('getcolordata',val)
            },deep:true
        },
        imgsrc:{
            handler(val){
                this.$emit('getimg',val)
            }
        },
        clearAllFlag:{
            handler(val){
                this.clearAll()
                
            }
        },
    }
}
</script>
<style scoped>


#colorlabel{
    font-weight: 450;
    width: 80px;
    font-size: 12px;
    display: inline-block;
}
.getcolor{
    width: 100px;
    height: 30px;
    padding: 0 8px;
    border-radius: 3px;
    /* border: none; */
    border: 1px solid rgb(51, 51, 51,0.3);
    background: transparent;
    outline: none;
    color: #333;
    margin-right: 20px;
}
.getcolor:last-of-type{
    margin-right: 0;
}
.addcolor{
    margin-bottom: 30px;
}
.showcolorbox{
    /* position: relative; */
    /* height: 50px; */
    /* top:150px; */
    width: 300px;
    float: left;
    margin-top: 20px;
}
#showcolorTitle{
    font-weight: 450;
    width: 80px;
    font-size: 12px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    /* position: absolute;
    top:5px; */
}
.showcolor{
    /* display: inline-block; */
    height: 50px;
    width: 300px;
    /* margin-bottom: 10px; */
    /* margin-top: 20px; */
    /* margin-left: 80px; */
    /* position: relative; */
    /* margin: 0 auto */
}
.showlabel{
    font-size: 12px;
    display: inline-block;
    line-height: 25px;
    vertical-align: top;
    width: 60px;
    /* margin-bottom: 10px; */
}
.colorbox{
    width: 25px;
    height: 25px;
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
}
.btn{
    width: 50px;
    height: 20px;
    font-size: 12px;
    padding: 5px 10px;
    background: rgb(245, 108, 108);
    border-radius:3px; 
    color: #fff;
    cursor: pointer;
    /* float: right; */
}
.confrimbtn{
    background:#67c23a
}
.imgbox{

}
.imgbox img{
    display: inline-block;
    margin: 10px;
    width: 120px;
    height: 120px;
    border: 2px solid #000;
    /* position: absolute;
    bottom: 45px; */
    /* transform: translateY(-185px) */
    /* margin-top: -200px; */
}
.inputTable{
    margin-bottom: 30px;
    text-align: left;
}
.ch{
    margin-top: 30px;
}   
.inputTable>label{
    font-weight: 450;
    width: 80px;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    margin-top: 5px;
}
.inputTable>input{
    width: 400px;
    height: 30px;
    padding: 0 8px;
    border-radius: 3px;
    /* border: none; */
    border: 1px solid rgb(51, 51, 51,0.3);
    background: transparent;
    outline: none;
    color: #333;
}

</style>
