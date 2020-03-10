<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
    #tab-bar{
        /*弹性布局，所有子元素自动称为容器成员*/
        display: flex;
        /*背景*/
        background-color: #f6f6f6;
        /*固定定位*/
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        /*设置tab-bar上层阴影*/
        box-shadow: 0 -1px 1px rgba(100,100,100,.2);
        z-index: 9;
    }
</style>