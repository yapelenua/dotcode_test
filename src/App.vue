<template>
    <h1>Welcome to investor app</h1>
    <button><RouterLink to="/bittable">Go to Bittable</RouterLink></button>
    <button><RouterLink to="/desktop">Go to Desktop</RouterLink></button>
    <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
 button{
  margin-left: 50px;
 }
</style>