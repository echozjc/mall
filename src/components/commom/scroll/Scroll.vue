<template>
    <!--ref/children-->
    <!--ref如果是绑定在组件中，那么通过this.$ref.refname获取到的是一个组件对象-->
    <!--ref如果是绑定在普通元素中，那么通过this.$ref.refname获取到的是一个元素对象-->
    <div class="wrapper" ref="wrapper">
          <div class="content">
              <slot></slot>
          </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0,
      },
      pullUpLoad:{
        type: Boolean,
        default: false,
      }
    },
    data(){
      return {
        scroll:null,
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        //设置为可监听点击事件
        click:true,
        //当数字为2时，在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
        //3：只要是滚动，都侦测，其他数字不侦测
        probeType: this.probeType,
        //配置上拉加载功能
        pullUpLoad:this.pullUpLoad,
      })

      //2.监听滚动的区域
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      }

      //监听滚动到底部
      //在一次上拉加载的动作后，这个时机一般用来去后端请求数据
      //默认加载一次,加载后调用finishPullUp可重新监听
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time = 300){
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      getScrollY(){
        return this.scroll?this.scroll.y:0;
      }
    }
  }
</script>

<style scoped>
    .wrapper{
        position: relative;
    }
</style>