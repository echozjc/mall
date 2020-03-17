<template>
    <div id="detail">
        <detail-navbar @titleClick="titleClick" class="detail-nav"
        ref="nav"/>
        <scroll class="content" ref="scroll"
                @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo"
            @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top v-show="isShowBackTop" @click.native="backTop"></back-top>
    </div>
</template>

<script>
    import DetailNavbar from "./childComps/DetailNavbar";
    import {getDetail, shop,Goods,GoodsParam,getRecommend} from "../../network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "../../components/commom/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import {deboundce} from "../../common/utils";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "../../components/content/backTop/BackTop";

    export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        //商品信息
        goods:{},
        //商家信息
        shop:{},
        //保存商品的详情信息
        detailInfo:{},
        //保存参数信息
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImageListener:null,
        //存放每个参数跳转的位置
        themeTops:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;

      //根据iid请求详细数据
      getDetail(this.iid).then(res=>{
          const data = res.result;
          //获取顶部的图片轮播处理
          this.topImages = data.itemInfo.topImages;

          //获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

          //获取商家信息
          this.shop = new shop(data.shopInfo);

          //保存商品的详情信息
          this.detailInfo = data.detailInfo;

          //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

        //取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
        // this.$nextTick(()=>{
        //   //根据最新数据，对应的DOM是已经被渲染出来
        //   //但是图片依然是没有加载完(目前获取的offsetTop是不包含图片的)
        //   this.themeTops = [];
        //   this.themeTops.push(0);
        //   this.themeTops.push(this.$refs.params.$el.offsetTop);
        //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTops)
        // })

      });

      //请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list;
      });

      /*getgetThemeTopY赋值(对该操作进行防抖)*/
      this.getThemeTopY = deboundce(()=>{
          this.themeTops = [];
          this.themeTops.push(0);
          this.themeTops.push(this.$refs.params.$el.offsetTop);
          this.themeTops.push(this.$refs.comment.$el.offsetTop);
          this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      },100)
    },
     methods:{
       backTop(){
         this.$refs.scroll.scrollTo(0,0,100);
       },
       imageLoad(){
         this.$refs.scroll.refresh();
         this.getThemeTopY();
       },
       titleClick(index){
         this.$refs.scroll.scrollTo(0,-this.themeTops[index],100);
       },
       contentScroll(position){
         const positionY = -position.y;
         this.isShowBackTop = positionY >= 1000?true:false;
         if(positionY>=this.themeTops[1]) this.currentIndex = 1;
         if(positionY>=this.themeTops[2]) this.currentIndex = 2;
         if(positionY>=this.themeTops[3]) this.currentIndex = 3;
         this.$refs.nav.currentIndex = this.currentIndex;
       },
       addToCart(){
         //获取购物车需要展示的信息
         const produce = {}
         produce.image = this.topImages[0]
         produce.title = this.goods.title;
         produce.desc = this.goods.desc;
         produce.price = this.goods.realPrice;
         produce.iid = this.iid;

         //将商品添加到购物车
         this.$store.dispatch('addCart',produce)
       }
     } ,
      mounted() {
      let newRefresh = deboundce(this.$refs.scroll.refresh,200)
        this.itemImageListener = ()=>{
          newRefresh();
        }
        this.$bus.$on('itemImageLoad',this.itemImageListener)
      },
      updated() {

      },
      destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImageListener);
      },
      components:{
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
        DetailBottomBar,
        BackTop
    }
  }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 10;
        background-color: #fff;
        height: 100vh;
    }

    .content{
        height: calc(100% - 93px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>