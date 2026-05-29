export const appStore = defineStore('app', () => {
    const { locale, setLocale } = useI18n()

    const currentLanguage = computed(() => locale.value)

    async function setLanguage(lang) {
        await setLocale(lang)
    }
    
    return {
        currentLanguage,
        setLanguage
    }
})