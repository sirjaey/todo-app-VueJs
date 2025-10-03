<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 overflow-y-auto"
  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="onClose"></div>
      
      <div class="inline-block w-full max-w-md p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg" @click.stop>
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-t-lg">
          Confirm Delete
        </div>
        
        <div class="p-6">
          <p class="text-center font-semibold text-lg text-gray-900">
            Are you sure you want to delete "{{ title }}"?
          </p>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            @click="onClose"
            id="cancel-delete"
            name="cancel-delete"
            aria-label="Cancel deletion"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            @click="onConfirm"
            id="confirm-delete"
            name="confirm-delete"
            aria-label="Confirm deletion"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  onClose: Function,
  onConfirm: Function,
  title: String
})
</script>

