<template>
  <div class="flex gap-2 p-4">
    <button 
      v-for="loc in locales" 
      :key="loc.code"
      @click="switchLanguage(loc.code)"
      class="px-3 py-1 border rounded"
    >
      {{ loc.name }}
    </button>
  </div>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, locales } = useI18n()
const store = appStore()

const switchLanguage = (lang: string) => {
  console.log("switch language")
  //console.log(store)
  store.setLanguage(lang)
}
</script>