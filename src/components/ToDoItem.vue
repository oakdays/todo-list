<script setup lang="ts">
import type ToDo from '@/types/ToDo'

import OptionsMenu from '@/components/OptionsMenu.vue'
import BBButton from '@/components/BBButton.vue'

import { useToDosStore } from '@/stores/todos'
import IconChecked from './icons/IconChecked.vue'
const store = useToDosStore()

defineProps<{
  toDo: ToDo
  isBacklogItem?: boolean
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex">
      <input
        type="checkbox"
        name="done"
        :id="`${toDo.id}-done`"
        class="mr-2 hidden"
        v-model="toDo.isDone"
      />
      <div
        class="w-6 h-6 border rounded-full mr-2 shadow-md flex items-center justify-center"
        :class="{
          'bg-white border-bb-light-gray': !toDo.isDone,
          'bg-bb-blue border-bb-blue': toDo.isDone
        }"
        @click="toDo.isDone = !toDo.isDone"
      >
        <IconChecked v-if="toDo.isDone" />
      </div>

      <div>
        <label
          :for="`${toDo.id}-done`"
          class="leading-normal text-base text-bb-black"
          :class="{
            'text-bb-black': !toDo.isDone,
            'text-bb-dark-gray line-through': toDo.isDone
          }"
        >
          {{ toDo.text }}
        </label>
        <p class="leading-normal text-xs text-bb-dark-gray">
          {{ new Date(toDo.createdAt).toUTCString() }}
        </p>
      </div>
    </div>

    <OptionsMenu
      v-if="!toDo.isDone && !isBacklogItem"
      :is-open="store.openItemId === toDo.id"
      @options-click="store.setOpenItemId(toDo.id)"
      @outside-click="store.setOpenItemId('')"
      @delete="store.deleteToDo(toDo.id)"
      @move-to-backlog="store.moveToBacklog(toDo.id)"
    />

    <BBButton
      v-if="isBacklogItem"
      small
      text="Move to List"
      @click="store.moveToMainList(toDo.id)"
    />
  </div>
</template>
