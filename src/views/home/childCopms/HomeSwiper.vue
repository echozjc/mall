<template>
    <swiper class="swiper1">
        <swiperItem v-for="(item,index) in banner" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiperItem>
    </swiper>
</template>

<script>
    import Swiper from "../../../components/common/swiper/Swiper";
    import SwiperItem from "../../../components/common/swiper/SwiperItem";
  export default {
    name: "HomeSwiper",
    props:{
      banner:Array,
      default:[],
    },
    components:{
      SwiperItem,
      Swiper
    },
    methods:{
      imageLoad(){
        this.$emit('swiperLoad')
      }
    }
  }
</script>

<style scoped>
</style>