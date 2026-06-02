export default defineNuxtConfig({
  ssr: false, /** Put to false before deploy */
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n'
  ],
  /** TODO: make it more configurable in the app settings, not nuxt */
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' }
    ],
    langDir: '../locales/',
    defaultLocale: 'en',
    lazy: true,
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
  /** Same as i18n settings, brand colors must be configurable in app settings*/
  ui: {
    global: true,
    primary: '#FFA500'
  },
  tailwindcss: {
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#fff7ed',
            100: '#ffedd5',
            500: '#f97316', // Your main accent
            600: '#ea580c',
            900: '#7c2d12',
          }
        }
      }
    }
  },
  /*app: {
    baseURL: '/testvue/'
  },*/
  /** Supabase credentials, not very safe */
  supabase: {
    url: process.env.SUPABASE_URL || 'https://mcyvnwyswlrskhoblaxt.supabase.co',
    key: process.env.SUPABASE_ANON_KEY || 'sb_publishable_xmJwlMbKdHcN99MknibiZQ_c51E8-dd',
    redirect: false
  }
})