<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h2 class="text-2xl font-bold text-center">Sign In</h2>
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
    await authStore.login(form.value.email, form.value.password)
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('error '+error)
    toast.add({
      title: 'Login Failed',
      description: 'Please check your email and password.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  } finally {
    loading.value = false
    toast.add({
      title: 'Successfull logged in',
      color: 'green',
      icon: 'ok'
    })
  }
}

onMounted(()=>{
    console.log("mounted")
})
</script>