import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

interface LocaleFiles {
  [key: string]: any
}
interface fileModule {
  default: any
  [key: string]: any
}
const primeLocaleFiles = import.meta.glob('../node_modules/primelocale/*.json')
const loadLocaleFiles = async (): Promise<LocaleFiles> => {
  const localeFiles: LocaleFiles = {}

  for (const path in primeLocaleFiles) {
    if (Object.prototype.hasOwnProperty.call(primeLocaleFiles, path)) {
      const fileName = path.split('/').pop()?.replace('.json', '')
      if (fileName) {
        const fileModule = await primeLocaleFiles[path]()
        localeFiles[fileName] = (fileModule as fileModule).default
      }
    }
  }

  return localeFiles
}
const noir = {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
}
const localeFiles = await loadLocaleFiles()
const localKey = 'zh-CN'
function primeConfig(){
  return {
    locale: localeFiles[localKey][Object.keys(localeFiles[localKey])[0]],
    ripple: false,
    theme: {
      preset: definePreset(Aura, noir),
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false,
      },
    },
  }
}

export default primeConfig