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
  <div class="flex flex-1">
    <USidebar
      v-model:open="sidebarOpen"
      collapsible="icon"
      rail
      :ui="{
        container: 'h-full',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        <UDropdownMenu
          :content="{ align: 'start', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
            :ui="{
              trailingIcon: 'text-dimmed ms-auto'
            }"
          />
        </UDropdownMenu>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
          :key="state"
          orientation="vertical"
          :ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </template>

    </USidebar>

    <div class="flex-1 flex flex-col">
      <div class="h-(--ui-header-height) shrink-0 flex items-center px-4 border-b border-default">
        <UButton
          icon="i-lucide-panel-left"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

      <div class="flex-1 p-4">
        <Placeholder class="size-full" />
      </div>
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