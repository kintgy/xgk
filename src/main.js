import {createApp} from 'vue'
import App from './App.vue'
import store from "@/base/store/index"
import router from "@/router"
import '@/static/css/main.css'

import zhCn from "element-plus/es/locale/lang/zh-cn"
import ElementPlus from "element-plus"
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus, {locale: zhCn}).mount('#app')

