<script setup lang="ts">
defineProps<{
  text: string
  primary?: boolean
  small?: boolean
}>()
</script>

<template>
  <button
    class="border disabled:bg-bb-light-gray disabled:border-bb-gray rounded transition font-medium"
    :class="[
      small ? 'text-sm px-3 py-2' : 'px-3 py-3 sm:px-4',
      primary
        ? 'bg-bb-blue border-bb-dark-blue hover:bg-bb-light-blue hover:border-bb-blue text-white'
        : 'bg-white border-bb-light-gray text-bb-blue active:border-bb-dark-gray'
    ]"
  >
    {{ text }}
  </button>
</template>
