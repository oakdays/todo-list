<script setup lang="ts">
import ToDoInput from '@/components/ToDoInput.vue'
import ToDoList from '@/components/ToDoList.vue'

import { useToDosStore } from '@/stores/todos'
const store = useToDosStore()
</script>

<template>
  <!-- TODO: Adapt to mobile -->
  <main class="flex flex-col justify-between flex-grow">
    <div>
      <ToDoList
        v-if="store.doneToDos.length"
        :to-dos="store.doneToDos"
        is-collapsible
        :title="`${store.doneToDos.length} Done`"
      />
      <hr
        v-if="store.doneToDos.length && store.pendingToDos.length"
        class="border-t border-bb-chrome"
      />
      <ToDoList v-if="store.pendingToDos.length" :to-dos="store.pendingToDos" />
    </div>

    <ToDoInput @add="(text) => store.addToDo(text)" />
  </main>
</template>
