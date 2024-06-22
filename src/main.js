import './assets/base.css'

import '@fontsource/lato'
import '@fontsource/holtwood-one-sc'
import '@fontsource/tenali-ramakrishna'
import '@fontsource/niconne'

import '@fontsource/alata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App)

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
app.use(createPinia())
app.use(router,axios)

app.mount('#app')
