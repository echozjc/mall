<template>
    <div class="tab-bar-item" @click="itemClick">
        <slot v-if="!isActive" name="item-icon"/>
        <slot v-else name="item-icon-active"/>
        <div :style="activeStyle"><slot name="item-text"/></div>
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
    },
    computed:{
      isActive(){
        return this.path == this.$route.path;
      },
      activeStyle(){
        return this.isActive?{color:'red'}:{};
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path).catch(err=>{err});
      }
    }
  }
</script>

<style scoped>
    .tab-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }
    .tab-bar-item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
</style>