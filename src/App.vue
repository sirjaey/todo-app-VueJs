<template>
  <div class="app-container">
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="user">
      <div class="bg-white/90 backdrop-blur-sm shadow-lg">
        <div class="flex justify-between items-center p-4">
          <h1 class="text-xl font-semibold text-gray-800">My Todo App</h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ user.email }}</span>
            <button @click="handleSignOut"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <TodoList />
    </div>

    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuth } from './use/useAuth'
import { signOutUser } from './firebase/auth'
import { useRouter } from 'vue-router'
import TodoList from './pages-vue/TodoList.vue'

const { user, loading } = useAuth()
const router = useRouter()

const handleSignOut = async () => {
  await signOutUser()
  router.push('/signin')
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #BBDEFB 0%, #ae0fde 100%);
}
</style>


