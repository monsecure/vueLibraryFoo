/*import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')*/


/*import Vue from 'vue';
import VueRouter from 'vue-router';


new Vue({
  router,
}).$mount('#app');*/



import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './services/routes'
import { store } from './services/store'


const router = createRouter({
  routes,
  history: createWebHistory()
})


import App from './App.vue'


const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')


