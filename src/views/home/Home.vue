<template>
    <div id = "home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :title="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
        class="tab-control" v-show="isTabFixed"></tab-control>
        <!--绑定时不加v-bind即传的都是字符串，加上则会转换类型-->
        <scroll class="content" ref="scroll" :probe-type="3"
                @scroll="contentScroll" :pull-up-load="true"
                 @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :title="['流行','新款','精选']"
                         @tabClick="tabClick"
            ref="tabControl2"></tab-control>
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
    import {deboundce} from "../../common/utils";

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
          isShowBackTop:false,
          tabOffsetTop:0,
          isTabFixed:false,
          saveY:0,
          itemImageListener:null,
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
      methods:{
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
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        backClick(){
          /*this.$refs.scroll是拿到元素*/
          /*this.$refs.scroll.scroll拿到元素里的对象*/
          /*第一二个参数是x,y,第三个参数是返回的时间，毫秒为单位*/
          this.$refs.scroll.scrollTo(0,0,500);
        },
        contentScroll(position){
          //判断BackTop是否显示
          this.isShowBackTop = position.y < -1000;
          this.isTabFixed = -(position.y) >= this.tabOffsetTop;

          //决定tabControl是否吸顶(position:fixed)
        },
        loadMore(){
          this.getHomeGoods(this.currentType);
          this.$refs.scroll.finishPullUp();
        },

        swiperImageLoad(){
          //获取tabControl的offsetTop
          //所有的组件都有一个属性$el:用于获取组件中的元素
          //offsetTop只有当前面的元素加载完得到的才是正确的值
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
          })
        },
      },
      mounted() {
        //图片加载完成的事件监听
        const refresh = deboundce(this.$refs.scroll.refresh,200);
        this.itemImageListener = ()=>{
          refresh();
        }
        this.$bus.$on('itemImageLoad',this.itemImageListener);
      },
      activated() {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0,this.saveY,0)
         // this.$refs.scroll.refresh();
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY();
        //取消全局监听事件
        this.$bus.$off('itemImageLoad',this.itemImageListener);
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
        /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
/*        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;*/
    }
    .tab-control{
        position: relative;
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