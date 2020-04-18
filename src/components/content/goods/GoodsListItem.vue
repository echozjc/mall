<template>
    <div class="goods">
        <img v-lazy ="showImg" alt="" @load="imageLoad"
        @click="itemClick">
        <div class="goods-info">
            <p>{{good.title}}</p>
            <span class="price">{{good.price}}</span>
            <span class="collect">{{good.cfav}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      good:Object
    },
    computed:{
      showImg(){
        return this.good.img || this.good.image || this.good.show.img
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit("imageLoad")
      },
      itemClick(){
        this.$router.push('/detail/'+this.good.iid)
      }
    }
  }
</script>

<style scoped>
    .goods {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
        background-color: #fff;
    }
    .goods img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>