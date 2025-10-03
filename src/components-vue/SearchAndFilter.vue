<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-lg">
    <div class="relative flex-1">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        id="search-todo"
        name="search-todo"
        type="text"
        v-model="searchTerm"
        @input="handleSearchChange"
        placeholder="Search todos"
        class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        v-if="searchTerm"
        @click="handleClearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        aria-label="Clear search"
      >
        <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <div class="sm:w-48">
      <select
        id="status-filter"
        name="status-filter"
        v-model="filterStatus"
        @change="handleFilterChange"
        class="w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  onSearch: Function,
  onFilter: Function
})

const searchTerm = ref('')
const filterStatus = ref('all')

const handleSearchChange = (event) => {
  const value = event.target.value
  searchTerm.value = value
  props.onSearch(value)
}

const handleFilterChange = (event) => {
  const value = event.target.value
  filterStatus.value = value
  props.onFilter(value)
}

const handleClearSearch = () => {
  searchTerm.value = ''
  props.onSearch('')
}
</script>
