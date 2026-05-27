export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  const toast = useToast()

  if (!user.value) {
    return navigateTo('/login')
  }
})