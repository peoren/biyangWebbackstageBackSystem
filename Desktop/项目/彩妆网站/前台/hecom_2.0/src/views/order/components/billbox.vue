<template>
    <div class="billbox">
        <div class="billTitle">
            订单一览
        </div>
        <div class="billMsg">
            <div>
                <span>共{{this.$store.state.order_form.allnum}}件商品</span> 
            </div>
            <div class="billPrice">
                <div>
                    <span>订单小计</span>
                    <span>￥{{this.$store.state.order_form.beforeallprice}}.00</span>
                </div>
                <div>
                    <span>运费</span>
                    <span>￥12.00</span>
                </div>
            </div>
            <div class="billAllPrice">
                <span>预计总额</span>
                <span>￥{{this.$store.state.order_form.allprice}}.00</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.billbox{
    width: 70%;
    float: right;
    text-align: left;
}
.billTitle{
    font-size: 24px;
    color: #464646;
    margin: 60px auto 10px;
}
.billPrice{
    border-top: 1px solid #a0a0a0;
    border-bottom: 1px solid #a0a0a0;

}
.billMsg span{
    font-size: 14px;
    line-height: 21px;
    display: inline-block;
    margin: 15px auto;
    color: #000;
}
.billPrice>div:nth-of-type(1) span{
    margin-bottom: 0;
}
.billPrice>div span:nth-of-type(2){
    display: block;
    float: right;
}
.billAllPrice{
       border-bottom: 1px solid #a0a0a0;
}
.billAllPrice span:nth-of-type(2){
    display: block;
    float: right;
}
</style>
