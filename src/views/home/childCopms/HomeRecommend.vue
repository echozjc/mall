<template>
    <div class="recommend">
        <div v-for="(item,index) in recommend" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
            <div>{{item.title}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      recommend:Array,
      default:[],
    }
  }
</script>

<style scoped>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 15px 0 15px;
        border-bottom: 8px solid #eee;
    }
    .recommend div{
        flex: 1;
    }
    .recommend div img{
        width: 68px;
        height: 68px;
        margin-bottom: 10px;
    }

</style>