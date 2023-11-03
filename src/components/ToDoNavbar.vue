<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="text-xl flex gap-8 font-bold border-b border-bb-chrome">
    <RouterLink
      to="/"
      :class="['transition-colors', $route.name === 'toDoList' ? 'text-bb-black' : 'text-bb-gray']"
    >
      To Do List

      <Transition name="fade">
        <div v-if="$route.name === 'toDoList'" class="w-full h-1 bg-bb-blue mt-3" />
      </Transition>
    </RouterLink>

    <RouterLink
      to="/backlog"
      :class="['transition-colors', $route.name === 'backlog' ? 'text-bb-black' : 'text-bb-gray']"
    >
      Backlog

      <Transition name="fade">
        <div v-if="$route.name === 'backlog'" class="w-full h-1 bg-bb-blue mt-3" />
      </Transition>
    </RouterLink>
  </nav>
</template>
