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
  <UContainer>
    <UHeader>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/nuxt/ui"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>
  </UContainer>

</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

/** Prevent for displaying before login */
definePageMeta({ middleware: ['auth'] })

const loading = ref(false)

const client = useSupabaseClient()
const authStore = useAuthStore()


const sidebarOpen = ref(true)



const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Docs',
  to: '/docs/getting-started',
  icon: 'i-lucide-book-open',
  active: route.path.startsWith('/docs/getting-started')
}, {
  label: 'Components',
  to: '/docs/components',
  icon: 'i-lucide-box',
  active: route.path.startsWith('/docs/components')
}, {
  label: 'Figma',
  icon: 'i-simple-icons-figma',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}])



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