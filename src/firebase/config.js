import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBLhOxXTH3kEjWAxGeJuvASo9LKgf7QnAo",
    authDomain: "vue-todo-app-d92ec.firebaseapp.com",
    projectId: "vue-todo-app-d92ec",
    storageBucket: "vue-todo-app-d92ec.firebasestorage.app",
    messagingSenderId: "361833013141",
    appId: "1:361833013141:web:563dc66c477776a3d9609c",
    measurementId: "G-V3ZVZE5GXB"
  };


const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)
export default app
