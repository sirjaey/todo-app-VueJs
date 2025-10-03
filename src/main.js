import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'


const TodoList = () => import('./pages-vue/TodoList.vue')
const TodoDetails = () => import('./pages-vue/TodoDetails.vue')
const NotFound = () => import('./pages-vue/NotFound.vue')
const ErrorTest = () => import('./pages-vue/ErrorTest.vue')
const SignIn = () => import('./pages-vue/SignIn.vue')
const SignUp = () => import('./pages-vue/SignUp.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/todo', component: TodoList },
    { path: '/todo/:id', component: TodoDetails },
    { path: '/signin', component: SignIn },
    { path: '/', component: SignUp },
    { path: '/error-test', component: ErrorTest },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ]
})

createApp(App).use(router).mount('#app')



