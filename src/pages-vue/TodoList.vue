<template>
  <div class="min-h-screen py-4 px-2 sm:py-6 sm:px-4 md:py-8">
    <div class="max-w-4xl mx-auto px-2 sm:px-4">
      <div
        class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 bg-gradient-to-r from-white/90 to-white/70 p-4 sm:p-6 rounded-lg shadow-lg">
        <h1 class="text-2xl sm:text-4xl font-bold text-blue-600 text-center sm:text-left">
          JoshuaTodos
        </h1>
        <button @click="isAddDialogOpen = true; console.log('Add button clicked, isAddDialogOpen:', isAddDialogOpen)"
          :class="[
            'px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200',
            isMobile ? 'w-full' : 'w-auto'
          ]">
          Add Todo
        </button>
      </div>



      <SearchAndFilter :onSearch="setSearchTerm" :onFilter="setFilterStatus" />

      <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="max-w-4xl mx-auto mt-4 px-2">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {{ error.message }}
        </div>
      </div>

      <div v-else>
        <div v-if="filteredTodos.length === 0"
          class="bg-white/90 backdrop-blur-sm p-4 sm:p-6 text-center rounded-lg shadow-lg">
          <p class="text-gray-600">
            {{ emptyMessage }}
          </p>
        </div>
        <div v-else class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          <div class="divide-y divide-gray-200">
            <TodoItem v-for="todo in currentTodos" :key="todo.id" :todo="todo" :onDelete="() => handleDeleteTodo(todo)"
              :onToggle="handleToggleTodo" />
          </div>
        </div>

        <div v-if="totalPages > 1" class="flex justify-center mt-6">
          <div class="flex space-x-1">
            <button v-for="pageNum in totalPages" :key="pageNum" @click="handlePageChange($event, pageNum)" :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                page === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              ]">
              {{ pageNum }}
            </button>
          </div>
        </div>

        <!-- Add Todo Modal Overlay -->
        <div v-if="isAddDialogOpen" class="fixed inset-0 z-50 overflow-y-auto bg-black/50">
          <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full" @click.stop>
              <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-t-lg">
                Add New Todo
              </div>

              <div class="p-6">
                <div>
                  <label for="todo-title" class="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Todo Title
                  </label>
                  <input id="todo-title" v-model="newTodoTitle" type="text" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter todo title" @keyup.enter="handleAddTodo" />
                </div>
              </div>

              <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                <button @click="isAddDialogOpen = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button @click="handleAddTodo" :disabled="!newTodoTitle.trim()" :class="[
                    'px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 shadow-lg',
                    newTodoTitle.trim() 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-500' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]">
                  Add Todo
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Modal Overlay -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto bg-black/50">
          <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full" @click.stop>
              <div class="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-t-lg">
                Confirm Delete
              </div>

              <div class="p-6">
                <p class="text-center font-semibold text-lg text-gray-900">
                  Are you sure you want to delete "{{ todoToDelete?.todo }}"?
                </p>
              </div>

              <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                <button @click="showDeleteModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button @click="handleDeleteConfirm"
                  class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTodo } from '../use/useTodo'
import TodoItem from '../components-vue/TodoItem.vue'
import SearchAndFilter from '../components-vue/SearchAndFilter.vue'

const ITEMS_PER_PAGE = 10

const router = useRouter()
const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo } = useTodo()

const isAddDialogOpen = ref(false)
const newTodoTitle = ref('')
const showDeleteModal = ref(false)
const todoToDelete = ref(null)
const page = ref(1)
const searchTerm = ref('')
const filterStatus = ref('all')
const isMobile = ref(false)

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

const filteredTodos = computed(() => {
  const list = todos.value || []
  const filtered = list.filter(t => {
    const matchesSearch = searchTerm.value === '' || String(t.todo).toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesFilter = filterStatus.value === 'all' ||
      (filterStatus.value === 'completed' && t.completed) ||
      (filterStatus.value === 'pending' && !t.completed)
    return matchesSearch && matchesFilter
  })
  console.log('Filtered todos:', filtered.length, 'from', list.length, 'total')
  return filtered
})

const totalPages = computed(() => {
  const pages = Math.ceil((filteredTodos.value.length || 0) / ITEMS_PER_PAGE)
  console.log('Total pages calculated:', pages, 'for', filteredTodos.value.length, 'items')
  return pages
})

const currentTodos = computed(() => {
  const start = (page.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const result = filteredTodos.value.slice(start, end)
  console.log('Current todos:', result.length, 'from', start, 'to', end, 'on page', page.value)
  return result
})

const emptyMessage = computed(() => searchTerm.value || filterStatus.value !== 'all' ? 'No todos match your search criteria' : 'No todos yet. Add one to get started!')

const handleAddTodo = () => {
  console.log('Add todo clicked, title:', newTodoTitle.value)
  if (newTodoTitle.value.trim()) {
    addTodo(newTodoTitle.value.trim())
    newTodoTitle.value = ''
    isAddDialogOpen.value = false
    
    page.value = 1
    searchTerm.value = ''
    filterStatus.value = 'all'
    console.log('Todo added successfully, reset to page 1 and cleared filters')
    console.log('Current todos after adding:', todos.value)
    console.log('Filtered todos after adding:', filteredTodos.value)
    console.log('Current page:', page.value)
    console.log('Total pages:', totalPages.value)
    console.log('Current todos on page:', currentTodos.value)
  }
}

const handleDeleteTodo = (todo) => {
  console.log('Delete todo clicked, todo:', todo)
  todoToDelete.value = todo
  showDeleteModal.value = true
  console.log('Delete modal should show, todoToDelete:', todoToDelete.value)
}

const handleDeleteConfirm = () => {
  console.log('Delete confirmed, todoToDelete:', todoToDelete.value)
  if (todoToDelete.value) {
    deleteTodo(todoToDelete.value.id)
    showDeleteModal.value = false
    todoToDelete.value = null
    console.log('Todo deleted successfully')
  }
}

const handleToggleTodo = (updatedTodo) => {
  toggleTodo(updatedTodo)
}

const handlePageChange = (event, value) => {
  if (event) event.preventDefault()
  console.log('Page change requested:', value, 'from', page.value)
  page.value = value
}

const setSearchTerm = (value) => {
  searchTerm.value = value
  page.value = 1
}

const setFilterStatus = (value) => {
  filterStatus.value = value
  page.value = 1 
}

watch(filteredTodos, (newFilteredTodos) => {
  const maxPage = Math.ceil(newFilteredTodos.length / ITEMS_PER_PAGE)
  if (page.value > maxPage && maxPage > 0) {
    page.value = 1
  }
}, { immediate: true })
</script>


