import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';


interface LocaleFiles {
    [key: string]: any;
}
const primeLocaleFiles = import.meta.glob(
    '../node_modules/primelocale/*.json'
);
const loadLocaleFiles = async (): Promise<LocaleFiles> => {
    const localeFiles: LocaleFiles = {};

    for (const path in primeLocaleFiles) {
        if (Object.prototype.hasOwnProperty.call(primeLocaleFiles, path)) {
            const fileName = path.split('/').pop()?.replace('.json', '');
            if (fileName) {
                const fileModule = await primeLocaleFiles[path]();
                localeFiles[fileName] = fileModule?.default||{};
            }
        }1
    }

    return localeFiles;
};

const localeFiles = await loadLocaleFiles();
console.log(localeFiles['zh-CN'])
const app = createApp(App)
app.use(PrimeVue,{
    locale:localeFiles['zh-CN']['zh-CN'],
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})
app.mount('#app')
