import './assets/styles/main.css'

import { createApp, VueElement} from 'vue'
import App from './App.vue'
import router from './router'
import message from './assets/strings'

const app = createApp(App)

app.config.globalProperties.$message = message

app.use(router)

app.mount('#app')
