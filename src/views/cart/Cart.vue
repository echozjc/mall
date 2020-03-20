<template>
    <div class="cart">
        <!--导航-->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>

        <!--商品列表-->
        <cart-list></cart-list>

        <!--底部汇总-->
        <cart-bottom-bar/>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import CartBottomBar from "./childComps/CartBottomBar";
    import {mapGetters} from 'vuex'
    import CartList from "./childComps/CartList";
    export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //用法1
      // ...mapGetters(['cartLength','cartList']),

      //用法2
      ...mapGetters({
        length:'cartLength',
      })
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
</style>