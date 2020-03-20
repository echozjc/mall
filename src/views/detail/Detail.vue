<template>
    <div class="detail">
        <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goodsInfo"></detail-base-info>
            <detail-shop-info :shop="shopInfo"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
            <detail-params-info ref="params" :param-info="itemParams"></detail-params-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top v-show="backTop" @click.native="backClick"></back-top>
<!--        <toast :message="message" :show="show"></toast>-->
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamsInfo from "./childComps/DetailParamsInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import {getDetail,Goods,GoodsParam,getRecommend} from "../../network/detail";
    import {itemListenerMixin,backTopMixin} from "../../common/mixin";
    import {debounce} from "../../common/utils";
    import {mapActions} from 'vuex'
    // import Toast from "../../components/common/toast/Toast";


    export default {
    name: "Detail",
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goodsInfo:{},
        shopInfo:{},
        detailInfo:{},
        itemParams:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // show:false,
      }
    },
    created() {
      //获取iid
      this.iid = this.$route.params.iid;
      //请求详情数据
      getDetail(this.iid).then(res=>{
        //获取数据
        const data = res.result;
        //取出轮播图数据
        this.topImages = data.itemInfo.topImages;

        //创建商品对象
        this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        //取出店铺信息
        this.shopInfo = data.shopInfo;

        //取出详情信息
        this.detailInfo = data.detailInfo;

        //获取参数信息
        this.itemParams = new GoodsParam(data.itemParams.info,data.itemParams.rule);

        //取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
      })

      //请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })

      // this.$nextTick(()=>{
      //   //根据最新的数据，对应的是DOM是已经渲染出来的
      //   //但是图片依然是没有加载完的(这里获取的offsetTop是不包含图片的)
      //   this.themeTopYs = [];
      //
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // })

      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },100)

    },
    mounted() {
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    },
    destroyed() {
      this.$bus.$off('imageLoad',this.itemImageListener)
    },
    methods:{
      ...mapActions(['addCart']),
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
      },
      imgLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY()
      },
      contentScroll(position){
        const positionY = - position.y;
        const length = this.themeTopYs.length;
        for(let i = 0; i < length; i++){
          if(this.currentIndex !== i && ((i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length-1 && positionY > this.themeTopYs[i]))){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }

        }
        this.backTop = (position.y<-1000);
      },
      addToCart(){
        //获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.goodsInfo.realPrice;
        product.iid = this.iid;

        this.addCart(product).then(res=>{
          // this.show = true;
          // this.message = res;
          // setTimeout(()=>{
          //   this.show = false;
          //   this.message = '';
          // },1500)
           this.$toast.show(res,2000);
        })

        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
      },
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
}
</script>

<style scoped>
    .detail{
        height: 100vh;
        background-color: #fff;
        position: relative;
        z-index: 10;
    }
    .content{
        background-color: #fff;
        height: calc(100% - 93px);
    }
</style>