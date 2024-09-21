// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css';  // Import MDI icons

import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';
const vuetify = createVuetify({
    components,
    directives,
});


const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
