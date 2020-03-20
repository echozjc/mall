<template>
    <div class="goods">
        <goods-list-item :good="item" v-for="(item,index) in goods" :key="index"/>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
    name: "GoodsList",
    props:{
      goods:Array,
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>