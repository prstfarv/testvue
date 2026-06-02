<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    Loading...
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

definePageMeta({
  middleware: 'redirect-root'
})
</script>