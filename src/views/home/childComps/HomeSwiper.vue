<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link" >
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/commom/swiper"
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      SwiperItem,
      Swiper,
    }
  }
</script>

<style scoped>

</style>