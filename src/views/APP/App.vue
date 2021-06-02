<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/about1">About1</router-link>
    </div> -->
    	<transition :name="transitionName">
            <router-view/>
    	</transition>  
  </div>
</template>
<script lang="ts">
import APP from './app';
export default class AppVue extends APP {}
</script>
<style lang="less">
@import url("./app.less");
</style>
