<template>
  <!--<div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      
      <UCard>
        <p class="text-lg text-gray-700">
          {{ $t('welcome')  }}<span class="font-semibold">{{ user?.email }}</span>
        </p>
        
        <div class="mt-6 flex gap-3">
          <UButton :loading="loading" color="red" @click="handleLogout">
            Logout
          </UButton>
        </div>
      </UCard>
    </div>
  </div>-->
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
    <Sidebar :opened="sidebarOpen"/>
    <div class="flex-1 flex flex-col min-w-0">
      <Header :loading="loading" @handleLogout="handleLogout"/>
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>test</Card>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
/** Prevent for displaying before login */
definePageMeta({ middleware: ['auth'] })

const loading = ref(false)

const client = useSupabaseClient()
const authStore = useAuthStore()
//const user = useSupabaseUser()

const sidebarOpen = ref(true)

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
    if (err?.message?.includes('403') || err?.status === 403) {
      console.warn('Some network issues')
    } else {
      console.warn('Logout network issue:', err.message)
    }
  }

  await client.auth.setSession({ access_token: '', refresh_token: '' })

  loading.value = false 

  await navigateTo('/login')
}

async function showToken() {
  const token = await authStore.getAccessToken()
  alert('Check console for token!')
}
</script>