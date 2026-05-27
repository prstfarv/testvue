<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Nuxt UI</h1>
      <p class="text-gray-600 mb-8">The best way to build Nuxt apps.</p>
      
      <div v-if="user">
        <p class="text-green-600 mb-4">Logged in as {{ user.email }}</p>
        <UButton to="/dashboard" size="lg">Go to Dashboard</UButton>
      </div>
      
      <div v-else>
        <UButton to="/login" size="lg">Login</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
</script>