<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click="onClose"
  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0   bg-opacity-70" @click="onClose"></div>
      
      <div class="inline-block w-full max-w-md p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
        <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-4 px-6 rounded-t-lg">
          Add New Todo
        </div>
        
        <form @submit="handleSubmit">
          <div class="p-6">
            <div class="w-full">
              <input
                id="new-todo"
                name="new-todo"
                type="text"
                v-model="todoText"
                placeholder="Enter todo text..."
                autofocus
                class="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
          
          <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
            <button
              type="button"
              @click="onClose"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!todoText.trim()"
              :class="[
                'px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                !todoText.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg'
              ]"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  onAdd: Function
})

const todoText = ref('')

const handleSubmit = (e) => {
  e.preventDefault()
  if (todoText.value.trim()) {
    props.onAdd({ todo: todoText.value.trim() })
    todoText.value = ''
    props.onClose()
  }
}
</script>

