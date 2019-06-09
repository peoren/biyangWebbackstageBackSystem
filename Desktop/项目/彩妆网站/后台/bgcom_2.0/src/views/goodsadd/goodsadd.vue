<template>
    <div class="goodsadd">
        <h3>
            添加商品
        </h3>
        <div class="container clear">
            <div class="inputTable ">
                <label for="goodsname">一级分类：</label>
                <el-select v-model="firstlevel_id" filterable placeholder="请选择">
                    <el-option
                    :disabled="disabled"
                    v-for="(item,index) in firstlevelList"
                    :key="item.firstlevel_id"
                    :label="item.firstlevel_name"
                    :value="item.firstlevel_id">
                    </el-option>
                </el-select>
            </div>
            
            <div class="inputTable ">
                <label for="goodsname">二级分类：</label>
                <el-select v-model="secondlevel_id" filterable placeholder="请选择">
                   
                    <el-option
                    :disabled="disabled"
                    v-for="(item,index) in secondlevelList"
                    :key="item.secondlevel_id"
                    :label="item.secondlevel_name"
                    :value="item.secondlevel_id">
                </el-option>
            </el-select>
            </div>
            <div class="inputTable ">
                <label for="goodsname">商品名称：</label>
                <input type="text" @blur='checkGoodsName' id="goodsname" placeholder="请输入商品名称" v-model="productName">
            </div>
            
            <div class="inputTable ">
                <label for="goodsprice">默认规格</label>
                <input type="text" :disabled="disabled" id="goodsprice" placeholder="请输入默认规格" v-model="productDefFormat" @blur="checkformat">
                <label v-show="formatFlag" style="color:red">规格格式错误</label>
            </div>
            
            <div class="inputTable">
                <label for="goodsdetail">商品详情：</label>
                <textarea
                :disabled="disabled" 
                v-model="productInf"
                    >
                </textarea>
            </div>
            <div class="inputTable">
                <label for="goodsdetail">描述信息：</label>
                <textarea 
                :disabled="disabled"  
                    v-model="productDescription"
                    >
                </textarea>
                
            </div>
            <div class="inputTable">
                <label for="goodsdetail">商品使用方法:</label>
                <textarea
                :disabled="disabled" 
                    v-model="productMethod"
                    >
                </textarea>
                
            </div>
            <div class="inputTable clear">
                <color 
                @getcolordata='getcolordata'
                @getimg='getimg'
                @getpricedata='getpricedata'
                :disabled="disabled"  
                :oldData='oldData'
                :firstlevel_id='firstlevel_id'
                :secondlevel_id='secondlevel_id'
                :clearAllFlag='clearAllFlag'
                />
            </div>
            <el-button type="info" @click="updata"  id="subbtn">提交商品</el-button>
        </div>
    </div>
</template>
<script>
import color from '@/views/goodsadd/color.vue'
export default {
    components:{
        color
    },
    data:function(){
        return {
            colordata:[],
            // 商品的input信息
            colorvalue:'',
            colorname:'',
            productName:'',
            productInf:'',//商品详情
            productMethod:'',//商品使用方法
            productDescription:'',//描述信息
            productDefFormat:'',//默认规格
            productInfBpic:'',//大图片地址
            productInfFpic:'',//规格图地址
            // productInfPrice:'',//默认价格
            // 商品的分类信息
            firstlevel_id:'',//一级类别id
            secondlevel_id:'',//二级类别id
            firstlevelList:[{}],
            secondlevelList:[{}],
            // 图片信息
            img:[],
            // 控制不可选中flag
            disabled:false,
            // 价格信息
            pricedata:[],
            clearAllFlag:true,
            oldData:[],
            // 规格正则验证
            formatFlag:false,
        }
    },
    methods:{
        // 渲染页面
        getdata(){
            let that=this
            this.$http.get("/promanage/addproinfo")
            .then(res => {
                this.firstlevelList=res.data.data.firstlevelList
                this.secondlevelList=res.data.data.secondlevelList
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
                console.log("请求失败");
            });
        },
        // 上传图片
        updata(){

            if(this.oldData.length){
                this.addDetail()
                return
            } 
            this.addNewGoods()
        },
        // 从子组件中取得颜色数据
        getcolordata(data){
            this.colordata=data
        },
        // 从子组件取得图片地址
        getimg(data){
            this.img=data
        },
        // 从子组件取得价格
        getpricedata(data){
            this.pricedata=data
        },
        // 名称判断
        checkGoodsName(){
            let that=this
            let postdata=this.$qs.stringify({
                productName:that.productName
            })
            
            this.$http.post("/promanage/boolproname", postdata)
            .then(res => {
                // 不重复判断
                console.log(res.data.data);
                
                if(res.data.code===0){
                    this.disabled=false
                    return false
                }
                // 重复
                that.productInf=res.data.data[0].product_inf
                that.productMethod=res.data.data[0].product_method
                that.productDescription=res.data.data[0].product_description
                that.productDefFormat=res.data.data[0].product_def_format
                that.firstlevel_id=res.data.data[0].firstlevel_id
                that.secondlevel_id=res.data.data[0].secondlevel_id
                that.oldData=res.data.data
                
                this.disabled=true
            })
            .catch(err => {
            console.log(err);
            
            });
        },
        clearAll(){
            this.colordata=[]
            this.colorvalue=''
            this.colorname=''
            this.productName=''
            this.productInf=''//商品详情
            this.productMethod=''//商品使用方法
            this.productDescription=''//描述信息
            this.productDefFormat=''//默认规格
            this.productInfBpic=''//大图片地址
            this.productInfFpic=''//规格图地址
            this.firstlevel_id=''//一级类别id
            this.secondlevel_id=''//二级类别id
            this.img=[]
            this.disabled=false
            this.pricedata=[]
            // 清除所有信息，该变量是为了通知子组件清除
            this.clearAllFlag=!this.clearAllFlag
            this.oldData=[]
        },
        // 添加新商品
        addNewGoods(){
            // 添加一个商品
            let dataBox=[]
            // 去除掉vue的监控器
            let color=JSON.parse(JSON.stringify(this.colordata))
            let price=JSON.parse(JSON.stringify(this.pricedata))
            let that=this
            // 为空判断
            // if(
            //     !this.firstlevel_id.length 
            //     || !secondlevel_id.length  
            //     || !productName.length  
            //     || !productInf.length  
            //     || !productMethod.length  
            //     || !productDescription.length  
            //     || !productDefFormat.length 
            //     || this.formatFlag
            // )
            //     {
            //         this.$message.error('数据为空或格式错误');
            //         return false
            //     }

            for(let i in color){
                // // 为空判断
                // if( !this.img[i*2].length || !this.img[i*2+1].length 
                // || !color[i].colorvalue.length 
                // || !color[i].colorname.length 
                // || !price[i].length
                // || this.formatFlag
                // )
                // {
                //     this.$message.error('数据为空或格式错误');
                //     return false
                // }
                dataBox[dataBox.length]={
                    productInfBpic:this.img[i*2],
                    productInfFpic:this.img[i*2+1],
                    productInfSpic:color[i].colorvalue,
                    productFormat:color[i].colorname,
                    productInfPrice:price[i]
                }   
            } 
            console.log(dataBox,"databox")

            dataBox=JSON.stringify(dataBox)
            let formData=this.$qs.stringify({
                firstlevelId:this.firstlevel_id,
                secondlevelId:this.secondlevel_id,
                productName:this.productName,
                productInf:this.productInf,
                productMethod:this.productMethod,
                productDescription:this.productDescription,
                productDefFormat:this.productDefFormat, 
                productInfo:dataBox
                
            })
            let demo = {
                firstlevelId:this.firstlevel_id,
                secondlevelId:this.secondlevel_id,
                productName:this.productName,
                productInf:this.productInf,
                productMethod:this.productMethod,
                productDescription:this.productDescription,
                productDefFormat:this.productDefFormat, 
                productInfo:dataBox
            }
            console.log(demo);
            console.log(formData);
            
            this.$http.post("/promanage/addnewpro", formData)
            .then(res => {
                
                that.clearAll()
                that.$message.success('添加成功');
            })
            .catch(err => {
            console.log(err);
            that.$message.error('添加失败！');
            });
        },
        // 添加商品详情
        addDetail(){
             // 添加商品详情
            let dataBox=[]
            // 去除掉vue的监控器
            let color=JSON.parse(JSON.stringify(this.colordata))
            let price=JSON.parse(JSON.stringify(this.pricedata))
            let that=this
            for(let i in color){
                if( !this.img[i*2].length 
                || !this.img[i*2+1].length 
                || !color[i].colorvalue.length 
                || !color[i].colorname.length 
                || !price[i].length
                
                )
                {
                    this.$message.error('数据为空');
                    return false
                }
                dataBox[dataBox.length]={  
                    productInfBpic:this.img[i*2],
                    productInfFpic:this.img[i*2+1],
                    productInfSpic:color[i].colorvalue,
                    productFormat:color[i].colorname,
                    productInfPrice:price[i]
                }   
            }
            
            dataBox=JSON.stringify(dataBox)
            let formData=this.$qs.stringify({
                productId:that.oldData[0].product_id,
                productInfo:dataBox
            })
            this.$http.post("/promanage/addproinfo", formData)
            .then(res => {
                that.clearAll()
                that.$message.success('添加成功');
            })
            .catch(err => {
                that.$message.error('添加失败！');
            console.log(err);
            
            });
        },
        checkformat(){
            const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
            let productDefFormat=this.productDefFormat
            if(!reg.test(productDefFormat)){
                this.formatFlag=true
            }else{
                 this.formatFlag=false
            }
        }
    },
    created(){
       this.getdata() 
    }
}
</script>
<style scoped>
h3{
    margin: 0px 10px 20px;
    text-align: left;
    font-weight: 500;
    font-size: 16px;
}
.container{
    background-color: rgb(255, 255, 255);
    padding: 40px;
    margin-bottom: 20px;
}
.inputTable{
    margin-bottom: 30px;
    text-align: left;
}
label{
    font-weight: 450;
    width: 80px;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    margin-top: 5px;
}
input{
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
textarea{
    display: inline-block;
    max-height: 200px;
    height: 50px;
    width: 400px;
    border-radius: 3px;
    border: 1px solid rgb(51, 51, 51,0.3);
    padding: 0 8px;
}
.el-select{
    /* float: left; */
    display: inline-block;
    width: 250px;
}
#subbtn{
    float: left;
    /* margin-top: 120px */
}
</style>
