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
          <UButton :loading="loading" color="red" @click="handleLogout">
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

const loading = ref(false)

const client = useSupabaseClient()
const authStore = useAuthStore()
const user = useSupabaseUser()

async function handleLogout() {
  if (loading.value) return
  loading.value = true

  try {

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 3000)
    )

    await Promise.race([
      client.auth.signOut({ scope: 'local' }),
      timeoutPromise
    ])
  } catch (err) {
    // 403 on logout usually just means "Session already expired".
    // It is safe to ignore this specific error.
    if (err?.message?.includes('403') || err?.status === 403) {
      // Silent ignore
    } else {
      console.warn('Logout network issue:', err.message)
    }
  }

  // 1. Force clear session
  await client.auth.setSession({ access_token: '', refresh_token: '' })

  // 2. STOP the loading spinner immediately
  loading.value = false 

  // 3. Navigate (this runs in the background, user sees immediate feedback)
  await navigateTo('/login')
}

async function showToken() {
  const token = await authStore.getAccessToken()
  console.log('Token:', token)
  alert('Check console for token!')
}
</script>