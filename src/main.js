import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style/style.css'
import App from './App.vue'
import router from './router'
import './firebase.js' // importa firebase, se inicializa aquí

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')