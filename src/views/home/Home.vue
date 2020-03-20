<template>
    <div id="home">
        <nav-bar class="nav-bar">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :title="['流行','新款','精选']"
                     @itemClick="itemClick" ref="tabControl1"
        class="tab-control" v-show="isTabFixed"/>
        <scroll class="wrapper" :probe-type="3" :pull-up-load="true"
        @scroll="contentScroll" ref="scroll"
        @loadMore = "loadMore">
            <home-swiper :banner="banner" @swiperLoad="swiperLoad"/>
            <home-recommend :recommend="recommend"></home-recommend>
            <feature-view></feature-view>
            <tab-control :title="['流行','新款','精选']"
              @itemClick="itemClick" ref="tabControl2"/>
            <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>
        <back-top v-show="backTop" @click.native="backClick"></back-top>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./childCopms/HomeSwiper";
    import HomeRecommend from "./childCopms/HomeRecommend";
    import FeatureView from "./childCopms/FeatureView";
    import TabControl from "../../components/content/tabcontrol/TabControl";
    import {getHomeGoods,getHomeMultidata} from "../../network/home";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll";
    import {itemListenerMixin,backTopMixin} from "../../common/mixin";

    export default {
    name: "Home",
    mixins:[itemListenerMixin ,backTopMixin],
    data(){
      return {
        banner:[],
        recommend:[],
        goods:{
          'pop':{page:0,list:[]},
          'sell':{page:0,list:[]},
          'new':{page:0,list:[]},
        },
        currentType:'pop',
        scrollY:0,
        tabOffsetTop:546,
        isTabFixed: false,
      };
    },
    methods:{
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
        });
        this.goods[type].page += 1;
      },
      itemClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop))
      },
      contentScroll(position){
        this.backTop = (position.y<-1000);
        this.isTabFixed = (position.y <= -this.tabOffsetTop);
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp()
      },
      swiperLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.scrollY,0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY();
      this.$bus.$off('imageLoad',this.itemImageListener)
    },
    created() {
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('sell');
      this.getHomeGoods('new');
    },
    mounted() {
    },
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
}
</script>

<style scoped>
    #home{
        padding-bottom: 49px;
        height: 100vh;
    }
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
        /*position: fixed;*/
        /*right: 0;*/
        /*left: 0;*/
        /*top: 0;*/
    }
    .tab-control{
        position: relative;
        z-index: 10;
    }
    .wrapper{
        height: calc(100% - 49px);
        overflow: hidden;
        position: absolute;
        top:44px;
    }

</style>