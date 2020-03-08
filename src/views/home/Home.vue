<template>
    <div id = "home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
    </div>
</template>

<script>
    import NavBar from "components/commom/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import {getHomeMultidata} from "../../network/home";

    export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
     return {
       banners:[],
       recommends:[]
     }
    },
    created() {
      //请求多个数据
      //这是个异步操作
      getHomeMultidata().then(res=>{
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      //打印出来大概率为空
      //console.log(this.result);
    }
}
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
    }
</style>