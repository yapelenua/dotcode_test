<template>
  <div class="container mt-30 ml-100">
    <h1 class="text-2xl font-bold mb-4">Welcome to Investor App</h1>
    <div class="flex space-x-4 mb-4">
      <button class="btn"><RouterLink to="/bittable">Go to Bittable</RouterLink></button>
      <button class="btn"><RouterLink to="/desktop">Go to Desktop</RouterLink></button>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  @apply text-2xl font-bold mb-4;
}

.buttons {
  @apply flex space-x-4 mb-4;
}

.btn {
  @apply px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer;
}

.btn:hover {
  @apply bg-blue-600;
}
</style>
