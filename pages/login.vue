<template>
  <!--<div class="login__bgscreen min-h-screen flex items-center justify-center bg-gray-50 bg-[url('/images/login_bg.jpg')] bg-cover">
    <UCard class="w-full">
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
    <LangSwitcher />
  </div>-->
    <div class="login__bgscreen relative min-h-screen flex flex-col md:flex-row">
    
    <!-- LEFT SIDE (Login Form) -->
    <div class="w-full md:w-1/3 flex items-center backdrop-blur-md justify-center p-6">
      <UCard class="w-full bg-transparent ring-0 max-w-sm"  :ui="{ ring: '' , divide: '' }">
        <template #header>
          <h2 class="text-4xl text-white uppercase font-bold">Login</h2>
        </template>

        <UForm :state="form" @submit.prevent="handleLogin">
          <UFormGroup label="Email">
            <UInput label="Email" v-model="form.email" placeholder="john@example.com" icon="i-heroicons-envelope" />
          </UFormGroup>

          <UFormGroup class="mb-6" label="Password">
            <UInput v-model="form.password" type="password" placeholder="••••••••" icon="i-heroicons-lock-closed" />
          </UFormGroup>

          <UButton color="red" type="submit" block :loading="loading" variant="solid" size="lg">
            Sign In
          </UButton>
        </UForm>
      </UCard>
    </div>

    <div class="absolute left-[25.3%] top-0 bottom-0 w-1 bg-red-500 hidden md:block"></div>

    <!-- RIGHT SIDE (Image / Brand) -->
    <div class="w-full hidden md:flex items-center justify-center">
      <div>
        
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
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

<style lang="stylus" scoped>
.login__bgscreen
    background-image: url('/images/login_bg.jpg')
    background-size: cover
    background-position: center
    background-repeat: no-repeat
</style>