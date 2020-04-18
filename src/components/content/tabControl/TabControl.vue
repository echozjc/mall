<template>
    <div class="tab-control">
        <div v-for="(item,index) in title" :key="index" class="tab-control-item"
           @click="itemClick(index)" :class="{active:currentIndex==index}">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      title:Array,
    },
    data(){
      return{
        currentIndex:0,
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('itemClick',index)
      }
    }
  }
</script>

<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        line-height: 40px;
        height: 40px;
        background-color: #fff;
        font-size: 15px;
        z-index: 99;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding:5px;
    }
    .active span{
        color: var(--color-tint);
        border-bottom: 3px solid var(--color-tint);
    }
</style>