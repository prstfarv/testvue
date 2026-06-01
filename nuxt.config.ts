export default defineNuxtConfig({
  ssr: true, /** Put to false before deploy */
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '../locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    cookie: {
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    }
  },
  css: ['~/assets/css/localfonts.css'],
  ui: {
    global: true,
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