import { createApp } from 'vue'
import './assets/styles/style.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import primeConfig from './primeConfig'
import { createPinia } from 'pinia'
const app = createApp(App)

import router,{initRouter} from './router'
const pinia = createPinia()
app.use(PrimeVue, primeConfig())
app.use(pinia)
initRouter().then(res=>{
  app.use(router)
  app.mount('#app')
})
