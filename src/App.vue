<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToDoNavbar from '@/components/ToDoNavbar.vue'
</script>

<template>
  <div class="max-w-app mx-auto py-7 px-4 h-screen overflow-hidden flex flex-col">
    <ToDoNavbar />
    <RouterView />
  </div>
</template>
