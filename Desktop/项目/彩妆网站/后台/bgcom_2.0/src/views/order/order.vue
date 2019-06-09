<template>
    <div class="clear">
        <p class="p1">订单管理</p>
        <div class="sear">
            <div class="inpt1">
                <span>订单类型：</span>
                <el-select ref='se1' @change='search1($event)' class="set" v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="inpt2">
                <span>订单编号：</span>
                <el-input @keydown.enter.native="search2" class="inp" v-model="input" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="sub">
            <el-button class="btn" type="primary" @click='search2'>搜索</el-button>
            <el-button @click='reset' class="btn rese" type="danger">重置</el-button>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                    prop="name"
                    label="收货人"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="statu"
                    label="订单状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="订单金额"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="订单号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="下单时间"
                    width="180">
                </el-table-column>
                
                <el-table-column
                    prop="address"
                    label="收货地址"
                    width="220">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" class="a0">
                         <el-button
                         class="a1"
                        size="mini"
                        @click="tomore(scope)">查看详情</el-button>
                        <el-button
                        v-if='scope.row.statu == "退款中"'
                        class="a2"
                        size="mini"
                        type="danger"
                        @click="tk(scope.row.orderId,scope.row.userId)">立即退款</el-button>
                        <el-button
                        v-if='scope.row.statu == "退货中"'
                        class="a2"
                        size="mini"
                        type="danger"
                        @click="th(scope.row.orderId,scope.row.userId)">立即退货</el-button>
                    </template>
                </el-table-column>
            </el-table>
                
        </div>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="pages*10">
            </el-pagination>
        </div>
        <el-dialog
            title="订单详情"
            :visible.sync="dialogVisible"
            width="700px">
            <div>
                <span class="detail">单品种类：{{moremsg.length}}</span>
                <span class="detail">开具发票：{{moreone.order_paper}}</span>
                <span class="detail">总共金额：￥{{moreone.order_integral}}</span>
                <span class="detail">结算金额：￥{{moreone.order_money}}</span>
                <span class="detail">使用积分：{{moreone.order_usein}}</span>
                <span class="detail">订单状态：{{moreone.order_state}}</span>
                <span class="detail">下单时间：{{moreone.order_detime}}</span>
                <span class="detail">支付时间：{{moreone.order_paytime}}</span>
                <span class="detail full">订单编号：{{moreone.order_num}}</span>
            </div>
            <div class="goods full clear" v-for="(more,index) in moremsg" :key="index">
                <span class="full head">单品{{index+1}}</span>
                <img class="detailImg" :src="more.product_def_pic" alt="">
                <span class="detail">商品名字：{{more.product_name}}</span>
                <span class="detail">商品规格：{{more.product_format}}</span>
                <span class="detail">商品单价：￥{{more.product_inf_price}}</span>
                <span class="detail">商品数量：{{more.order_inf_num}}</span>
                <span class="detail">商品状态：{{more.order_inf_state}}
                    <span @click='tk2(more.order_id,more.order_inf_id,more.user_id)' v-if='more.order_inf_state=="退款中"' class="tt">立即退款</span>
                    <span @click='th2(more.order_id,more.order_inf_id,more.user_id)' v-if='more.order_inf_state=="退货中"' class="tt">立即退货</span>
                </span>
                <span v-if='more.order_inf_state=="退款中"' class="detail">退款理由：{{why}}</span>
                <span v-if='more.order_inf_state=="退货中"' class="detail">退货理由：{{why}}</span>
                <span class="detail">商品详情：{{more.product_inf}}</span>
                <span class="detail">商品描述：{{more.product_description}}</span>
                <span class="detail">使用方法：{{more.product_method}}</span>
                <span class="detail">上架时间：{{more.product_inf_starttime}}</span>
                <span class="detail">下架时间：{{more.product_inf_endtime}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { constants } from 'crypto';
export default {
    data() {
        return {
            currentPage3: 1, //当前页
            options: [{
                value: '7',
                label: '退款中'
            }, {
                value: '6',
                label: '退货中'
            }, {
                value: '8',
                label: '退款退货完成'
            }, {
                value: '5',
                label: '发货中'
            }, {
                value: '3',
                label: '交易完成'
            }],
            value: '--', // 类型值
            input: '', // 输入框值
            tableData: [], // 表格数据
            pages:'',  // 页码
            dialogVisible: false, //模态框
            moremsg:[],
            statu:'', //订单详情
            url:'',
            paper:'',
            moreone:{},
            why:[],
        }
    },
    methods: {
        // 查看详情
        tomore(scope) {
            // if(scope.row.orderId == undefined) {
            //     return
            // }
            this.dialogVisible = true
            console.log(scope.row.orderId)
            this.$http.get('/orders/selectorderinf?orderId=' + scope.row.orderId)
            .then(res => {
                // // 判断查询出错
                // if(res.data.data.length == 0) {
                //     this.tomore()
                // }
                // 详情信息
                this.moremsg = res.data.data
                // console.log(res)
                // console.log(this.moremsg)
                // 订单状态
                for(let i = 0; i < this.moremsg.length; i++) {
                    if(this.moremsg[i].order_state == 6) {
                        this.moremsg[i].order_state = '退货中'
                    }
                    if(this.moremsg[i].order_state == 7) {
                        this.moremsg[i].order_state = '退款中'
                    }
                    if(this.moremsg[i].order_state == 8) {
                        this.moremsg[i].order_state = '退款退货完成'
                    }
                    if(this.moremsg[i].order_state == 5) {
                        this.moremsg[i].order_state = '发货中'
                    }
                    if(this.moremsg[i].order_state == 3) {
                        this.moremsg[i].order_state = '交易完成'
                    }

                    if(this.moremsg[i].order_inf_state == 4) {
                        this.moremsg[i].order_inf_state = '退货中'
                        this.$http.get('/orders/lookreseason?orderId='+this.moremsg[i].order_id + '&orderInfId=' + this.moremsg[i].order_inf_id)
                        .then(res => {
                            this.why = []
                            for(let i = 0; i < res.data.data.length;i++) {
                                this.why.push(res.data.data[i].refundReason)
                            }
                            this.why = this.why.join(',')
                        })
                    }
                    if(this.moremsg[i].order_inf_state == 5) {
                        this.moremsg[i].order_inf_state = '退款中'
                        this.$http.get('/orders/lookreseason?orderId='+this.moremsg[i].order_id + '&orderInfId=' + this.moremsg[i].order_inf_id)
                        .then(res => {
                            this.why = []
                            for(let i = 0; i < res.data.data.length;i++) {
                                this.why.push(res.data.data[i].refundReason)
                            }
                            this.why = this.why.join(',')
                        })
                    }
                    if(this.moremsg[i].order_inf_state == 6) {
                        this.moremsg[i].order_inf_state = '退款退货完成'
                    }
                    if(this.moremsg[i].order_inf_state == 3) {
                        this.moremsg[i].order_inf_state = '发货中'
                    }
                    if(this.moremsg[i].order_inf_state == 2) {
                        this.moremsg[i].order_inf_state = '交易完成'
                    }
                    if(this.moremsg[i].order_inf_state == 1) {
                        this.moremsg[i].order_inf_state = '商品取消'
                    }
                    // 是否发票
                    if(this.moremsg[i].order_paper == 1) {
                        this.moremsg[i].order_paper = '是'
                    }
                    if(this.moremsg[i].order_paper == 0) {
                        this.moremsg[i].order_paper = '否'
                    }
                    if(!this.moremsg[i].order_inf_num) {
                        this.moremsg[i].order_inf_num = 1
                    }

                }
                
                // 第一条
                this.moreone = this.moremsg[0] 
                console.log(res)
            })
        },
        // 提示框
        open2() {
            this.$message({
            message: '操作成功！',
            type: 'success'
            });
        },
        // 退款
        tk(orderId,userId) {
            let postData = this.$qs.stringify({
                orderId:orderId,
                userId:userId
            })
            this.$http.post('/orders/confirmrefund',postData)
            .then(res => {
                console.log(res)
            })
            .catch(res => {
                console.log('err')
            })
        },
        // 退货
        th(orderId,userId) {
            let postData = this.$qs.stringify({
                orderId:orderId,
                userId:userId
            })
            this.$http.post('/orders/confirmregood',postData)
            .then(res => {
                // console.log(res)
            })
            .catch(res => {
                console.log('err')
            })
        },
        // 退款2
            tk2(orderId,orderInfId,userId) {
            let postData = this.$qs.stringify({
                orderId:orderId,
                orderInfId:orderInfId,
                userId:userId
            })
            this.$http.post('/orders/confirmrefund',postData)
            .then(res => {
                this.open2()
            })
            .catch(res => {
                console.log('err')
            })
        },
        // 退货2
        th2(orderId,orderInfId,userId) {
            let postData = this.$qs.stringify({
                orderId:orderId,
                orderInfId:orderInfId,
                userId:userId
            })
            this.$http.post('/orders/confirmregood',postData)
            .then(res => {
                this.open2()
            })
            .catch(res => {
                console.log('err')
            })
        },
        // 重置
        reset() {
            this.tableData = []
            this.currentPage3 = 1
            this.input = ''
            this.value = '--'
            this.$http.get('/orders/selectallorder')
            .then(res => {
            this.pages = res.data.data.pages
                let msgs = res.data.data.pageInfo
                for(let i = 0;i < msgs.length;i++) {
                    var status = '';
                    if(msgs[i].orderState == 6) {
                        status = '退货中'
                    }
                    if(msgs[i].orderState == 7) {
                        status = '退款中'
                    }
                    if(msgs[i].orderState == 8) {
                        status = '退款退货完成'
                    }
                    if(msgs[i].orderState == 5) {
                        status = '发货中'
                    }
                    if(msgs[i].orderState == 3) {
                        status = '交易完成'
                    }
                    this.tableData.push({
                        userId:msgs[i].userId,
                        orderId:msgs[i].orderId,
                        date:msgs[i].orderPaytime,
                        name:msgs[i].addressName,
                        address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                        statu:status,
                        money: '￥ ' + msgs[i].orderMoney,
                        number: msgs[i].orderNum    
                    })
                }

            })
            .catch(err => {
                console.log(err,'错误')
            })
        },
        // 订单编号查询
        search2() {
            this.value = '--'
            this.tableData = []
            this.currentPage3 = 1
            if(this.input == '') {
                    this.$http.get('/orders/selectallorder')
                    .then(res => {
            this.pages = res.data.data.pages
                    let msgs = res.data.data.pageInfo
                    for(let i = 0;i < msgs.length;i++) {
                        var status = '';
                        if(msgs[i].orderState == 6) {
                            status = '退货中'
                        }
                        if(msgs[i].orderState == 7) {
                            status = '退款中'
                        }
                        if(msgs[i].orderState == 8) {
                            status = '退款退货完成'
                        }
                        if(msgs[i].orderState == 5) {
                            status = '发货中'
                        }
                        if(msgs[i].orderState == 3) {
                            status = '交易完成'
                        }
                        this.tableData.push({
                            userId:msgs[i].userId,
                            orderId:msgs[i].orderId,
                            date:msgs[i].orderPaytime,
                            name:msgs[i].addressName,
                            address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                            statu:status,
                            money: '￥ ' + msgs[i].orderMoney,
                            number: msgs[i].orderNum    
                        })
                    }

                })
                .catch(err => {
                    console.log(err,'错误')
                })
                return
            }

            this.$http.get('/orders/sobyordernum?orderNum=' + this.input)
            .then(res => {
            this.pages = 1
                console.log(res)
                this.tableData = []
                let msgs = res.data.data
                for(let i = 0;i < msgs.length;i++) {
                    var status = '';
                    if(msgs[i].orderState == 6) {
                        status = '退货中'
                    }
                    if(msgs[i].orderState == 7) {
                        status = '退款中'
                    }
                    if(msgs[i].orderState == 8) {
                        status = '退款退货完成'
                    }
                    if(msgs[i].orderState == 5) {
                        status = '发货中'
                    }
                    if(msgs[i].orderState == 3) {
                        status = '交易完成'
                    }
                    this.tableData.push({
                        userId:msgs[i].userId,
                        orderId:msgs[i].orderId,
                        date:msgs[i].orderPaytime,
                        name:msgs[i].addressName,
                        address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                        statu:status,
                        money: '￥ ' + msgs[i].orderMoney,
                        number: msgs[i].orderNum    
                    })
                }
            })
            .catch(err => {
                console.log(err,'err')
            })
        },
        // 订单类型查询
        search1(e) {
            // console.log(e)
            this.input = ''
            this.currentPage3 = 1
            this.$http.get('/orders/sobyorderstate?orderState1=' + e)
            .then(res => {
            this.pages = res.data.data.pages
                this.tableData = []
                let msgs = res.data.data.pageInfo
                for(let i = 0;i < msgs.length;i++) {
                    var status = '';
                    if(msgs[i].orderState == 6) {
                        status = '退货中'
                    }
                    if(msgs[i].orderState == 7) {
                        status = '退款中'
                    }
                    if(msgs[i].orderState == 8) {
                        status = '退款退货完成'
                    }
                    if(msgs[i].orderState == 5) {
                        status = '发货中'
                    }
                    if(msgs[i].orderState == 3) {
                        status = '交易完成'
                    }
                    this.tableData.push({
                        userId:msgs[i].userId,
                        orderId:msgs[i].orderId,
                        date:msgs[i].orderPaytime,
                        name:msgs[i].addressName,
                        address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                        statu:status,
                        money: '￥ ' + msgs[i].orderMoney,
                        number: msgs[i].orderNum    
                    })
                }
            })
            .catch(err => {
                console.log(err,'err')
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
      },
    //   分页
      handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            // console.log(this.value)
            if(this.value != '--') {
                this.$http.get('/orders/sobyorderstate?orderState1=' + this.value + '&pageNum=' + val)
                .then(res => {
                this.pages = res.data.data.pages
                    this.tableData = []
                    let msgs = res.data.data.pageInfo
                    for(let i = 0;i < msgs.length;i++) {
                        var status = '';
                        if(msgs[i].orderState == 6) {
                            status = '退货中'
                        }
                        if(msgs[i].orderState == 7) {
                            status = '退款中'
                        }
                        if(msgs[i].orderState == 8) {
                            status = '退款退货完成'
                        }
                        if(msgs[i].orderState == 5) {
                            status = '发货中'
                        }
                        if(msgs[i].orderState == 3) {
                            status = '交易完成'
                        }
                        this.tableData.push({
                            userId:msgs[i].userId,
                            orderId:msgs[i].orderId,
                            date:msgs[i].orderPaytime,
                            name:msgs[i].addressName,
                            address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                            statu:status,
                            money: '￥ ' + msgs[i].orderMoney,
                            number: msgs[i].orderNum    
                        })
                    }
                })
                .catch(err => {
                    console.log(err,'err')
                })
            } else if(this.input != '') {
                this.currentPage3 = 1
            }
            else {
                    this.tableData = []
                    this.$http.get('/orders/selectallorder?pageNum=' + val)
                    .then(res => {
                    this.pages = res.data.data.pages
                    console.log(this.pages)
                    let msgs = res.data.data.pageInfo
                    for(let i = 0;i < msgs.length;i++) {
                        var status = '';
                        if(msgs[i].orderState == 6) {
                            status = '退货中'
                        }
                        if(msgs[i].orderState == 7) {
                            status = '退款中'
                        }
                        if(msgs[i].orderState == 8) {
                            status = '退款退货完成'
                        }
                        if(msgs[i].orderState == 5) {
                            status = '发货中'
                        }
                        if(msgs[i].orderState == 3) {
                            status = '交易完成'
                        }
                        this.tableData.push({
                            userId:msgs[i].userId,
                            orderId:msgs[i].orderId,
                            date:msgs[i].orderPaytime,
                            name:msgs[i].addressName,
                            address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                            statu:status,
                            money: '￥ ' + msgs[i].orderMoney,
                            number: msgs[i].orderNum    
                        })
                    }

                })
                .catch(err => {
                    console.log(err,'错误')
                })
            }
      }
    },
    created() {
        this.tableData = []
        this.currentPage3 = 1
        this.$http.get('/orders/selectallorder')
        .then(res => {
            this.pages = res.data.data.pages
            // console.log(res.data.data)
            let msgs = res.data.data.pageInfo
            for(let i = 0;i < msgs.length;i++) {
                var status = '';
                if(msgs[i].orderState == 6) {
                    status = '退货中'
                }
                if(msgs[i].orderState == 7) {
                    status = '退款中'
                }
                if(msgs[i].orderState == 8) {
                    status = '退款退货完成'
                }
                if(msgs[i].orderState == 5) {
                    status = '发货中'
                }
                if(msgs[i].orderState == 3) {
                    status = '交易完成'
                }
                this.tableData.push({
                    userId:msgs[i].userId,
                    orderId:msgs[i].orderId,
                    date:msgs[i].orderPaytime,
                    name:msgs[i].addressName,
                    address:msgs[i].addressProvince + msgs[i].addressCity + msgs[i].addressCounty + msgs[i].addressDtaddress,
                    statu:status,
                    money: '￥ ' + msgs[i].orderMoney,
                    number: msgs[i].orderNum    
                })
            }

        })
        .catch(err => {
            console.log(err,'错误')
        })
    },
}
</script>


<style scoped>
    .p1 {
        text-align: left;
        color: rgba(0,0,0,0.85);
        font-size: 16px;
        margin: 0 10px 20px;
    }
    .inpt1 {
        font-size: 14px;
        float: left;
        margin-left: 10px;
    }
    .inpt2 {
        font-size: 14px;
        float: left;
        margin-left: 50px;
    }
    .set {
        width: 268px;
    }
    .inp {
        width: 268px;
    }
   .btn {
        width: 50px;
        height: 32px;
        padding: 0;
   }
   .btn:focus {
       background-color: none;
   }
   .sub {
       float: left;
       width: 100%;
       margin-top: 20px;
       margin-bottom: 20px;
   }
   .a1,.a2 {
       color: #606266;
       transition: all .3s;
       border: none;
       background: none;
       padding: 0;
       margin: 0;
   }
   .a0 {
       margin: 0;
       padding: 0;
   }
   .a1 {
       margin-right: 10px;
   }
   .a1:hover,.a2:hover {
       color: #409EFF;
   }
   .a2 {
       border: 1px solid #5e83fb;
       color: #5e83fb;
       padding: 5px;
       margin-left: 10px;
   }
   .block {
       margin-top: 20px;
   }
   .detail {
       display: inline-block;
       margin-bottom: 10px;
       width: 50%;
       text-align: left;
   }
   .dialog-footer {
       padding-top: 50px;
   }
   .detailImg {
       width: 50%;
       height: auto;
       float: left;
   }
   .full {
       width: 100%;
   }
   .goods {
       margin-top: 20px;
       padding-top: 20px;
       border-top: 1px dashed #888;
   }
   .head {
       display: inline-block;
       width: 100%;
       text-align: center;
       font-size: 18px;
       color: #333;
       margin-bottom: 20px;
   }
    .tt {
        border: 1px solid #5e83fb;
        color: #5e83fb;
        padding: 5px;
        cursor: pointer;
        margin-left: 10px;
        border-radius: 5px;
   }
</style>
