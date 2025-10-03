<template>
  <div class="max-w-4xl mx-auto p-4 min-h-screen">
    <button
      @click="goBack"
      class="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to List
    </button>

    <div v-if="isLoading" class="flex justify-center items-center min-h-60">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="!todo" class="max-w-4xl mx-auto p-4">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
        Todo not found
      </div>
      <button
        @click="goBack"
        class="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to List
      </button>
    </div>

    <div v-else class="bg-white rounded-lg shadow-xl p-6 bg-gradient-to-br from-white to-gray-50">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-900 mb-4">
          {{ todo.todo }}
        </h1>
        <span
          :class="[
            'px-3 py-1 text-sm font-semibold rounded-full',
            todo.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          ]"
        >
          {{ todo.completed ? 'Completed' : 'Pending' }}
        </span>
      </div>

      <div class="flex flex-col gap-4">
        <div class="p-4 rounded-lg bg-gray-50">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">Status</h3>
          <p class="font-medium text-gray-900">
            {{ todo.completed ? 'Completed' : 'Pending' }}
          </p>
        </div>

        <div class="p-4 rounded-lg bg-gray-50">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">User</h3>
          <p class="font-medium text-gray-900">
            {{ todo.userId }}
          </p>
        </div>

        <div class="p-4 rounded-lg bg-gray-50">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">Todo ID</h3>
          <p class="font-medium text-gray-900">
            {{ todo.id }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodo } from '../use/useTodo'

const route = useRoute()
const router = useRouter()
const { todos, isLoading } = useTodo()

const todo = computed(() => {
  const id = Number(route.params.id)
  return (todos.value || []).find(t => t.id === id)
})

function goBack() {
  router.push('/')
}
</script>


