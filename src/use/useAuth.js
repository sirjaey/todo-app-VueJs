import { ref } from 'vue'
import { onAuthStateChange } from '../firebase/auth'

const user = ref(null)
const loading = ref(true)

let unsubscribe = null


unsubscribe = onAuthStateChange((firebaseUser) => {
  user.value = firebaseUser
  loading.value = false
})

export function useAuth() {
  return {
    user,
    loading
  }
}
