<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      
      <UCard>
        <p class="text-lg text-gray-700">
          Welcome back, <span class="font-semibold">{{ user?.email }}</span>
        </p>
        
        <div class="mt-6 flex gap-3">
          <UButton color="gray" variant="outline" @click="showToken">
            Show Token (Console)
          </UButton>
          <UButton color="red" @click="handleLogout">
            Logout
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Protect this page
definePageMeta({ middleware: ['auth'] })

const authStore = useAuthStore()
const user = useSupabaseUser()

async function handleLogout() {
  await authStore.logout()
}

async function showToken() {
  const token = await authStore.getAccessToken()
  console.log('Token:', token)
  alert('Check console for token!')
}
</script>