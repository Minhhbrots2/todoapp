import { createI18n } from 'vue-i18n'
import { locale as vi } from '@/locales/vi'

let messages = {}
messages = { ...messages, vi }

// get current selected language
const lang = 'vi'


export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true, //Cho phép sử dụng $t và các hàm i18n khác trên toàn bộ ứng dụng mà không cần phải import chúng vào từng component.
    locale: lang,
    messages,
    // @ts-ignore
  })

  // @ts-ignore
  nuxtApp.vueApp.use(i18n)

  return {
    provide: { i18n },
  }
})
