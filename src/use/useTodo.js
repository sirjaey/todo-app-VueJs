import { ref } from 'vue'
import axios from 'axios'
import { getFromLocalStorage, setInLocalStorage } from '../utils/localStorage'

const todoApi = 'https://dummyjson.com/todos'

const state = {
  todos: ref([]),
  isLoading: ref(false),
  error: ref(null),
  initialized: false,
}

export function useTodo() {
  if (!state.initialized) {
    fetchTodos()
    state.initialized = true
  }

  async function fetchTodos() {
    state.isLoading.value = true
    state.error.value = null
    try {
      const saved = getFromLocalStorage()
      if (saved && saved.length > 0) {
        console.log('Using localStorage data:', saved.length, 'todos')
        state.todos.value = saved
        return
      }
      console.log('Fetching from API...')
      const response = await axios.get(todoApi)
      const apiTodos = response.data.todos || []
     
    
      const allTodos = [...apiTodos, ...testTodos]
      setInLocalStorage(allTodos)
      state.todos.value = allTodos
    } catch (err) {
      console.error('Error fetching todos:', err)
      state.error.value = err
      state.todos.value = []
    } finally {
      state.isLoading.value = false
    }
  }

  async function addTodo(newTodoText) {
    try {
      const resp = await axios.post(`${todoApi}/add`, {
        todo: newTodoText,
        completed: false,
        userId: Math.floor(Math.random() * 15) + 1,
      }, { headers: { 'Content-Type': 'application/json' }})

      const current = getFromLocalStorage() || []
      const apiTodoToAdd = { 
        id: Date.now(),
        todo: newTodoText, 
        completed: false,
        userId: Math.floor(Math.random() * 15) + 1,
        ...resp.data 
      }
      const updated = [apiTodoToAdd, ...current]
      setInLocalStorage(updated)
      state.todos.value = updated
      console.log('API Todo added:', apiTodoToAdd)
    } catch (err) {
      console.error('Error adding todo to API:', err)
      const localTodo = {
        id: Date.now(),
        todo: newTodoText, 
        completed: false,
        userId: Math.floor(Math.random() * 15) + 1,
      }
      const current = getFromLocalStorage() || []
      const updated = [localTodo, ...current]
      setInLocalStorage(updated)
      state.todos.value = updated
      console.log('Local Todo added:', localTodo)
    }
  }

  async function removeTodo(todoId) {
    const current = getFromLocalStorage() || []
    const updated = current.filter(t => t.id !== todoId)
    setInLocalStorage(updated)
    state.todos.value = updated

    const isApiTodo = todoId < 100
    if (isApiTodo) {
      try {
        await axios.delete(`${todoApi}/${todoId}`)
      } catch (err) {
        console.error('Error deleting todo from API:', err)
      }
    }
  }

  async function toggleTodo(updatedTodo) {
    const current = getFromLocalStorage() || []
    const existing = current.find(t => t.id === updatedTodo.id)
    if (!existing) return

    const isTitleUpdate = updatedTodo.todo !== undefined && updatedTodo.todo !== existing.todo
    const isCompletionUpdate = updatedTodo.completed !== undefined && updatedTodo.completed !== existing.completed

    const next = current.map(t => {
      if (t.id === updatedTodo.id) {
        if (isTitleUpdate) return { ...t, todo: updatedTodo.todo }
        if (isCompletionUpdate) return { ...t, completed: updatedTodo.completed }
      }
      return t
    })
    setInLocalStorage(next)
    state.todos.value = next

    const isApiTodo = updatedTodo.id < 100
    if (isApiTodo) {
      try {
        if (isTitleUpdate) return
        if (isCompletionUpdate) {
          await axios.put(`${todoApi}/${updatedTodo.id}`, {
            completed: updatedTodo.completed,
            todo: existing.todo,
            userId: existing.userId,
          }, { headers: { 'Content-Type': 'application/json' }})
        }
      } catch (err) {
        console.error('Error updating todo in API:', err)
      }
    }
  }

  return {
    todos: state.todos,
    isLoading: state.isLoading,
    error: state.error,
    addTodo,
    deleteTodo: removeTodo,
    toggleTodo,
  }
}



