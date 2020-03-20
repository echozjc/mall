<template>
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
      probeType:0,
      pullUpLoad:false,
    },
    data(){
      return{
        scroll:null,
      }
    },
    methods:{
      scrollTo(x,y,time=300){
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
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      this.scroll.on('scroll',position=>{
         this.$emit("scroll",position);
      })

      this.scroll.on('pullingUp',()=>{
        this.$emit('loadMore')
      })
    }
  }
</script>

<style scoped>

</style>