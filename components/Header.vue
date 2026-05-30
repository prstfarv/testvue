<template>
  <!-- Standard HTML <header> with Tailwind classes -->
  <header class="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    
    <!-- Left: Logo (Using UIcon) -->
    <div class="flex items-center gap-2">
      <UIcon name="i-heroicons-rocket-launch" class="w-6 h-6 text-primary-500" />
      <span class="font-bold text-gray-900 dark:text-white">MyApp</span>
    </div>

    <!-- Right: Actions (Using UButton) -->
    <div class="flex items-center gap-2">
      <UButton :loading="loading" color="red" @click="emit('handleLogout')">Sign out</UButton>
    </div>

  </header>
</template>

<script setup>
const emit = defineEmits(['handleLogout'])

const props = defineProps({
  loading: {
    type: Boolean
  }
})

const loading = computed(() => {
  return props.loading
})
</script>