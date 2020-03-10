<template>
    <div id = "home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!--绑定时不加v-bind即传的都是字符串，加上则会转换类型-->
        <scroll class="content" ref="scroll" :probe-type="3"
                @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control class="tab-control" :title="['流行','新款','精选']"
                         @tabClick="tabClick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <!--监听组件要用.native-->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/commom/navbar/NavBar";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/commom/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "../../network/home";


    export default {
      name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      data() {
        return {
          banners: [],
          recommends: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []},
          },
          currentType: 'pop',
          scroll: null,
          isShowBackTop:false,
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list;
        }
      },
      created() {
        //请求多个数据
        //这是个异步操作
        this.getHomeMultidata();

        //请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
      },
      methods: {
        /*
      * 事件监听
      * */
        tabClick(index) {
          switch (index) {
            case 0:
              this.currentType = 'pop';
              break;
            case 1:
              this.currentType = 'new';
              break;
            case 2:
              this.currentType = 'sell';
              break;
          }
        },
        backClick(){
          /*this.$refs.scroll是拿到元素*/
          /*this.$refs.scroll.scroll拿到元素里的对象*/
          /*第一二个参数是x,y,第三个参数是返回的时间，毫秒为单位*/
          this.$refs.scroll.scrollTo(0,0,500);
        },
        contentScroll(position){
          this.isShowBackTop = position.y < -1000;
        },
        loadMore(){
          //上拉加载更多
          this.getHomeGoods(this.currentType)

          //scroll滚动的区域一开始没算上图片(有时候图片会在scroll计算好前加载完)
          //所以需要图片加载完时刷新，重新计算高度
          this.$refs.scroll.scroll.refresh();
        },


        /*
      * 网络请求
      * */
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            // this.result = res;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1;
          getHomeGoods(type, page).then(res => {
            //第一次调用，res是第一页前30条数据
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page++;

            //加载之后，没加载一次需要增加scroll高度
            this.$refs.scroll.finishpullUp();
          })
        },
      },
      mounted() {
      }
    }
</script>

<!--scoped作用域表示样式只对当前组件其效果-->
<style scoped>
    #home{
        /*padding-top: 44px;*/
        /*vh:viewport height*/
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    .tab-control{
        /*在滚动没达到某个值时为sticky*/
        /*达到之后改为flex*/
        position: sticky;
        top: 44px;
        z-index: 9;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    /*.content{*/
    /*    height: calc(100% - 93px);*/
    /*    margin-top: 44px;*/
    /*    overflow: hidden;*/
    /*}*/
</style>