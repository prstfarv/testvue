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
      secure: false, // Set true for HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
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