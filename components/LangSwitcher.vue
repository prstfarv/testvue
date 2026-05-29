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
const { locale, locales, setLocale } = useI18n()

const switchLanguage = (code) => {
  setLocale(code)
}
</script>