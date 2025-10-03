<template>
  <div class="flex items-start sm:items-center gap-4 py-3 px-4 border-b border-gray-200 transition-all duration-200 hover:bg-blue-50 hover:translate-x-1 last:border-b-0">
    <div v-if="isEditing" class="flex items-center gap-2 w-full">
      <input
        :id="`edit-todo-${todo.id}`"
        :name="`edit-todo-${todo.id}`"
        type="text"
        v-model="editedTitle"
        @keyup.enter="handleSave"
        @keyup.escape="handleCancel"
        autofocus
        class="flex-1 px-3 py-2 text-base border border-gray-300 rounded-md outline-none bg-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <button
        @click="handleSave"
        class="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
        aria-label="Save"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
      <button
        @click="handleCancel"
        class="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Cancel"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div v-else class="flex items-start sm:items-center gap-4 w-full">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="handleToggle"
        class="mt-1 sm:mt-0 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <div class="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 w-full">
        <div class="flex flex-col gap-2 w-full">
          <div class="flex justify-between items-center w-full gap-2">
            <h3
              @click="handleTitleClick"
              :class="[
                'cursor-pointer transition-colors duration-200 break-words flex-1 pr-2 flex items-center min-h-10 text-base sm:text-inherit',
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900 hover:text-blue-600 hover:no-underline'
              ]"
            >
              {{ todo.todo }}
            </h3>
            <div class="flex items-center gap-1 flex-shrink-0">
              <div v-if="!isMobile" class="mr-2">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    todo.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  ]"
                >
                  {{ todo.completed ? 'Complete' : 'Pending' }}
                </span>
              </div>
              <div class="flex gap-1">
                <button
                  @click="() => setIsEditing(true)"
                  class="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                  :class="isMobile ? 'text-sm' : 'text-base'"
                  aria-label="Edit"
                >
                  <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  @click="props.onDelete"
                  class="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                  :class="isMobile ? 'text-sm' : 'text-base'"
                  aria-label="Delete"
                >
                  <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-if="isMobile">
            <span
              :class="[
                'px-2 py-1 text-xs font-medium rounded-full self-start',
                todo.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-orange-100 text-orange-800'
              ]"
            >
              {{ todo.completed ? 'Complete' : 'Pending' }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  todo: Object,
  onDelete: Function,
  onToggle: Function
})

const router = useRouter()
const isMobile = ref(false)

const isEditing = ref(false)
const editedTitle = ref(props.todo.todo)

// Simple mobile detection
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const handleSave = () => {
  if (editedTitle.value.trim() === "") return
  props.onToggle({ ...props.todo, todo: editedTitle.value })
  setIsEditing(false)
}

const handleCancel = () => {
  setIsEditing(false)
  editedTitle.value = props.todo.todo
}

const handleTitleClick = () => {
  router.push(`/todo/${props.todo.id}`)
}

const handleToggle = () => {
  props.onToggle({ ...props.todo, completed: !props.todo.completed })
}

const setIsEditing = (value) => {
  isEditing.value = value
}
</script>

