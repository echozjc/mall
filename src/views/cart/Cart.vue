<template>
   <div class="cart">
       <nav-bar class="nav-bar">
           <div slot="center">购物车({{length}})</div>
       </nav-bar>

       <!--商品的列表-->
       <scroll class="content" ref="scroll">
           <cart-list></cart-list>
       </scroll>
       <!--底部汇总-->
       <cart-bottom-bar></cart-bottom-bar>
   </div>
</template>

<script>
    import NavBar from "../../components/commom/navbar/NavBar";
    import CartList from './childComps/CartList';
    import Scroll from "../../components/commom/scroll/Scroll";
    import {mapGetters} from 'vuex'
    import CartBottomBar from "./childComps/CartBottomBar";
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed:{
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
      //使用对象展开运算符，将getter混入到computed对象中
      //数组
      // ...mapGetters(['cartLength'])
      //对象
      ...mapGetters({
        length:'cartLength',
      })
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
    .cart{
        height: 100vh;
    }
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
    }
    .content{
        height: calc(100% - 93px - 40px);
        overflow: hidden;
    }
</style>