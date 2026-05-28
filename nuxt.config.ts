export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],
  app: {
    baseURL: '/testvue/' // <--- Ensure this is here
  },
  supabase: {
    url: process.env.SUPABASE_URL || 'https://mcyvnwyswlrskhoblaxt.supabase.co',
    key: process.env.SUPABASE_ANON_KEY || 'sb_publishable_xmJwlMbKdHcN99MknibiZQ_c51E8-dd',
    redirect: false
  }
})