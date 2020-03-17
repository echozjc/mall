<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title" >
            <div v-for="(item,index) in title"
                 @click="itemClick(index)"
                 :class="{active:index == currentIndex}"
                 class="title-item">{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from "../../../components/commom/navbar/NavBar";
  export default {
    name: "DetailNavbar",
    components:{
      NavBar
    },
    data(){
      return {
        title:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index);
      },
      backClick(){
        this.$router.back();
      },
    },
    deactivated() {
      this.currentIndex = 0;
    }
  }
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 14px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 12px;
    }
</style>