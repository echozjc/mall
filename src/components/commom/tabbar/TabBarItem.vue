<template>
   <div class="tab-bar-item" @click="itemClick">
       <!--item-icon插条放图片-->
       <slot v-if="isActive" name="item-icon"></slot>
       <!--item-icon-active插条活跃时放点击图片-->
       <slot v-else name="item-icon-active"></slot>
       <!--item-text插条放文字-->
       <div :style="!activeStyle"><slot name="item-text"></slot></div>
       <!--图片下面默认多3px-->
<!--       <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--       <div>首页</div>-->
   </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red',
      },
    },
    data(){
      return{
        // isActive: true
      }
    },
    computed:{
      isActive(){
        //比较当前活跃的path和item的path比较
        return this.$route.path.indexOf(this.path);
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{};
      }
    },
    methods:{
      itemClick(){
       this.$router.replace(this.path).catch(err => {err})
      }
    }
  }
</script>

<style scoped>
    .tab-bar-item{
        /*均等分*/
        flex:1;
        text-align: center;
        /*常用高度*/
        height: 49px;
        font-size: 14px;
    }
    .tab-bar-item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        /*去除图片下面的3px*/
        vertical-align: middle;
    }
</style>