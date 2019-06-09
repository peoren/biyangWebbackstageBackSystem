<template>
  <div class="goodsmagement">
    <div class="title">商品管理</div>
    <div class="gheader">
      <div class="select1">
        <div class="sone">
          <span>一级分类:</span>
          <el-select v-model="value1" placeholder="请选择" @change="getFl" class="sinput">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value1"
              style="height:30px;"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="select2">
        <div class="sone">
          <span>二级分类:</span>
          <el-select v-model="value2" placeholder="请选择" @change="getSl" class="sinput">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value2"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="select2">
        <div class="sone">
          <span>产品名称:</span>
          <el-select v-model="value3" placeholder="请选择" @change="getName" class="sinput">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value3"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="gbody">
      <el-main>
        <el-table :data="newdata" style="width: 100%;text-align: center;">
          <el-table-column prop="productName" label="产品名称"></el-table-column>

          <el-table-column prop="productInfPrice" label="商品价格(¥)"></el-table-column>

          <el-table-column prop="productFormat" label="产品规格"></el-table-column>

          <el-table-column label="上/下架" width="170px">
            <el-switch
              v-model="scope.row.productState"
              active-text="上架"
              inactive-text="下架"
              slot-scope="scope"
              @change="changeState(scope.row)"
            ></el-switch>
          </el-table-column>
          <el-table-column prop="stockNum" label="库存" width="100px"></el-table-column>
          <el-table-column label="进/出货" >
           <div slot-scope="scope">
            <el-button type="text" @click="openin(scope.row)">入库</el-button>
            <el-button type="text" @click="openout(scope.row)">出库</el-button>
           </div>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <div class="cando" slot-scope="scope">
              <button class="next-btn-detail" @click="view(scope.row)">编辑</button>
              <!-- <button class="next-btn-primary">编辑</button> -->
              <el-button type="text" class="next-btn-normal" @click="opendel(scope.row)">删除</el-button>
              <!-- <button 
              @click="del(scope.row)"></button>-->
            </div>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="55%"
      :before-close="handleClose"
      v-if="goods!=null"
    >
      <div class="content">
        <form action="#" enctype="multipart/form-data" ref="form" class="clear">
          <div class="phead">
            <h2>产品信息：</h2>
            <div class="pheadone">
              <span>产品名称：</span>
              <input type="text" v-model="goods.productName" class="pheadonesone">
            </div>
            <div class="classifiy">
              <span>所属一级分类：</span>
              <span class="cone">{{getfn(goods.firstlevelId)}}</span>
              <span>所属二级分类：</span>
              <span class="cone">{{goods.secondlevelName}}</span>
            </div>
            <div class="classifiy">
              <span>当前规格：</span>
              <span class="color-bg" :style="'background-color:'+ goods.productInfSpic"></span>
              <span class="cone">{{goods.productFormat}}</span>
            </div>
            <div>
              <span>当前售价(¥)：</span>
              <input type="text" class="input" v-model="goods.productInfPrice">
            </div>
            <p>产品描述：</p>

            <textarea v-model="goods.productInf"></textarea>

            <p>产品使用：</p>
            <textarea v-model="goods.productMethod"></textarea>
          </div>

            <div class="pic clear">
              <div>
                <span class="text">商品主图:</span>
                <img :src="goods.productInfBpic" alt>
              </div>

              <span v-show="pic1!=null">更换为：</span>
              <div class="pic-wrap" v-show="pic1!=null">
                <img :src="pic1" alt>
                <span class="close">
                  <a href="#" @click.prevent="closePic1">取消</a>
                </span>
              </div>
              <input type="file" style="display:none;" ref="file1" @change="picChange1">
              <el-button type="warning" class="btn1" sixe="mini" @click="selectPicOne">更换商品图片</el-button>
            </div>

            <div class="pic clear">
              <span class="text">规格详情图：</span>
              <img :src="goods.productInfFpic" alt>

              <span v-show="pic2!=null">更换为：</span>
              <div class="pic-wrap" v-show="pic2!=null">
                <img :src="pic2" alt>
                <span class="close">
                  <a href="#" @click.prevent="closePic2">取消</a>
                </span>
              </div>
              <input type="file" style="display:none;" ref="file2" @change="picChange2">
              <el-button type="warning" class="btn1" sixe="mini" @click="selectPicTwo">更换商品图片</el-button>
            </div>
            <div>
              <span>商品上架时间：</span>
              <span class="time">{{goods.productInfStarttime}}</span>
            </div>
            <div>
              <span>商品状态：</span>
              <span v-if="goods.productState">上架中</span>
              <span v-else>已下架</span>
            </div>
            <div v-if="goods.productState == false">
              <span>商品下架时间：</span>
              <span class="time">{{goods.productInfEndtime}}</span>
            </div>
          
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="changgoods">保存更改</el-button>
        <el-button type="primary" @click="closeModel">退出</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,  prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datasave: null,
      sendway: null,
      lastdata: null,
      visible4: false,
      visible5: false,
      chooseone: null,
      goods: null,
      goodsPic: null,
      sizePic: null,
      newbpic:null,
      newfpic:null,
      pic1: null,
      pic2: null,
      pic: require("@/assets/1.jpg"),
      value3: "北京烤鸭",
      dialogVisible: false,
      currentPage: 1,
      input: "",
      newdata: [],
      olddata: [],
      isCollapse: true,
      openFlag: true,
      // 分页数据
      total: 200, //总条数数
      pageSize: 6, //每页条数
      value1: [],
      options1: [
        {
          value1: 1,
          label: "唇部彩妆"
        },
        {
          value1: 2,
          label: "光耀底妆"
        },
        {
          value1: 3,
          label: "面部彩妆"
        },
        {
          value1: 4,
          label: "眼部彩妆"
        },
        {
          value1: 5,
          label: "产品功效"
        },
        {
          value1: 6,
          label: "护理类型"
        },
        {
          value1: 7,
          label: "化妆工具"
        }
      ],
      value2: "",
      options2: [],
      options2a: [],
      value3: "",
      options3: [],
      copydata: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    changgoods(){
      var _this = this;
      _this.closeModel();
      if(this.newfpic != null) {
        this.goods.productInfFpic = this.newfpic;
      }
      if(this.newbpic != null){
        this.goods.productInfBpic = this.newbpic;
      }
      _this.$http
      .get("/promanage/productConfirm?firstlevelId=" + this.goods.firstlevelId +
           "&secondlevelId=" + this.goods.secondlevelId +
           "&productName=" + this.goods.productName +
           "&productInf=" + this.goods.productInf +
           "&productMethod=" + this.goods.productMethod + 
           "&productDescription=" + this.goods.productDescription +
           "&productInfPrice=" + this.goods.productInfPrice + 
           "&productInfSpic=" + this.goods.productInfSpic +
           "&productInfBpic=" + this.goods.productInfBpic + 
           "&productFormat=" + this.goods.productFormat +
           "&productInfFpic=" + this.goods.productInfFpic +
           "&secondlevelId=" + this.goods.secondlevelId +
           "&productInfId=" + this.goods.productInfId )
      .then(res => {
        console.log(res);
         // 当前页发请求
        _this.$http.get(this.sendway + val).then(res => {
        console.log(res);
        console.log(this.sendway + val);
        var data = res.data.data.product;
        _this.change(data);
      });
      })
      .catch(err => {
        console.log(err)
      })
    },
    getfn(id){
      for(var i=0;i < this.options1.length;i++){
        if(id == this.options1[i].value1){
          return this.options1[i].label
        }
      }
    },
    getsn(id){
      for(var i=0;i<this.options2.length;i++){
        if(id == this.options2[i].value2){
          return this.options2[i].label;
        }
      }
    },
    opendel(val) {
      var _this = this;
      var proInfId = val.productInfId;
      var secondlevelId = val.secondlevelId;
      console.log(this.currentPage, proInfId, secondlevelId);
      _this
        .$confirm("此操作将永久删除该商品,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$http
            .get(
              "/promanage/productDel?proInfId=" +
                proInfId
            )
            .then(res => {
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
                this.handleCurrentChange(this.currentPage)
            })
            .catch(err => {
              _this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        });
    },
    openin(val) {
      var _this = this;
      console.log(val)
      this.$prompt("请输入入库数量（支/套）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
        inputErrorMessage: "请输入正确的数字"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "入库数量: " + value
          })
          value = parseInt(value);
          _this.stock(val.productInfId,value + val.stockNum,_this)
        })
          .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    stock(id,num,_this){
      console.log(id,num,_this)
        _this.$http
          .get("/promanage/modifystock?proInfId=" + id + "&proNum=" + num)
          .then(res => {
            console.log(res);
             _this.handleCurrentChange(this.currentPage)
          })
          .catch(err => {
            console.log(err)
          })
    },
    openout(val) {
      var _this = this;
      this.$prompt("请出库数量（支/套）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
        inputErrorMessage: "请输入正确的数字"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "出库数量: " + value
          })
           value = parseInt(value);
           console.log(val.productInfId, val.stockNum - value)
          _this.stock(val.productInfId, val.stockNum - value ,_this)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    getFl() {
      this.value3 = null;
      this.value2 = null;
      var fl = this.value1;
      this.options2 = [];
      this.sendway =
        "/promanage/productgetfirst?limit=" +
        this.pageSize +
        "&firstlevelId=" +
        fl +
        "currentPage=";
      this.$http
        .get(
          "/promanage/productgetfirst?limit=" +
            this.pageSize +
            "&firstlevelId=" +
            fl +
            "&currentPage=" +
            this.currentPage
        )
        .then(res => {
          console.log(res);
          var data = res.data.data.product;
          this.total = res.data.data.pageNum * this.pageSize;
          if (data.length > 0) {
            this.change(data);
          }else {
            this.newdata = [];
          }

          var sencd = res.data.data.secondLevelName;
          for (var i = 0; i < sencd.length; i++) {
            this.options2.push({
              value2: sencd[i].secondlevel_id,
              label: sencd[i].secondlevel_name
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSl() {
      this.value3 = null;
      var sec = this.value2;
      this.sendway =
        "/promanage/getproductsecond?" +
        "&secondlevelId=" +
        sec +
        "currentPage=";

      this.$http
        .get(
          "/promanage/getproductsecond?currentPage=" +
            this.currentPage +
            "&secondlevelId=" +
            sec
        )
        .then(res => {
          console.log(res);
          var data = res.data.data.product;
          if (data.length > 0) {
            this.change(data);
          }else {
             this.newdata = []
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getName() {
      console.log(this.value3);
      this.newdata = [];
      for (var i = 0; i < this.datasave.length; i++) {
        if (this.datasave[i].productId == this.value3) {
          this.newdata.push(this.datasave[i]);
        }
      }
    },
    open(product_state, productInfId) {
      let _this = this;
      if (!product_state) {
        this.$confirm("是否将该商品上架, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          product_state = true;
          this.$http
            .get("/promanage/upanddown?state=1&proInfId=" + productInfId)
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "上架成功!"
              });
                _this.handleCurrentChange(this.currentPage)
            })
            .catch(err => {
              _this.$message({
                type: "info",
                message: "已取消上架"
              });
            });
        });
      } else {
        this.$confirm("是否将该商品下架, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          product_state = true;
          this.$http
            .get("/promanage/upanddown?state=0&proInfId=" + productInfId)
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "下架成功!"
              });
                  this.handleCurrentChange(this.currentPage)
            })
            .catch(err => {
              _this.$message({
                type: "info",
                message: "已取消下架"
              });
            });
        });
      }
    },
    // 上下架更改
    changeState(ele) {
      ele.productState = !ele.productState;
      this.open(ele.productState, ele.productInfId);
    },
    // 编辑单个商品
    view(val) {
      console.log(val);
      this.dialogVisible = true;
      this.goods = val;
    },
    // 选择规格
    selectChange(goodsid, e) {
      console.log(goodsid, e.target.value);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      // 当前页发请求
      this.$http.get(this.sendway + val).then(res => {
        console.log(res);
        console.log(this.sendway + val);
        var data = res.data.data.product;
        this.change(data);
      });
    },

    //模态框关闭
    closeModel() {
      this.dialogVisible = false;
      this.pic1 = null;
      this.pic2 = null;
    },
    //模态框里的确认/取消按钮
    handleClose(done) {
      // this.dialogVisible = false;
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //点击更换商品图片
    selectPicOne() {
      this.$refs.file1.click();
    },
    selectPicTwo() {
      this.$refs.file2.click();
    },
    picChange1() {
      this.goodsPic = arguments[0].target.files[0];
      this.pic1 = window.URL.createObjectURL(this.goodsPic);
       this.upData(0);
    },
    picChange2() {
      this.sizePic = arguments[0].target.files[0];
      this.pic2 = window.URL.createObjectURL(this.sizePic);
      this.upData(1);
    },
    //预览图片上的取消按钮
    closePic1() {
      this.pic1 = null;
      this.newbpic = null;
      this.$refs.file1.value = "";
      // this.upData(0)
    },
    closePic2() {
      this.newfpic = null;
      this.pic2 = null;
      this.$refs.file2.value = "";
      // this.upData(1)
    },
    //转化数据
    change(data) {
      this.olddata = data;
      var aforFa = new Array();
      for (var i = 0; i < this.olddata.length; i++) {
        var afortrun = new Array();
        let _this = this;
        this.olddata[i].productInfos.forEach(function(item) {
          if (item.productState == 1) {
            item.productState = true;
          } else {
            item.productState = false;
          }
          afortrun.push({
            secondlevelEname: _this.olddata[i].secondLevel.secondlevelEname,
            secondlevelName: _this.olddata[i].secondLevel.secondlevelName,
            firstlevelId: _this.olddata[i].firstlevelId,
            productInf: _this.olddata[i].productInf,
            productMethod: _this.olddata[i].productMethod,
            productName: _this.olddata[i].productName,
            secondlevelId: _this.olddata[i].secondlevelId,
            productFormat: item.productFormat,
            productId: item.productId,
            productInfBpic: item.productInfBpic,
            productInfFpic:item.productInfFpic,
            productInfEndtime: item.productInfEndtime,
            productInfId: item.productInfId,
            productInfPrice: item.productInfPrice,
            productInfSpic: item.productInfSpic,
            productInfStarttime: item.productInfStarttime,
            productState: item.productState,
            productInfId: item.stock.productInfId,
            stockId: item.stock.stockId,
            stockNum: item.stock.stockNum
          });
        });
        aforFa.push(afortrun);

        var lastfa = new Array();
        for (var m = 0; m < aforFa.length; m++) {
          for (var n = 0; n < aforFa[m].length; n++) {
            lastfa.push(aforFa[m][n]);
          }
        }
      }
      this.options3 = [];
      for (var i = 0; i < this.olddata.length; i++) {
        this.options3.push({
          value3: this.olddata[i].productId,
          label: this.olddata[i].productName
        });
      }
      this.newdata = lastfa;
      this.datasave = lastfa;
    },
    //获取数据
    upData(num) {
      console.log(num)
      var _that = this;
      var formData = new FormData(_that.$refs.form);
      formData.append("file", _that.goodsPic);
      this.$http
        .post("/upload", formData)
        .then(res => {
          console.log(res)
          if(num == 0 ){
            _that.newbpic = res.data.data;
          }else if(num == 1){
            _that.newfpic = res.data.data;
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取数据
    getData() {
      this.sendway = "/promanage/showpro?limit=6&currentPage=";
      this.$http
        .get("/promanage/showpro?limit=6")
        .then(res => {
          console.log(res);
          var pageNum = res.data.data.pageNum;
          this.total = pageNum * this.pageSize;
          var data = res.data.data.product;
          this.change(data);
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
        });
    }
  }
};
</script>

<style scoped>
.text {
  display: inline-block;
  width: 85px;
}
.selects > select {
  width: 70px;
  height: 30px;
  outline: none;
}
.goodsmagement {
  background: #f5f5f5;
}
.title {
  height: 32px;
  padding: 20px 30px;
}
.gheader {
  padding: 20px;
  margin: 0 20px;
  background: #fff;
  border-radius: 6px;
}
.select1,
.select2,
.search {
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 25%;
  width: 25%;
  max-width: 25%;
}
.gheader {
  overflow: hidden;
}
.sone {
  display: flex;
  align-items: center;
  margin: 10px 0px;
}
.search > span,
.sone > span {
  width: 80px;
  height: 15px;
  font-size: 12px;
}

.gbody {
  margin: 20px;
  border-radius: 6px;
  background: #ffffff;
}
.cando > button {
  margin-right: 5px;
  color: #fff;
  border-radius: 3px;
  padding: 0 12px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  border-width: 1px;
}
.cando > .next-btn-normal {
  color: #ff3000;
  border-color: #ff3000;
}
.cando > .next-btn-detail {
  background-color: rgb(179, 192, 209);
  color: #fff;
  border-color: #afaeae;
}
.cando > button {
  outline: none;
}
.cando > button:hover {
  cursor: pointer;
}
.block {
  text-align: center;
}
.pic > * {
  float: left;
}
.pic img {
  margin-left: 5px;
}
.pic-wrap {
  float: left;
  position: relative;
}
.close {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0000008f;
  z-index: 2;
  font-size: 23px;
  text-align: center;
  display: none;
}
.close a {
  position: absolute;
  left: 40%;
  top: 40%;
  color: red;
}
.pic-wrap:hover .close {
  display: block;
}
.pic-wrap img {
  vertical-align: middle;
}
.time {
  font-size: 12px;
}
.clear::before,
.clear::after {
  display: table;
  content: "";
}
.clear::after {
  clear: both;
}
.pic img {
  width: 150px;
  height: auto;
  vertical-align: top;
}
.pic > * {
  float: left;
  /* margin-left: 10px; */
}
form > div {
  margin-bottom: 10px;
  height: auto;
}
.input {
  width: 100px;
  height: 32px;
  border-radius: 4px;
  border: none;
  outline: none;
  margin: 0 5px;
  border: 1px solid rgb(172, 169, 169);
}
.classifiy > * {
  display: inline-block;
  margin: 10px 10px 10px 0;
}

.classifiy select {
  background: #fff;
}
.color-bg {
  width: 16px;
  height: 16px;
  background: #ff3000;
  vertical-align: middle;
}
.color-switch {
  width: 100px;
  height: 32px;
  padding: 0;
  border: 0;
  background: #fff;
  border-radius: 4px;
  text-indent: 0.7em;
}
.content {
  background: #f5f5f5;
  padding:20px;
  height: auto;
  text-align: left;
}
.content h2{
  margin-left: 40px;
  margin-bottom: 30px;
}
.content textarea {
  width: 70%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 100px;
  height: auto;
  padding: 5px;
}
.phead>*{
  margin: 10px;
  
}
.pfoot>div{
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.pheadone{
  font-size: 14px; 
}
.pheadonesone{
  font-size: 16px;
  height: 30px;
  width: 200px;   
  text-align: center;
  outline: none;
}
.cone{
  width: 120px;
  height: 30px;
  line-height: 30px;
  background: #fff;
  text-align: center;
}
.input{
  width: 100px;
  height: 30px;
  text-align: center;
}
</style>
