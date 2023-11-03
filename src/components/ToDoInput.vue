<script setup lang="ts">
import { ref } from 'vue'
import BBButton from '@/components/BBButton.vue'

let newToDo = ref('')
const emit = defineEmits(['add'])

function handleNewToDo() {
  emit('add', newToDo.value)
  newToDo.value = ''
}
</script>

<template>
  <div class="flex gap-4">
    <input
      type="text"
      v-model="newToDo"
      class="px-4 py-3 rounded border border-bb-light-gray flex-grow"
    />
    <BBButton text="Add Item" primary :disabled="!newToDo" @click="handleNewToDo" />
  </div>
</template>
