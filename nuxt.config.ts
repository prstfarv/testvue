export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en1.json', name: 'English' },
      { code: 'ru', iso: 'ru-RU', file: 'ru1.json', name: 'Русский' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '/locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  app: {
    baseURL: '/testvue/'
  },
  supabase: {
    url: process.env.SUPABASE_URL || 'https://mcyvnwyswlrskhoblaxt.supabase.co',
    key: process.env.SUPABASE_ANON_KEY || 'sb_publishable_xmJwlMbKdHcN99MknibiZQ_c51E8-dd',
    redirect: false
  }
})