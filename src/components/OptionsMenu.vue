<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'

import IconDotsVue from '@/components/icons/IconDots.vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits(['optionsClick', 'outsideClick', 'delete', 'moveToBacklog'])
</script>

<template>
  <div class="p-2 relative" :class="{ 'bg-bb-chrome rounded-full': isOpen }">
    <IconDotsVue
      class="cursor-pointer"
      :class="[isOpen ? 'fill-bb-black' : 'fill-bb-dark-gray']"
      @click="$emit('optionsClick')"
    />

    <Transition name="fade">
      <div
        v-if="isOpen"
        v-on-click-outside="() => $emit('outsideClick')"
        class="absolute flex flex-col -left-36 top-2 text-bb-blue font-medium text-sm select-none"
      >
        <button
          class="text-start px-3 py-2 cursor-pointer border border-bb-light-gray rounded-t bg-white active:border-bb-dark-gray"
          @click="$emit('delete')"
        >
          Delete
        </button>

        <button
          class="text-start px-3 py-2 cursor-pointer border border-t-0 border-bb-light-gray rounded-b bg-white active:border-bb-dark-gray active:border-t active:-translate-y-[1px]"
          @click="$emit('moveToBacklog')"
        >
          Move to Backlog
        </button>
      </div>
    </Transition>
  </div>
</template>
