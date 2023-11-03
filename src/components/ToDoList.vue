<script setup lang="ts">
import { ref } from 'vue'

import type ToDo from '@/types/ToDo'

import IconArrow from '@/components/icons/IconArrow.vue'
import ToDoItem from '@/components/ToDoItem.vue'

interface ToDoListProps {
  toDos?: Array<ToDo>
  title?: string
  isCollapsible?: boolean
  isBacklogList?: boolean
}

withDefaults(defineProps<ToDoListProps>(), {
  toDos: () => [],
  title: '',
  isCollapsible: false,
  isBacklogList: false
})

let isCollapsed = ref(false)
</script>

<template>
  <div>
    <div
      v-if="title || isCollapsible"
      class="flex items-center gap-3 text-bb-light-gray select-none py-3"
    >
      <IconArrow
        v-if="isCollapsible"
        class="cursor-pointer transition-transform"
        :class="{ '-rotate-90': isCollapsed }"
        @click="isCollapsed = !isCollapsed"
      />
      <p v-if="title">{{ title }}</p>
    </div>

    <Transition name="fade">
      <div
        v-if="toDos.length && !isCollapsed"
        class="flex flex-col gap-4"
        :class="[isCollapsible ? 'pb-3' : 'py-3']"
      >
        <TransitionGroup name="list">
          <ToDoItem
            v-for="toDo in toDos"
            :key="toDo.createdAt"
            :to-do="toDo"
            :is-backlog-item="isBacklogList"
          />
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>
