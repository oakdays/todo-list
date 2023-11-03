<script setup lang="ts">
import ToDoSorting from '@/types/ToDoSorting'

import BBButton from '@/components/BBButton.vue'
import ToDoInput from '@/components/ToDoInput.vue'
import ToDoList from '@/components/ToDoList.vue'

import { useToDosStore } from '@/stores/todos'

const store = useToDosStore()
</script>

<template>
  <div class="flex mt-4 mb-1 gap-4">
    <input
      type="text"
      placeholder="Search"
      v-model="store.search"
      class="px-4 py-3 flex-grow rounded border border-bb-light-gray"
    />
    <BBButton text="Sort by Name" primary @click="store.setSorting(ToDoSorting.Name)" />
    <BBButton text="Sort by Date" primary @click="store.setSorting(ToDoSorting.CreatedAt)" />
  </div>

  <div class="flex flex-col justify-between flex-grow">
    <div>
      <ToDoList
        v-if="store.doneBacklogToDos.length"
        :to-dos="store.doneBacklogToDos"
        is-collapsible
        :title="`${store.doneBacklogToDos.length} Done`"
        is-backlog-list
      />
      <hr
        v-if="store.doneBacklogToDos.length && store.pendingBacklogToDos.length"
        class="border-t border-bb-chrome"
      />
      <ToDoList
        v-if="store.pendingBacklogToDos.length"
        :to-dos="store.pendingBacklogToDos"
        is-backlog-list
      />
    </div>

    <ToDoInput @add="(text) => store.addToDoInBacklog(text)" />
  </div>
</template>
