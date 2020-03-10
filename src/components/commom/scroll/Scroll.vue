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
        type:Boolean,
        default: false
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
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的区域
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp',()=>{
        //上拉加载更多
       this.$emit('pullingUp')
      })

    },
    methods:{
      scrollTo(x,y,time = 300){
        this.scroll.scrollTo(x,y,time);
      },
      finishpullUp(){
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>