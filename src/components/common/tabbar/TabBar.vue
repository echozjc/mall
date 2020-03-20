<template>
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
    .tab-bar{
        position: fixed;
        display: flex;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 -1px 1px rgba(100,100,100,.2);
        background-color: #f6f6f6;
    }
</style>