// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
  ],
  // cấu hình scss common
  css: [
    '~/assets/scss/style.scss'
  ],
  //tối ưu hoá hiệu suất khi dùng tài nguyên tĩnh
  nitro: {
    serveStatic: true
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    // Used in component vue
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/glob.scss";'
        }
      }
    },
  },
  app: {
    head: {
      title: 'Todo App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0' },
        { hid: 'description', name: 'description', content: 'Todo App' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=1.0.1' }
      ],
    }
  },
  spaLoadingTemplate: './loading-spinner.html'
})
