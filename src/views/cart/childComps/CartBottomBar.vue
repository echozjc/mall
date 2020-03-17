<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button"
                          :is-check="isSelectAll" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">合计:{{totalPrice}}</div>

        <div class="calculate">去计算：{{checkLength}}</div>
    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return "￥"+this.$store.state.cartList.filter(item=>{
          return item.checked;
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2);
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0) return false;
        return this.checkLength === this.$store.state.cartList.length;
      }
    },
    methods:{
      checkClick(){
          this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      }
    }
  }
</script>

<style scoped>
    .bottom-bar{
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;

        background-color: #eee;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 70px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        margin-right: 7px;
        line-height: 20px;
    }
    .price{
        margin-left: 30px;
        flex: 1;
    }
    .calculate{
        width: 90px;
        background-color: red;
        color: #fff;
        text-align: center;
    }

</style>