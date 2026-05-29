<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <LangSwitcher />
    <UCard class="w-full max-w-sm">
      <template #header>
        <h2 class="text-2xl font-bold text-center">{{$t('login')}}</h2>
      </template>

      <UForm :state="form" @submit.prevent="handleLogin">
        <UFormGroup label="Email" class="mb-4">
          <UInput v-model="form.email" type="email" placeholder="you@example.com" required />
        </UFormGroup>

        <UFormGroup label="Password" class="mb-6">
          <UInput v-model="form.password" type="password" placeholder="••••••••" required />
        </UFormGroup>

        <UButton type="submit" block :loading="loading">
          Login
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
const authStore = useAuthStore()

const toast = useToast()

const form = ref({ email: '', password: '' })
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  
  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection Timeout')), 5000)
    )

    await Promise.race([
      authStore.login(form.value.email, form.value.password),
      timeoutPromise
    ])

    const user = useSupabaseUser()
    let attempts = 0
    /** Promise max attempts */
    while (!user.value && attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    toast.add({ title: $t('welcome'), color: 'green' })
    await navigateTo('/dashboard')

  } catch (error) {
    if (error.message === 'Connection Timeout') {
      toast.add({
        title: 'Connection Unstable',
        description: 'Request timed out. Please check your internet.',
        color: 'red'
      })
    } else {
      console.error('Login error:', error)
      toast.add({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials',
        color: 'red'
      })
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  console.log('mounted')
  const user = useSupabaseUser()
  if (user.value) {
    navigateTo('/dashboard') // This might be slow if network is bad
  }
})
</script>