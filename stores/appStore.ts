import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
    
  // 1. State: Holds reactive data
  state: () => ({
    // Example of other app state you might have
    isLoading: false,
    sidebarOpen: true
  }),

  // 2. Actions: Methods to modify state or call external logic
  actions: {
    /**
     * Switches the language globally.
     * 
     * @param lang - The locale code (e.g., 'en', 'fr')
     */
    async setLanguage(lang: string) {
      // Access the i18n plugin function inside the action
      const nuxtApp = useNuxtApp()
      // Set the locale.
      // This updates the cookie, the reactive state, and (if needed) the URL.
      await nuxtApp.$i18n.setLocale(lang)
    }
  }
})