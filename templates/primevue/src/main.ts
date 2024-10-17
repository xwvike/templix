import { createApp } from 'vue'
import './assets/styles/style.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import primeConfig from './primeConfig'
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

import router,{initRouter} from './router'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(PrimeVue, primeConfig())
app.use(ToastService);
app.use(pinia)
initRouter().then(res=>{
  app.use(router)
  app.mount('#app')
})
