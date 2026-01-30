import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style/style.css'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkyEXCO-Yrl_ikFPuHReUvPjMw8EKvTck",
  authDomain: "taskboard-david.firebaseapp.com",
  projectId: "taskboard-david",
  storageBucket: "taskboard-david.firebasestorage.app",
  messagingSenderId: "50048732139",
  appId: "1:50048732139:web:ce19bbf03cf5650b8fe7ae"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
