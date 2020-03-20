<template>
    <nav-bar class="nav-bar">
        <div slot="left" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
            <div v-for="(item,index) in title" :key="index"
                 :class="{active:currentIndex==index}"
            @click="titleClick(index)">
                {{item}}
            </div>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return{
        title:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
    components:{
      NavBar
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
    .nav-bar{
        position: relative;
        background-color: #fff;
        z-index: 9;
    }
    .nav-bar img{
        margin-top: 10px;
    }
    .title{
        display: flex;
    }
    .title div{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
</style>