import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import vuetify from './plugins/vuetify';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
//@ts-ignore
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import App from './App.vue'
import router from './router'
import Maska from 'maska';
// Table
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
//i18
import { createI18n } from 'vue-i18n';
//ScrollTop
import VueScrollTo from 'vue-scrollto';
import messages from './utils/locale/message';
import vuetify from './utils/plugins/vuetify';

const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
// app.use(print);
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);

app.use(router)

app.use(vuetify).mount('#app')

app.use(VueScrollTo, {
    duration: 1000,
    easing: "ease",
    offset:-50,
})
