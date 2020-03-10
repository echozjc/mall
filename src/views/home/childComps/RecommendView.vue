<template>
    <div class="recomment">
        <div v-for="item in recommends" class="recomment-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
    .recomment{
        display: flex;
        width: 100%;
        text-align: center;
        padding:10px 0 22px;
        border-bottom: 8px solid #eee;
    }
    .recomment-item{
        flex:1;
    }
    .recomment-item img{
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
    }
</style>