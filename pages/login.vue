<template>
    <div class="login__bgscreen relative min-h-screen flex flex-col md:flex-row">
    
    <!-- login ui block -->
    <div class="w-full md:w-1/3 flex items-center backdrop-blur-lg justify-center p-6">
      <UCard 
        class="w-full bg-transparent ring-0 max-w-sm"  :ui="{ ring: '' , divide: '' }">
        <template #header>
          <h2 class="text-4xl text-white uppercase font-bold">Login</h2>
        </template>

        <UForm :state="form" @submit.prevent="handleLogin">
          <UFormGroup label="Email">
            <UInput 
              label="Email" 
              v-model="form.email" 
              placeholder="Email"
              size="lg"
              icon="i-heroicons-envelope" />
          </UFormGroup>

          <UFormGroup class="mb-6" label="Password">
            <UInput 
              v-model="form.password" 
              type="password"
              placeholder="password"
              size="lg"
              icon="i-heroicons-lock-closed" />
          </UFormGroup>

          <UButton 
            color="primary"
            type="submit" 
            block 
            :loading="loading" 
            variant="solid" 
            size="lg">
              Sign In
          </UButton>
        </UForm>
      </UCard>
    </div>

    <!-- line block -->
    <!--<div class="absolute left-[25.3%] top-0 bottom-0 w-1 bg-red-500 hidden md:block"></div>-->

    <!-- text block -->
    <div class="login__rightcontainer w-full">
      <div class="login__titleblock">
        <!--<LangSwitcher />-->
        <h2 
          class="login__title text-6xl text-white uppercase font-bold">
          Big title
        </h2>
        <h3 class="login__subtitle text-2xl text-white">Underline small text</h3>
      </div>

    <div class="w-full overflow-hidden group relative">
    
    <div class="absolute inset-0 mask-gradient pointer-events-none z-10"></div>

    <!-- The Track -->
    <div class="scroll-track items-center py-4">
      
      <UCard 
        v-for="item in 9" 
         
        class="min-h-64 shrink-0 hover:shadow-2xl transition-shadow"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center" />
            <h3 class="font-bold text-2xl">test</h3>
          </div>
        </template>
        <div class="space-y-4">
          <p class="text-lg text-gray-600 dark:text-gray-300">
            test
          </p>
          <UButton color="primary" variant="ghost">Learn more &rarr;</UButton>
        </div>
      </UCard>
      </div>
      </div>

      <div class="login__footerblock">
        <div class="login__footerlinks text-2md text-white font-bold uppercase">
          <div class="login__footerlink" v-for="link in footer_links">
            <ULink 
              :to="link.to"
              class="login__footerlink-withicon" 
              active-class="text-primary-500" 
              inactive-class="text-gray-500"
            >
              <UIcon :name="link.icon" />
              <span>{{link.name}}</span>
            </ULink>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
/** Initialize store */
const authStore = useAuthStore()

/** Initialize toast popup */
const toast = useToast()

/** Connection timeout message */
const CONNECTION_TIMEOUT_MESSAGE = "Connection Timeout"

/** Default user login and password */
const form = ref(
  { 
    email: 'test@mail.ru', 
    password: 'testtest' 
  })

/** Loading boolean */
const loading = ref(false)

const footer_links = ref([
  {
    name: 'prstfarv.github.io',
    to: '/',
    icon: 'i-heroicons-link'
  },
  {
    name: 'verstka',
    to: '/',
    icon: 'i-heroicons-link'
  },
  {
    name: 'vizitka',
    to: '/',
    icon: 'i-heroicons-link'
  }
])

/**
 * Handle login event
 */
async function handleLogin() {
  /** Set loading status to true for displaying spinner on button */
  loading.value = true
  /** Catching of errors in case of auth fails */
  try {
    /** In case of connection issues drop error with connection error message */
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error(CONNECTION_TIMEOUT_MESSAGE)), 5000)
    )

    /** Set auth timeout promise */
    await Promise.race([
      authStore.login(form.value.email, form.value.password),
      timeoutPromise
    ])

    /** Initialize supabase user data */
    const user = useSupabaseUser()
    /** Auth attemps */
    let attempts = 0
    /** Count promise max auth fail attempts. Not greater then 20. */
    while (!user.value && attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    /** Successfull auth toast for user */
    toast.add({ title: $t('welcome'), color: 'green' })
    await navigateTo('/dashboard')

  } catch (error) {
    if (error.message==CONNECTION_TIMEOUT_MESSAGE) {
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
  /** Get supabase user settings */
  const user = useSupabaseUser()
  if (user.value) {
    navigateTo('/dashboard') // This might be slow if network is bad
  }
})
</script>

<style lang="stylus" scoped>
.login
  &__bgscreen
    background-image: url('/images/login_bg.jpg')
    background-size: cover
    background-position: center
    background-repeat: no-repeat
  &__rightcontainer
    display: flex
    flex-direction: column
  &__titleblock
    text-align: right
    text-align: right
    flex: 1
    margin: 70px
  &__title
    font-family: FuturaMedium
  &__subtitle
    font-family: FuturaLight
    line-height: 0.1
  &__footerblock
    padding: 20px
  &__footerlinks
    display: flex
    flex-direction: row
    float: right
  &__footerlink
    padding: 30px
    &-withicon
      display: flex
      align-items: center
      &>span
        margin: 0 0 2px 0

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.scroll-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: scroll 20s linear infinite;
}

.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
</style>